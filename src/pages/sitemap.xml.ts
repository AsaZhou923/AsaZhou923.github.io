import { getCollection } from "astro:content";
import { site } from "../data/site";

export async function GET() {
  const posts = await getCollection("posts");
  const urls = [
    { loc: `${site.url}/`, lastmod: "2026-07-08" },
    ...posts.map((post) => ({
      loc: `${site.url}/posts/${post.id}/`,
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString().slice(0, 10)
    }))
  ];

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((item) => `<url><loc>${item.loc}</loc><lastmod>${item.lastmod}</lastmod></url>`).join("")}
    </urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
