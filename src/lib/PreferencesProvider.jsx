import { useEffect, useMemo, useState } from "react";
import { PreferencesContext } from "./preferencesContext";
import { LANGS } from "./strings";

// Maps our language codes to a valid `lang` attribute value.
const HTML_LANG = { en: "en", hi: "hi", hinglish: "hi-Latn" };
const MODES = ["brief", "full"];

function readPref(key, allowed, fallback) {
  try {
    const value = localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    // private mode or blocked storage: fall back
    return fallback;
  }
}

export function PreferencesProvider({ children }) {
  const [lang, setLangState] = useState(() => readPref("lang", LANGS, "en"));
  const [readingMode, setModeState] = useState(() =>
    readPref("readingMode", MODES, "full"),
  );

  useEffect(() => {
    document.documentElement.setAttribute("lang", HTML_LANG[lang] || "en");
  }, [lang]);

  function setLang(next) {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }

  function setReadingMode(next) {
    if (!MODES.includes(next)) return;
    setModeState(next);
    try {
      localStorage.setItem("readingMode", next);
    } catch {
      // ignore write failures (private mode, blocked storage)
    }
  }

  const value = useMemo(
    () => ({ lang, setLang, readingMode, setReadingMode }),
    [lang, readingMode],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
