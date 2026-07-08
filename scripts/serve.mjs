import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function resolveRequest(url) {
  const requestPath = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const cleaned = normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, cleaned);

  if (!filePath.startsWith(root)) {
    return null;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) && !extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  return filePath;
}

const server = createServer((request, response) => {
  const filePath = resolveRequest(request.url || "/");

  if (!filePath || !existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "content-type": types[".html"] });
    createReadStream(join(root, "404.html")).pipe(response);
    return;
  }

  response.writeHead(200, {
    "content-type": types[extname(filePath)] || "application/octet-stream",
    "cache-control": "no-store"
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Asa Zhou blog running at http://localhost:${port}`);
});
