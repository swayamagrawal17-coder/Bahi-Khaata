import { createContext, useContext, useEffect, useRef } from "react";

// The running Lenis instance, or null while smooth scroll is off
// (reduced-motion, or before it has mounted).
export const LenisContext = createContext(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

// Subscribes `callback` to Lenis' scroll event. The callback receives the
// Lenis instance (read `.scroll`, `.velocity`, `.progress`). No-op while
// Lenis isn't running (reduced-motion).
export function useLenisScroll(callback) {
  const lenis = useLenisInstance();
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    if (!lenis) return undefined;
    const handler = () => cbRef.current(lenis);
    lenis.on("scroll", handler);
    handler();
    return () => lenis.off("scroll", handler);
  }, [lenis]);
}
