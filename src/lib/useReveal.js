import { useEffect, useRef } from "react";

// Reveals an element the first time it scrolls into view: the CSS transition
// on [data-reveal] does the work; this just flips the attribute. Fails open,
// so content is never left hidden if the observer misbehaves.
export function useReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "in";
      return;
    }

    if (delay) el.style.transitionDelay = `${delay}ms`;

    const show = () => {
      el.dataset.reveal = "in";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    io.observe(el);

    const failOpen = window.setTimeout(show, 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(failOpen);
    };
  }, [delay]);

  return ref;
}
