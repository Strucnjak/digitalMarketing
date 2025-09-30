import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer as createHttpServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { ServerResponse } from "node:http";
import type { Manifest, RenderResult } from "./src/entry-server";
import { createServer as createViteServer, type ViteDevServer } from "vite";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const projectRoot = isProduction
  ? path.resolve(currentDir, "..", "..")
  : currentDir;
const serverDistDir = isProduction
  ? currentDir
  : path.resolve(projectRoot, "dist/server");
const clientDistDir = isProduction
  ? path.resolve(currentDir, "../client")
  : path.resolve(projectRoot, "dist/client");

interface HandleRequestOptions {
  res: ServerResponse;
  url: URL;
  templateSource: string;
  manifest?: Manifest;
  vite?: ViteDevServer;
}

async function handleRequest({
  res,
  url,
  templateSource,
  manifest,
  vite,
}: HandleRequestOptions) {
  try {
    let template = templateSource;
    let renderModule: { render: typeof import("./src/entry-server").render };

    if (vite) {
      template = await vite.transformIndexHtml(url.pathname, template);
      renderModule = (await vite.ssrLoadModule("/src/entry-server.tsx")) as typeof import("./src/entry-server");
    } else {
      const entryPath = path.resolve(serverDistDir, "entry-server.js");
      renderModule = (await import(pathToFileURL(entryPath).href)) as typeof import("./src/entry-server");
    }

    const rendered = await renderModule.render(url.pathname + url.search, {
      manifest,
    });

    const html = injectRenderedApp(template, rendered);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  } catch (error) {
    if (vite) {
      vite.ssrFixStacktrace(error as Error);
    }
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}

function injectRenderedApp(template: string, rendered: RenderResult) {
  const stateScript = serializeState(rendered.initialState);
  return template
    .replace("<!--app-head-->", `${rendered.head}${rendered.preloadLinks}`)
    .replace("<!--app-html-->", rendered.html)
    .replace("<!--app-state-->", stateScript);
}

function serializeState(state: unknown) {
  const json = JSON.stringify(state ?? {});
  const safeJson = json.replace(/</g, "\\u003c");
  return `<script>window.__INITIAL_STATE__=${safeJson};</script>`;
}

async function tryServeStatic(
  res: ServerResponse,
  pathname: string,
  clientDir: string
) {
  const normalized = path.normalize(pathname);
  const filePath = path.resolve(clientDir, `.${normalized}`);

  if (!filePath.startsWith(clientDir)) {
    return false;
  }

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      return false;
    }

    const stream = createReadStream(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", getMimeType(filePath));
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("end", resolve);
      stream.pipe(res);
    });
    return true;
  } catch (_error) {
    return false;
  }
}

function getMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".js":
      return "application/javascript";
    case ".css":
      return "text/css";
    case ".json":
      return "application/json";
    case ".ico":
      return "image/x-icon";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".woff2":
      return "font/woff2";
    default:
      return "text/plain";
  }
}

async function createServer() {
  let vite: ViteDevServer | undefined;
  let template: string;
  let manifest: Manifest | undefined;
  const clientDir = clientDistDir;

  if (!isProduction) {
    vite = await createViteServer({
      root: projectRoot,
      server: { middlewareMode: true },
      appType: "custom",
    });
    template = await readFile(path.resolve(projectRoot, "index.html"), "utf-8");
  } else {
    template = await readFile(path.join(clientDir, "index.html"), "utf-8");
    const manifestContent = await readFile(
      path.join(clientDir, ".vite/manifest.json"),
      "utf-8"
    );
    manifest = JSON.parse(manifestContent) as Manifest;
  }

  const server = createHttpServer(async (req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Bad Request");
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

    if (isProduction) {
      const served = await tryServeStatic(res, url.pathname, clientDir);
      if (served) {
        return;
      }
    }

    if (vite) {
      vite.middlewares(req, res, async () => {
        await handleRequest({
          res,
          url,
          templateSource: template,
          manifest,
          vite,
        });
      });
    } else {
      await handleRequest({
        res,
        url,
        templateSource: template,
        manifest,
      });
    }
  });

  const port = Number(process.env.PORT ?? 4173);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
