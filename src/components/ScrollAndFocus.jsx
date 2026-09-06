import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLenisInstance } from "../lib/lenisContext";

// On every route change (but not the first render): jump to the top and move
// focus to the main region so keyboard and screen-reader users land in the new
// content. On first load we leave focus alone so keyboard users can tab through
// the header normally.
export default function ScrollAndFocus() {
  const { pathname } = useLocation();
  const lenis = useLenisInstance();

  // Keep the current Lenis instance in a ref so route changes don't depend on
  // it: we only want this effect to run when the path actually changes.
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
