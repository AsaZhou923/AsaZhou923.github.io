# Asa Zhou Signal Garden

一个 Astro 7 + React 19 + Three.js + GSAP + Lenis 重构后的个人博客、数字花园和项目档案。

## 本地预览

```bash
npm run dev
```

默认地址是 `http://localhost:4321`。

## 构建

```bash
npm run build
```

构建输出在 `dist/`，GitHub Actions 会自动部署到 GitHub Pages。

## 验证

```bash
npm run build
npm run smoke
```

烟测会检查 Astro 源码结构、内容集合、核心交互组件、静态资源和构建产物。

## 结构

- `src/pages/`：页面和 RSS/sitemap endpoint
- `src/content/posts/`：Markdown 文章内容集合
- `src/components/`：React 交互岛、Three.js 体验层和动效运行时
- `src/styles/global.css`：全站视觉系统
- `public/assets/`：首屏视觉资产和 favicon
- `.github/workflows/deploy.yml`：GitHub Pages 自动部署

## 发布

在 GitHub 仓库 Settings → Pages 中选择 GitHub Actions 作为 Source。推送到 `main` 后会自动构建并部署。
