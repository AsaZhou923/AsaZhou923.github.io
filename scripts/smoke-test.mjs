import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sourceFiles = [
  "astro.config.mjs",
  "src/pages/index.astro",
  "src/pages/writing/index.astro",
  "src/pages/about.astro",
  "src/pages/posts/[slug].astro",
  "src/pages/rss.xml.ts",
  "src/pages/sitemap.xml.ts",
  "src/layouts/BaseLayout.astro",
  "src/components/AetherCanvas.astro",
  "src/components/CommandPalette.tsx",
  "src/components/WritingExplorer.tsx",
  "src/styles/home.css",
  "src/content.config.ts",
  "src/content/posts/build-a-blog.md",
  "src/content/posts/digital-garden-layers.md",
  "src/content/posts/project-copywriting.md",
  "public/assets/og-card.svg",
  "public/assets/og-card.png",
  "public/assets/favicon.svg",
  "public/assets/projects/meetingrelay-icon.svg",
  "public/assets/projects/picspeak-review.webp",
  "public/assets/projects/toksync-dashboard.webp",
  "public/robots.txt",
  "_archive/signal-garden-v1/ARCHIVE.md",
  ".github/workflows/deploy.yml"
];

const sourceSnippets = [
  ["src/pages/index.astro", "AetherCanvas"],
  ["src/pages/index.astro", "MeetingRelay"],
  ["src/data/site.ts", "PromptCrate"],
  ["src/pages/index.astro", "@lucide/astro"],
  ["src/pages/writing/index.astro", "WritingExplorer"],
  ["src/layouts/BaseLayout.astro", "CommandPalette"],
  ["src/components/AetherCanvas.astro", "ShaderMaterial"],
  ["src/components/MotionRuntime.astro", "prefers-reduced-motion"],
  ["src/components/MotionRuntime.astro", "ScrollTrigger"],
  ["src/content.config.ts", "defineCollection"],
  ["src/pages/posts/[slug].astro", "getStaticPaths"],
  ["src/styles/global.css", "prefers-reduced-motion"],
  ["src/styles/global.css", "view-transition"],
  ["src/styles/home.css", "work-panel--mint"],
  ["package.json", "@lucide/astro"],
  ["package.json", "lucide-react"]
];

const distFiles = [
  "dist/index.html",
  "dist/404.html",
  "dist/writing/index.html",
  "dist/about/index.html",
  "dist/rss.xml",
  "dist/sitemap.xml",
  "dist/assets/og-card.svg",
  "dist/assets/og-card.png",
  "dist/assets/favicon.svg",
  "dist/assets/projects/meetingrelay-icon.svg",
  "dist/assets/projects/picspeak-review.webp",
  "dist/assets/projects/toksync-dashboard.webp",
  "dist/posts/build-a-blog/index.html",
  "dist/posts/digital-garden-layers/index.html",
  "dist/posts/project-copywriting/index.html"
];

const forbiddenDistPaths = [
  "dist/_archive",
  "dist/assets/night-archive-hero.png"
];

const failures = [];

for (const file of sourceFiles) {
  const path = join(root, file);
  if (!existsSync(path)) failures.push(`missing ${file}`);
  else if (statSync(path).size === 0) failures.push(`empty ${file}`);
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
    if (!existsSync(path)) failures.push(`missing built file ${file}`);
    else if (statSync(path).size === 0) failures.push(`empty built file ${file}`);
  }

  for (const file of forbiddenDistPaths) {
    if (existsSync(join(root, file))) failures.push(`archived asset leaked into build: ${file}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Smoke test passed: ${sourceFiles.length} source files verified${existsSync(join(root, "dist")) ? " with dist output" : ""}.`);
