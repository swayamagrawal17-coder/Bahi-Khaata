import { useEffect, useRef } from "react";
import { useLenisScroll } from "./lenisContext";

// Gentle parallax: the element drifts upward as the page scrolls, so it
// leaves a little faster than the normal flow. Driven by Lenis' smoothed
// scroll value; a no-op when Lenis isn't running (reduced-motion path).
export function useParallax(rate = 0.07, maxPx = 26) {
  const ref = useRef(null);

  useLenisScroll((lenis) => {
    const el = ref.current;
    if (!el) return;
    const y = -Math.min(lenis.scroll * rate, maxPx);
    el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) el.style.transform = "";
    };
  }, []);

  return ref;
}
