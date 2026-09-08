import { createContext, useContext } from "react";
import { strings } from "./strings";

// Reader preferences that persist in localStorage: interface language and
// whether posts open in "brief" or "full". Theme is deliberately kept out
// of here (see ThemeToggle.jsx and the pre-paint script in index.html).
export const PreferencesContext = createContext({
  lang: "en",
  setLang: () => {},
  readingMode: "full",
  setReadingMode: () => {},
});

export function usePreferences() {
  return useContext(PreferencesContext);
}

export function useLang() {
  const { lang, setLang } = usePreferences();
  return [lang, setLang];
}

export function useReadingMode() {
  const { readingMode, setReadingMode } = usePreferences();
  return [readingMode, setReadingMode];
}

// The interface-text table for the current language. Every table has every
// key, so this never needs a fallback.
export function useUI() {
  const { lang } = usePreferences();
  return strings[lang] || strings.en;
}
