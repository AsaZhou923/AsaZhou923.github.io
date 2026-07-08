import { getCollection } from "astro:content";
import { site } from "../data/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((post) => {
      const url = `${site.url}/posts/${post.id}/`;
      return `<item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        <description>${escapeXml(post.data.description)}</description>
      </item>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Asa Zhou Signal Garden</title>
        <link>${site.url}/</link>
        <description>${escapeXml(site.description)}</description>
        <language>zh-CN</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
