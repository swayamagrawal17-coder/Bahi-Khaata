import { NavLink, Link } from "react-router-dom";
import { site } from "../config";
import { useUI } from "../lib/preferencesContext";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import mark from "../assets/logo-mark.png";

export default function Header() {
  const ui = useUI();

  return (
    <header className="masthead">
      <div className="masthead__id">
        <Link to="/" className="wordmark">
          <img src={mark} alt="" className="wordmark__mark" width="26" height="34" />
          <span>{site.name}</span>
        </Link>
        <p className="tagline">{site.tagline}</p>
      </div>
      <nav className="masthead__nav" aria-label="Primary">
        <NavLink to="/" end>
          {ui.nav.index}
        </NavLink>
        <NavLink to="/about">{ui.nav.about}</NavLink>
        <LangToggle />
        <ThemeToggle />
      </nav>
    </header>
  );
}
