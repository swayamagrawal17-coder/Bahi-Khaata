import { useLang, useUI } from "../lib/preferencesContext";
import { LANGS } from "../lib/strings";

export default function LangToggle() {
  const [lang, setLang] = useLang();
  const ui = useUI();

  return (
    <div className="lang-toggle" role="group" aria-label={ui.lang.group}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={"lang-toggle__btn" + (lang === code ? " is-active" : "")}
          aria-pressed={lang === code}
          lang={code === "hi" ? "hi" : undefined}
          onClick={() => setLang(code)}
        >
          {ui.lang[code]}
        </button>
      ))}
    </div>
  );
}
