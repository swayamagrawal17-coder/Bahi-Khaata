import { site } from "../config";
import { useUI } from "../lib/preferencesContext";

export default function Footer() {
  const ui = useUI();

  return (
    <footer className="colophon">
      <span>{ui.footer.keptBy(site.author)}</span>
      <span className="colophon__sep" aria-hidden="true">
        /
      </span>
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <span className="colophon__sep" aria-hidden="true">
        /
      </span>
      <a href={site.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
    </footer>
  );
}
