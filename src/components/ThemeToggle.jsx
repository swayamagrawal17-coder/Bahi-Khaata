import { useEffect, useState } from "react";

function readStored() {
  try {
    const s = localStorage.getItem("theme");
    return s === "light" || s === "dark" ? s : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Point the address-bar / task-switcher colour at the current paper shade.
function syncThemeColor() {
  const sheet = getComputedStyle(document.documentElement)
    .getPropertyValue("--sheet")
    .trim();
  if (!sheet) return;
  let meta = document.head.querySelector('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", sheet);
}

// Sun rays as normalised paths, so CSS can "draw" them with stroke-dashoffset.
// Geometry adapted from the animated-theme-toggle design.
const RAYS = [
  "M12.4 1.76v2",
  "M12.4 21.76v2",
  "M4.63 4.98 6.05 6.4",
  "M18.77 19.12l1.42 1.42",
  "M1.4 12.76h2",
  "M21.4 12.76h2",
  "M4.63 20.54 6.05 19.12",
  "M18.77 6.4 20.19 4.98",
];

const MOON =
  "M21.19 13.2a9 9 0 0 1-9.79 7.96 9 9 0 1 1 0-17.95 7 7 0 0 0 9.79 9.99Z";

export default function ThemeToggle() {
  // `null` means "follow the system"; a string means the user has chosen.
  const [choice, setChoice] = useState(readStored);
  const [system, setSystem] = useState(systemTheme);
  const theme = choice ?? system;
  const isDark = theme === "dark";

  // Track the OS preference at all times, so if the user clears their choice
  // (or never made one) the live value is always current.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setSystem(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    syncThemeColor();
  }, [theme]);

  function toggle() {
    const next = isDark ? "light" : "dark";
    setChoice(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }

  const nextLabel = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      className={"theme-toggle" + (isDark ? " is-dark" : "")}
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      <svg
        viewBox="0 0 25 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <g className="theme-toggle__sun">
          <circle cx="12.4" cy="12.76" r="5" pathLength="1" />
          {RAYS.map((d, i) => (
            <path key={i} d={d} pathLength="1" />
          ))}
        </g>
        <path className="theme-toggle__moon" d={MOON} pathLength="1" />
      </svg>
    </button>
  );
}
