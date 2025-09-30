import { access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

export async function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const parts = specifier.split("/");
    const lastPart = parts[parts.length - 1] ?? "";
    if (!lastPart.includes(".")) {
      const parentURL = context.parentURL ?? pathToFileURL(`${process.cwd()}/`).href;
      const candidate = new URL(`${specifier}.js`, parentURL);
      try {
        await access(fileURLToPath(candidate));
        return { url: candidate.href, shortCircuit: true };
      } catch {
        // Fall through to default resolver if the .js file is not found
      }
    }
  }

  return defaultResolve(specifier, context, defaultResolve);
}
