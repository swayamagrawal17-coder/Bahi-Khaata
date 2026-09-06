import { useEffect, useState } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { LenisContext } from "./lenisContext";

export function LenisProvider({ children }) {
  const reduceMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (reduceMotion) return undefined;

    const instance = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      anchors: true,
    });
    // Lenis is an external system created here; publishing it into state is
    // how consumers learn it exists.
    // oxlint-disable-next-line react/set-state-in-effect
    setLenis(instance);

    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
