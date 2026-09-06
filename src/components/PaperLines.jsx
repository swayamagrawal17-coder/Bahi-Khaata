import { useRef } from "react";
import { useLenisScroll } from "../lib/lenisContext";

// A faint ruled-paper layer behind the page that drifts slower than the
// content, for a shallow sense of depth. The modulo keeps the translation
// within one line's height so it never runs out.
export default function PaperLines() {
  const ref = useRef(null);

  useLenisScroll((lenis) => {
    if (ref.current) {
      ref.current.style.transform = `translate3d(0, ${(lenis.scroll * 0.3) % 46}px, 0)`;
    }
  });

  return <div className="paper-lines" aria-hidden="true" ref={ref} />;
}
