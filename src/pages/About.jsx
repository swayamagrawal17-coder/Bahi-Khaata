import { site } from "../config";
import { usePageMeta } from "../lib/usePageMeta";
import { useUI } from "../lib/preferencesContext";
import { useReveal } from "../lib/useReveal";

export default function About() {
  usePageMeta({
    title: "About",
    description: site.authorBio,
  });
  const ui = useUI();
  const headRef = useReveal();
  const proseRef = useReveal();
  const whyRef = useReveal();
  const recordRef = useReveal();

  // English stays sourced from config so it matches the build-time meta.
  const bioP1 = ui.about.bioP1 || site.authorBio;

  return (
    <div className="container">
      <div className="post__head" data-reveal ref={headRef}>
        <p className="post__section">{ui.about.kicker}</p>
        <h1 className="post__title">{ui.about.title}</h1>
        <span className="post__mark" aria-hidden="true" />
      </div>

      <div className="prose" data-reveal ref={proseRef}>
        <p>{bioP1}</p>
        <p>{ui.about.bioP2}</p>
      </div>

      <section
        className="prose"
        data-reveal
        ref={whyRef}
        aria-labelledby="why-heading"
      >
        <h2 id="why-heading">{ui.about.whyTitle}</h2>
        <p>{ui.about.whyP1}</p>
        <p>{ui.about.whyP2}</p>
      </section>

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

      <p className="about-note">
        <strong>{ui.about.privacyTitle}.</strong> {ui.about.privacy}
      </p>
    </div>
  );
}
