import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";
import { readingTime } from "../lib/readingTime";
import { formatDate } from "../lib/formatDate";
import { renderMarkdown } from "../lib/renderMarkdown";
import { usePageMeta } from "../lib/usePageMeta";
import { useLang, useReadingMode, useUI } from "../lib/preferencesContext";
import { resolvePost, resolveBody } from "../lib/resolvePost";
import { useReveal } from "../lib/useReveal";
import { useParallax } from "../lib/useParallax";
import ScrollProgress from "../components/ScrollProgress";
import ReadingModeToggle from "../components/ReadingModeToggle";
import NotFound from "./NotFound";

// Each post's text is its own chunk, loaded only when the post is opened.
const contentModules = import.meta.glob("../data/content/*.js");

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const index = posts.findIndex((p) => p.slug === slug);

  // Hooks run before any early return.
  const [lang] = useLang();
  const [readingMode] = useReadingMode();
  const ui = useUI();

  const [mod, setMod] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    // Reset while the next post's text chunk downloads.
    // oxlint-disable-next-line react/set-state-in-effect
    setMod(null);
    setStatus("loading");
    const loader = contentModules[`../data/content/${slug}.js`];
    if (!loader) {
      setStatus("error");
      return undefined;
    }
    loader()
      .then((m) => {
        if (!cancelled) {
          setMod(m.default);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  usePageMeta({
    // Kept English: matches the static HTML and canonical link.
    title: post ? post.title : "No entry found",
    description: post ? post.excerpt : undefined,
    robots: post ? undefined : "noindex",
  });
  const headRef = useReveal();
  const bodyRef = useReveal();
  const navRef = useReveal();
  const titleRef = useParallax(0.07, 26);

  // Keep the URL as typed, but show the not-found page in place rather than
  // redirecting: a stale link stays diagnosable.
  if (!post) return <NotFound />;
  if (status === "error") return <NotFound />;

  const r = resolvePost(post, lang);
  const body = resolveBody(mod, lang);
  const showBrief = readingMode === "brief" && r.hasBrief;
  const text = showBrief ? body.brief : body.content;

  const newer = posts[index - 1];
  const older = posts[index + 1];
  const newerR = newer && resolvePost(newer, lang);
  const olderR = older && resolvePost(older, lang);

  return (
    <div className="container">
      <ScrollProgress />

      <Link to="/" className="back-link">
        <span aria-hidden="true">&larr;</span> {ui.post.back}
      </Link>

      <article className="post">
        <header className="post__head" data-reveal ref={headRef}>
          <p className="post__section">{post.category}</p>
          <h1 className="post__title" ref={titleRef}>
            {r.title}
          </h1>
          <span className="post__mark" aria-hidden="true" />
          <dl className="post__record">
            <dt>{ui.post.recDate}</dt>
            <dd>{formatDate(post.date)}</dd>
            <dt>{ui.post.recLength}</dt>
            <dd>
              {status === "ready"
                ? readingTime(text, ui.post.minUnit)
                : "…"}
            </dd>
            <dt>{ui.post.recFiled}</dt>
            <dd>{post.category}</dd>
          </dl>
          {r.hasBrief && <ReadingModeToggle />}
        </header>

        <div className="post__body" data-reveal ref={bodyRef}>
          {status === "ready" ? (
            renderMarkdown(text)
          ) : (
            <div className="post__loading" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
      </article>

      {(newerR || olderR) && (
        <nav
          className="ledger-nav"
          aria-label={ui.post.moreGroup}
          data-reveal
          ref={navRef}
        >
          {newerR && (
            <Link to={`/posts/${newer.slug}`} className="ledger-nav__item">
              <span className="ledger-nav__label">{ui.post.newer}</span>
              <span className="ledger-nav__title">{newerR.title}</span>
            </Link>
          )}
          {olderR && (
            <Link
              to={`/posts/${older.slug}`}
              className="ledger-nav__item ledger-nav__item--next"
            >
              <span className="ledger-nav__label">{ui.post.older}</span>
              <span className="ledger-nav__title">{olderR.title}</span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
