# Asa Zhou Night Archive

一个零依赖的个人博客、数字花园和项目档案。站点可以直接由 GitHub Pages 托管，入口文件是 `index.html`。

## 本地预览

```bash
npm run dev
```

默认地址是 `http://localhost:4173`。

## 验证

```bash
npm run smoke
```

烟测会检查核心页面、文章页、资源引用、RSS 和 sitemap 是否存在。

## 结构

- `index.html`：首页，包含 Hero、文章、项目、数字花园、归档和关于区块
- `posts/`：静态文章页
- `assets/`：视觉资产和 favicon
- `styles.css`：全站视觉系统和响应式样式
- `app.js`：滚动揭示、文章筛选、导航高亮、Canvas 星图和时钟
- `rss.xml` / `sitemap.xml` / `robots.txt`：发布与搜索引擎基础设施

## 发布

在 GitHub 仓库 Settings → Pages 中选择从 `main` 分支根目录发布即可。
