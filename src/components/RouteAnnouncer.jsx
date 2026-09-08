import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Announces the new page to screen readers after a client-side navigation,
// since moving focus to <main> alone does not speak the new title.
export default function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return undefined;
    }
    // Let usePageMeta update document.title first.
    const id = window.setTimeout(() => {
      setMessage(document.title);
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
