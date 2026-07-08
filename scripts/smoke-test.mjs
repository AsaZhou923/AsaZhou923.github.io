import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sourceFiles = [
  "astro.config.mjs",
  "src/pages/index.astro",
  "src/pages/posts/[slug].astro",
  "src/pages/rss.xml.ts",
  "src/pages/sitemap.xml.ts",
  "src/content.config.ts",
  "src/content/posts/build-a-blog.md",
  "src/content/posts/digital-garden-layers.md",
  "src/content/posts/project-copywriting.md",
  "public/assets/night-archive-hero.png",
  "public/assets/favicon.svg",
  "public/robots.txt",
  ".github/workflows/deploy.yml"
];

const sourceSnippets = [
  ["src/pages/index.astro", "ArchiveConsole"],
  ["src/components/ExperienceCanvas.astro", "three"],
  ["src/components/MotionRuntime.astro", "Lenis"],
  ["src/components/MotionRuntime.astro", "ScrollTrigger"],
  ["src/content.config.ts", "defineCollection"],
  ["src/pages/posts/[slug].astro", "getStaticPaths"],
  ["src/styles/global.css", "prefers-reduced-motion"]
];

const distFiles = [
  "dist/index.html",
  "dist/404.html",
  "dist/rss.xml",
  "dist/sitemap.xml",
  "dist/assets/night-archive-hero.png",
  "dist/assets/favicon.svg",
  "dist/posts/build-a-blog/index.html",
  "dist/posts/digital-garden-layers/index.html",
  "dist/posts/project-copywriting/index.html"
];

const failures = [];

for (const file of sourceFiles) {
  const path = join(root, file);
  if (!existsSync(path)) {
    failures.push(`missing ${file}`);
  } else if (statSync(path).size === 0) {
    failures.push(`empty ${file}`);
  }
}

for (const [file, snippet] of sourceSnippets) {
  const path = join(root, file);
  if (!existsSync(path) || !readFileSync(path, "utf8").includes(snippet)) {
    failures.push(`${file} missing snippet: ${snippet}`);
  }
}

if (existsSync(join(root, "dist"))) {
  for (const file of distFiles) {
    const path = join(root, file);
    if (!existsSync(path)) {
      failures.push(`missing built file ${file}`);
    } else if (statSync(path).size === 0) {
      failures.push(`empty built file ${file}`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Smoke test passed: ${sourceFiles.length} source files verified${existsSync(join(root, "dist")) ? " with dist output" : ""}.`);
