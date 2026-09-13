import { site } from "../config";
import { useUI } from "../lib/preferencesContext";
import { RandomLetterSwap } from "./RandomLetterSwap";

export default function Footer() {
  const ui = useUI();

  return (
    <footer className="colophon">
      <span>{ui.footer.keptBy(site.author)}</span>
      <span className="colophon__item">
        <span className="colophon__sep" aria-hidden="true">
          /
        </span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </span>
      <span className="colophon__item">
        <span className="colophon__sep" aria-hidden="true">
          /
        </span>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </span>
      <span className="colophon__item">
        <span className="colophon__sep" aria-hidden="true">
          /
        </span>
        <a
          href="https://swayam-agrawal.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="colophon__portfolio"
        >
          <RandomLetterSwap label="swayam-agrawal.vercel.app" />
        </a>
      </span>
    </footer>
  );
}
