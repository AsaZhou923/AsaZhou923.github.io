import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";

export interface CommandEntry {
  title: string;
  description: string;
  href: string;
  meta: string;
  keywords?: string[];
}

interface Props {
  entries: CommandEntry[];
}

export default function CommandPalette({ entries }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      document.documentElement.classList.remove("command-open");
      return;
    }

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const outsideElements = document.querySelectorAll<HTMLElement>(
      "body > main, body > .site-footer, .site-brand, .site-nav, .aura-toggle, .site-menu"
    );
    document.documentElement.classList.add("command-open");
    outsideElements.forEach((element) => { element.inert = true; });
    if (triggerRef.current) triggerRef.current.inert = true;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"
      )].filter((element) => !element.inert);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", trapFocus);
    window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.documentElement.classList.remove("command-open");
      outsideElements.forEach((element) => { element.inert = false; });
      if (triggerRef.current) triggerRef.current.inert = false;
      window.removeEventListener("keydown", trapFocus);
      previouslyFocused?.focus();
    };
  }, [open]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-CN");
    if (!needle) return entries.slice(0, 8);

    return entries
      .filter((entry) =>
        [entry.title, entry.description, entry.meta, ...(entry.keywords ?? [])]
          .join(" ")
          .toLocaleLowerCase("zh-CN")
          .includes(needle)
      )
      .slice(0, 8);
  }, [entries, query]);

  const navigate = (href: string) => {
    setOpen(false);
    window.location.assign(href);
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="command-trigger"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>探索</span>
        <kbd>⌘K</kbd>
      </button>

      <div className={`command-layer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <button className="command-backdrop" type="button" onClick={() => setOpen(false)} aria-label="关闭探索面板" />
        <section ref={panelRef} className="command-panel" role="dialog" aria-modal="true" aria-labelledby="command-title">
          <div className="command-panel__header">
            <span className="command-orb" aria-hidden="true" />
            <div>
              <p id="command-title">Quick access / 快速探索</p>
              <span>文章、页面与信号</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="关闭探索面板">ESC</button>
          </div>

          <label className="command-search">
            <span className="sr-only">搜索站内内容</span>
            <Search aria-hidden="true" size={22} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filtered[0]) navigate(filtered[0].href);
              }}
              placeholder="输入标题、标签或关键词…"
              type="search"
              autoComplete="off"
            />
          </label>

          <div className="command-results" aria-live="polite">
            {filtered.map((entry, index) => (
              <button type="button" key={entry.href} onClick={() => navigate(entry.href)}>
                <span className="command-results__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="command-results__copy">
                  <strong>{entry.title}</strong>
                  <small>{entry.description}</small>
                </span>
                <span className="command-results__meta">{entry.meta}</span>
                <ArrowRight aria-hidden="true" size={22} />
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="command-empty">没有找到这条信号。换一个关键词试试。</p>
            )}
          </div>

          <footer className="command-panel__footer">
            <span><kbd>ENTER</kbd> 打开</span>
            <span><kbd>ESC</kbd> 关闭</span>
            <span>{filtered.length} results</span>
          </footer>
        </section>
      </div>
    </>
  );
}
