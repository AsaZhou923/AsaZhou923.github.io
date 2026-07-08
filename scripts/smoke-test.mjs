import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "rss.xml",
  "assets/night-archive-hero.png",
  "posts/build-a-blog.html",
  "posts/digital-garden-layers.html",
  "posts/project-copywriting.html"
];

const requiredSnippets = [
  ["index.html", "Asa Zhou"],
  ["index.html", "Night Archive"],
  ["index.html", "data-post-card"],
  ["styles.css", "@media (prefers-reduced-motion: reduce)"],
  ["app.js", "IntersectionObserver"],
  ["app.js", "requestAnimationFrame"],
  ["posts/build-a-blog.html", "从 0 搭一个个人博客"],
  ["posts/digital-garden-layers.html", "数字花园不是"],
  ["posts/project-copywriting.html", "项目页不是"]
];

const failures = [];

for (const file of requiredFiles) {
  const path = join(root, file);
  if (!existsSync(path)) {
    failures.push(`missing ${file}`);
    continue;
  }
  if (statSync(path).size === 0) {
    failures.push(`empty ${file}`);
  }
}

for (const [file, snippet] of requiredSnippets) {
  const path = join(root, file);
  if (existsSync(path) && !readFileSync(path, "utf8").includes(snippet)) {
    failures.push(`${file} missing snippet: ${snippet}`);
  }
}

const index = readFileSync(join(root, "index.html"), "utf8");
const assetRefs = [...index.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((href) => !href.startsWith("#") && !href.startsWith("http") && !href.startsWith("mailto:"));

for (const href of assetRefs) {
  const cleanHref = href.split("#")[0];
  if (!cleanHref || cleanHref.endsWith("/")) {
    continue;
  }
  const candidate = join(root, cleanHref);
  if (!existsSync(candidate)) {
    failures.push(`broken reference from index.html: ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Smoke test passed: ${requiredFiles.length} files and ${assetRefs.length} index references verified.`);
