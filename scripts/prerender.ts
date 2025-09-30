import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Manifest, RenderResult } from "../src/entry-server";
import { enumerateStaticPaths } from "../src/routing.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.resolve(__dirname, "..");
const distDir = path.resolve(serverDir, "..");
const clientDir = path.resolve(distDir, "client");

async function main() {
  const template = await readFile(path.join(clientDir, "index.html"), "utf-8");
  const manifestPath = path.join(clientDir, ".vite/manifest.json");
  const manifest = JSON.parse(
    await readFile(manifestPath, "utf-8")
  ) as Manifest;
  const entryModule = (await import(
    pathToFileURL(path.resolve(serverDir, "entry-server.js")).href
  )) as typeof import("../src/entry-server");
  const render: (url: string, options: { manifest: Manifest }) => RenderResult =
    entryModule.render;

  const routes = collectRoutes();

  for (const route of routes) {
    const result = await render(route, { manifest });
    const html = injectRenderedApp(template, result);
    const outputPath = getOutputPath(route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, "utf-8");
  }
}

function collectRoutes() {
  return enumerateStaticPaths();
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

function getOutputPath(route: string) {
  if (route === "/") {
    return path.join(clientDir, "index.html");
  }
  const normalized = route.replace(/^\//, "");
  return path.join(clientDir, normalized, "index.html");
}

main().catch((error) => {
  console.error("Prerendering failed", error);
  process.exit(1);
});
