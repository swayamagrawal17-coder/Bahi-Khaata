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

export default function ThemeToggle() {
  // `null` means "follow the system"; a string means the user has chosen.
  const [choice, setChoice] = useState(readStored);
  const [system, setSystem] = useState(systemTheme);
  const theme = choice ?? system;

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
    const nextChoice = theme === "dark" ? "light" : "dark";
    setChoice(nextChoice);
    try {
      localStorage.setItem("theme", nextChoice);
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }

  const nextLabel = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
    >
      {theme === "dark" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
