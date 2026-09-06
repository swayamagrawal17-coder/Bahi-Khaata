import { site } from "../config";

export default function Footer() {
  return (
    <footer className="colophon">
      <span>Kept by {site.author}</span>
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
