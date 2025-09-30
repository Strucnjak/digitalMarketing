declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }

  interface Process {
    env: ProcessEnv;
    exit(code?: number): never;
  }
}

declare const process: NodeJS.Process;
declare const __dirname: string;

declare module "node:http" {
  interface IncomingMessage {
    url?: string;
    headers: Record<string, string | string[] | undefined>;
  }

  interface ServerResponse {
    statusCode: number;
    setHeader(name: string, value: string): void;
    end(data?: string): void;
  }

  interface Server {
    listen(port: number, callback?: () => void): void;
  }

  type RequestListener = (
    req: IncomingMessage,
    res: ServerResponse
  ) => void | Promise<void>;

  function createServer(listener: RequestListener): Server;

  export { createServer, IncomingMessage, ServerResponse, Server, RequestListener };
}

declare module "node:fs" {
  interface ReadStream {
    on(event: string, listener: (...args: unknown[]) => void): ReadStream;
    pipe<T>(destination: T): T;
  }

  function createReadStream(path: string): ReadStream;

  export { createReadStream, ReadStream };
}

declare module "node:fs/promises" {
  interface MkdirOptions {
    recursive?: boolean;
  }

  interface Stats {
    isDirectory(): boolean;
  }

  function readFile(path: string, encoding: "utf-8"): Promise<string>;
  function readFile(path: string): Promise<Uint8Array>;
  function writeFile(path: string, data: string, encoding?: "utf-8"): Promise<void>;
  function mkdir(path: string, options?: MkdirOptions): Promise<void>;
  function stat(path: string): Promise<Stats>;

  export { readFile, writeFile, mkdir, stat, MkdirOptions, Stats };
}

declare module "node:path" {
  function resolve(...segments: string[]): string;
  function join(...segments: string[]): string;
  function dirname(path: string): string;
  function normalize(path: string): string;
  function extname(path: string): string;

  export { resolve, join, dirname, normalize, extname };
}

declare module "node:url" {
  function fileURLToPath(url: string | URL): string;
  function pathToFileURL(path: string): URL;

  export { fileURLToPath, pathToFileURL };
}
