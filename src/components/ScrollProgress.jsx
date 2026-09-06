import { useEffect, useState } from "react";
import { useLenisScroll } from "../lib/lenisContext";

// A thin rule at the top of the viewport that fills as you read down a page.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  // Preferred source: Lenis' own progress (0..1).
  useLenisScroll((lenis) => {
    if (Number.isFinite(lenis.progress)) setProgress(lenis.progress);
  });

  // Fallback for the reduced-motion path (no Lenis running).
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? Math.min(1, root.scrollTop / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress.toFixed(4)})` }}
      />
    </div>
  );
}
