import { useReadingMode, useUI } from "../lib/preferencesContext";
import { useDismissed } from "../lib/useDismissed";

// Switches the current post between its brief and its full text. The
// site-wide choice is remembered. The first time a reader sees this, a
// small note explains it; it goes away on dismiss or on first use.
export default function ReadingModeToggle() {
  const [mode, setMode] = useReadingMode();
  const ui = useUI();
  const [hintDone, dismissHint] = useDismissed("hintReadingModeSeen");

  function choose(next) {
    setMode(next);
    if (!hintDone) dismissHint();
  }

  const options = [
    ["brief", ui.post.mode.brief],
    ["full", ui.post.mode.full],
  ];

  return (
    <div className="reading-mode">
      <div
        className="reading-mode__group"
        role="group"
        aria-label={ui.post.mode.group}
      >
        {options.map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={
              "reading-mode__btn" + (mode === value ? " is-active" : "")
            }
            aria-pressed={mode === value}
            onClick={() => choose(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {!hintDone && (
        <p className="hint" role="note">
          <span>{ui.post.hint}</span>
          <button
            type="button"
            className="hint__dismiss"
            onClick={dismissHint}
            aria-label={ui.post.hintDismiss}
          >
            &times;
          </button>
        </p>
      )}
    </div>
  );
}
