import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { useUI } from "../lib/preferencesContext";
import { useReveal } from "../lib/useReveal";

export default function NotFound() {
  usePageMeta({
    title: "No entry found",
    description: "This address has no entry. Everything posted is on the index.",
    robots: "noindex",
  });
  const ui = useUI();
  const headRef = useReveal();
  const bodyRef = useReveal();

  return (
    <div className="container">
      <div className="post__head" data-reveal ref={headRef}>
        <p className="post__section">{ui.notFound.kicker}</p>
        <h1 className="post__title">{ui.notFound.title}</h1>
        <span className="post__mark" aria-hidden="true" />
      </div>

      <div className="prose" data-reveal ref={bodyRef}>
        <p>{ui.notFound.body}</p>
        <dl className="post__record post__record--standalone">
          <dt>{ui.notFound.goTo}</dt>
          <dd>
            <Link to="/">{ui.notFound.indexLink}</Link>
          </dd>
        </dl>
      </div>
    </div>
  );
}
