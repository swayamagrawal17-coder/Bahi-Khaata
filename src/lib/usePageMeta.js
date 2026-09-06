import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../config";

const DEFAULT_DESCRIPTION =
  "Notes on markets, money, and policy, written while learning it, by Swayam Agrawal.";

function setMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Keeps the document title, meta description, canonical link and robots
// directive in sync with the current page. Pass `robots: "noindex"` for
// pages that should stay out of search results (404, etc).
export function usePageMeta({ title, description, robots } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : site.name;

    setMeta("description", description || DEFAULT_DESCRIPTION);
    setMeta("robots", robots || null);

    const base = (site.url || window.location.origin).replace(/\/$/, "");
    setCanonical(`${base}${pathname}`);

    return () => {
      // Leave title/description in place for the next page to overwrite;
      // only clear the transient robots override.
      if (robots) setMeta("robots", null);
    };
  }, [title, description, robots, pathname]);
}
