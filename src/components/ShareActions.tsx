import { useState } from "react";
import { Share2 } from "lucide-react";

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
      <Share2 aria-hidden="true" size={18} />
      <span aria-live="polite">{status}</span>
    </button>
  );
}
