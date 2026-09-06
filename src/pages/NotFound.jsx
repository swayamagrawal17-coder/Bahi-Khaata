import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { useReveal } from "../lib/useReveal";

export default function NotFound() {
  usePageMeta({
    title: "No entry found",
    description: "This address has no entry. Everything posted is on the index.",
    robots: "noindex",
  });
  const headRef = useReveal();
  const bodyRef = useReveal();

  return (
    <div className="container">
      <div className="post__head" data-reveal ref={headRef}>
        <p className="post__section">Unrecorded</p>
        <h1 className="post__title">No entry at this address</h1>
        <span className="post__mark" aria-hidden="true" />
      </div>

      <div className="prose" data-reveal ref={bodyRef}>
        <p>
          The link may be mistyped, or the entry has moved. Everything that has
          been posted is on the index.
        </p>
        <dl className="post__record post__record--standalone">
          <dt>Go to</dt>
          <dd>
            <Link to="/">The index</Link>
          </dd>
        </dl>
      </div>
    </div>
  );
}
