import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export interface WritingPost {
  title: string;
  description: string;
  href: string;
  category: string;
  date: string;
  year: number;
  signal: number;
  accent: "cyan" | "gold" | "red" | "lime";
  tags: string[];
  featured: boolean;
}

interface Props {
  posts: WritingPost[];
}

export default function WritingExplorer({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [order, setOrder] = useState<"new" | "signal">("new");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const categories = useMemo(
    () => ["全部", ...new Set(posts.map((post) => post.category))],
    [posts]
  );

  const visiblePosts = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    return posts
      .filter((post) => {
        const inCategory = category === "全部" || post.category === category;
        const haystack = [post.title, post.description, post.category, ...post.tags]
          .join(" ")
          .toLocaleLowerCase("zh-CN");
        return inCategory && (!needle || haystack.includes(needle));
      })
      .sort((a, b) => order === "signal" ? b.signal - a.signal : b.date.localeCompare(a.date));
  }, [posts, query, category, order]);

  return (
    <section className="writing-explorer" aria-label="写作档案与筛选">
      <div className="writing-controls" data-reveal>
        <label className="writing-search">
          <span>Search the archive</span>
          <div>
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 4.5 4.5" /></svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索标题、主题、标签…"
            />
            <kbd>/</kbd>
          </div>
        </label>

        <div className="writing-order" aria-label="文章排序">
          <button aria-pressed={order === "new"} className={order === "new" ? "is-active" : ""} onClick={() => setOrder("new")} type="button">最新</button>
          <button aria-pressed={order === "signal"} className={order === "signal" ? "is-active" : ""} onClick={() => setOrder("signal")} type="button">信号强度</button>
        </div>
      </div>

      <div className="writing-filter" data-reveal>
        <div aria-label="文章分类">
          {categories.map((item) => (
            <button
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              type="button"
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <p aria-live="polite"><strong>{String(visiblePosts.length).padStart(2, "0")}</strong> entries found</p>
      </div>

      <div className="writing-list">
        {visiblePosts.map((post, index) => (
          <a className={`writing-entry writing-entry--${post.accent}`} href={post.href} key={post.href} data-reveal data-cursor="阅读">
            <div className="writing-entry__number">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{post.year}</small>
            </div>
            <div className="writing-entry__copy">
              <p>{post.category} · {post.date.replaceAll("-", ".")}</p>
              <h2>{post.title}</h2>
              <span>{post.description}</span>
              <ul>
                {post.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
            <div className="writing-entry__signal" aria-label={`信号强度 ${post.signal}`}>
              <div><span style={{ "--signal": `${post.signal}%` } as CSSProperties} /></div>
              <strong>{post.signal}</strong>
              <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M7 16h18M18 9l7 7-7 7" /></svg>
            </div>
          </a>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <div className="writing-empty" role="status">
          <span>Ø</span>
          <h2>档案里暂时没有这条信号。</h2>
          <button type="button" onClick={() => { setQuery(""); setCategory("全部"); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}
