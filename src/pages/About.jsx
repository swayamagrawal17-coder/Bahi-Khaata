import { site } from "../config";
import { usePageMeta } from "../lib/usePageMeta";
import { useReveal } from "../lib/useReveal";

export default function About() {
  usePageMeta({
    title: "About",
    description: site.authorBio,
  });
  const headRef = useReveal();
  const proseRef = useReveal();
  const recordRef = useReveal();

  return (
    <div className="container">
      <div className="post__head" data-reveal ref={headRef}>
        <p className="post__section">The ledger keeper</p>
        <h1 className="post__title">About</h1>
        <span className="post__mark" aria-hidden="true" />
      </div>

      <div className="prose" data-reveal ref={proseRef}>
        <p>{site.authorBio}</p>
        <p>
          This blog is where that learning happens in public: field research,
          financial models, and explainers written as I work through them, not
          after the fact.
        </p>
      </div>

      <dl
        className="post__record post__record--standalone"
        data-reveal
        ref={recordRef}
      >
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            {site.linkedin.replace("https://", "")}
          </a>
        </dd>
      </dl>
    </div>
  );
}
