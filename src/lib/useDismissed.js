import { useState } from "react";

// A one-time flag backed by localStorage: `done` is true once `dismiss()`
// has been called (in this or an earlier visit). Degrades to "always show"
// when storage is unavailable.
export function useDismissed(key) {
  const [done, setDone] = useState(() => {
    try {
      return localStorage.getItem(key) === "1";
    } catch {
      return false;
    }
  });

  function dismiss() {
    setDone(true);
    try {
      localStorage.setItem(key, "1");
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }

  return [done, dismiss];
}
