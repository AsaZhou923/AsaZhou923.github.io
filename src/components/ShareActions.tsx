import { useState } from "react";

interface Props {
  title: string;
  url: string;
}

export default function ShareActions({ title, url }: Props) {
  const [status, setStatus] = useState("复制链接");

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setStatus("已分享");
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("已复制");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setStatus("请手动复制");
    }
    window.setTimeout(() => setStatus("复制链接"), 1800);
  };

  return (
    <button className="share-button" onClick={share} type="button">
      <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" /></svg>
      <span aria-live="polite">{status}</span>
    </button>
  );
}
