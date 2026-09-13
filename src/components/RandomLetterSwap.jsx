import { useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function RandomLetterSwap({
  label,
  staggerDuration = 0.03,
  className = "",
  onClick,
}) {
  const [displayText, setDisplayText] = useState(label);
  const isAnimatingRef = useRef(false);
  const reduceMotion = usePrefersReducedMotion();

  const animateSwap = () => {
    if (reduceMotion || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const letters = label.split("");
    const duration = 300; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const newText = letters
        .map((char, index) => {
          // Stagger: each letter starts animating at a different time
          const staggerDelay = index * staggerDuration * 1000;
          const letterProgress = Math.max(0, progress - staggerDelay / duration);

          // If this letter hasn't started animating yet, show original
          if (letterProgress === 0) return char;

          // If animation is complete, show original
          if (letterProgress >= 1) return char;

          // During animation, show random character
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(label);
        isAnimatingRef.current = false;
      }
    };

    animate();
  };

  return (
    <span
      className={`letter-swap ${className}`.trim()}
      onClick={onClick}
      onMouseEnter={animateSwap}
      onFocus={animateSwap}
    >
      {displayText}
    </span>
  );
}
