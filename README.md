# Asa Zhou — Systems With a Pulse

Asa Zhou 的个人技术作品集与数字花园。站点融合 MeetingRelay、PicSpeak、TokSync、OfferWave 与 PromptCrate 的真实项目内容；以 Astro 的静态内容能力为核心，用 React 岛屿承载搜索交互、Three.js 负责 WebGL 场景、GSAP + Lenis 负责动效与滚动编排。

## 本地开发

```bash
npm install
npm run dev
```

默认地址：`http://localhost:4321`。

## 验证与构建

```bash
npm run build
npm run smoke
```

构建产物输出到 `dist/`，推送至 `main` 后由 GitHub Actions 部署到 GitHub Pages。

## 内容与页面

- `src/pages/`：首页、写作归档、关于、文章详情、RSS、sitemap 与 404
- `src/content/posts/`：Markdown 文章内容
- `src/components/`：搜索命令面板、归档筛选、WebGL 场景与动效运行时
- `src/styles/global.css` 与 `src/styles/home.css`：完整视觉系统、项目场景、响应式与无动画降级
- `public/assets/`：站点图标、真实项目截图及社交分享视觉

## 旧站封存

上一版 Signal Garden 的完整源码快照位于 `_archive/signal-garden-v1/`。该目录不属于 Astro 的页面或静态资源入口，不会被构建或发布。
