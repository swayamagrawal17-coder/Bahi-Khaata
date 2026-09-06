import { NavLink, Link } from "react-router-dom";
import { site } from "../config";
import ThemeToggle from "./ThemeToggle";
import mark from "../assets/logo-mark.png";

export default function Header() {
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
          Index
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  );
}
