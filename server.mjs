import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "dist");
const endpoint =
  "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
};
let cached = null;
let cacheTime = 0;

try {
  await stat(resolve(root, "index.html"));
} catch {
  console.error("Execute npm run build antes de iniciar o servidor.");
  process.exit(1);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    if (pathname === "/api/products") {
      if (!cached || Date.now() - cacheTime > 60_000) {
        const upstream = await fetch(endpoint, {
          signal: AbortSignal.timeout(12_000),
        });
        if (!upstream.ok) throw new Error("Falha na consulta ao catálogo.");
        const payload = await upstream.json();
        if (payload.success !== true || !Array.isArray(payload.products))
          throw new Error("Catálogo inválido.");
        cached = JSON.stringify(payload);
        cacheTime = Date.now();
      }
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      response.end(request.method === "HEAD" ? undefined : cached);
      return;
    }
    const path = resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    if (!path.startsWith(root + sep)) {
      response.writeHead(403);
      response.end();
      return;
    }
    const file = await readFile(path);
    response.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : file);
  } catch (error) {
    const missing = error && error.code === "ENOENT";
    response.writeHead(missing ? 404 : 502, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(
      JSON.stringify({
        message: missing
          ? "Arquivo não encontrado."
          : "Não foi possível carregar os produtos. Tente novamente.",
      }),
    );
  }
});

const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
server.listen(port, host, () =>
  console.log(`Loja disponível em http://${host}:${port}`),
);
