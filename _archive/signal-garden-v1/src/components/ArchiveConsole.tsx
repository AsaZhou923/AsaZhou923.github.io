import { useMemo, useState } from "react";

export interface ArchivePost {
  title: string;
  description: string;
  url: string;
  category: string;
  date: string;
  signal: number;
  accent: "cyan" | "gold" | "red" | "lime";
  tags: string[];
}

interface Props {
  posts: ArchivePost[];
}

const accentLabel = {
  cyan: "Signal",
  gold: "Memory",
  red: "Heat",
  lime: "Growth"
};

export default function ArchiveConsole({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...new Set(posts.flatMap((post) => post.tags))].slice(0, 9), [posts]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag = tag === "All" || post.tags.includes(tag);
      const searchable = `${post.title} ${post.description} ${post.tags.join(" ")} ${post.category}`.toLowerCase();
      return matchesTag && (!normalized || searchable.includes(normalized));
    });
  }, [posts, query, tag]);

  return (
    <section className="console" id="archive" data-motion="rise" aria-labelledby="archive-title">
      <div className="console__header">
        <div>
          <p className="eyebrow">Archive Console</p>
          <h2 id="archive-title">文章不是列表，是可查询的信号库。</h2>
        </div>
        <label className="console__search">
          <span>Search memory</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章、标签、主题"
            type="search"
          />
        </label>
      </div>

      <div className="console__tags" aria-label="文章标签筛选">
        {tags.map((item) => (
          <button
            className={item === tag ? "is-active" : ""}
            key={item}
            onClick={() => setTag(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="console__grid">
        {filtered.map((post) => (
          <a className={`console-card console-card--${post.accent}`} href={post.url} key={post.url} data-magnetic>
            <span className="console-card__meta">
              {post.date} / {post.category}
            </span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="console-card__footer">
              <span>{accentLabel[post.accent]}</span>
              <strong>{post.signal}</strong>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && <p className="console__empty">没有匹配的文章。换一个关键词，或者清空筛选。</p>}
    </section>
  );
}
