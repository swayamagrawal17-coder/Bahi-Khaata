import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { posts } from "../data/posts";
import { readingTime } from "../lib/readingTime";
import { formatDate } from "../lib/formatDate";
import { usePageMeta } from "../lib/usePageMeta";
import { useReveal } from "../lib/useReveal";
import { useParallax } from "../lib/useParallax";
import ScrollProgress from "../components/ScrollProgress";
import NotFound from "./NotFound";

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  const index = posts.findIndex((p) => p.slug === slug);

  usePageMeta({
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

  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <div className="container">
      <ScrollProgress />

      <Link to="/" className="back-link">
        <span aria-hidden="true">&larr;</span> Back to index
      </Link>

      <article className="post">
        <header className="post__head" data-reveal ref={headRef}>
          <p className="post__section">{post.category}</p>
          <h1 className="post__title" ref={titleRef}>
            {post.title}
          </h1>
          <span className="post__mark" aria-hidden="true" />
          <dl className="post__record">
            <dt>Date</dt>
            <dd>{formatDate(post.date)}</dd>
            <dt>Length</dt>
            <dd>{readingTime(post.content)}</dd>
            <dt>Filed</dt>
            <dd>{post.category}</dd>
          </dl>
        </header>

        <div className="post__body" data-reveal ref={bodyRef}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {(newer || older) && (
        <nav
          className="ledger-nav"
          aria-label="More entries"
          data-reveal
          ref={navRef}
        >
          {newer && (
            <Link to={`/posts/${newer.slug}`} className="ledger-nav__item">
              <span className="ledger-nav__label">Newer entry</span>
              <span className="ledger-nav__title">{newer.title}</span>
            </Link>
          )}
          {older && (
            <Link
              to={`/posts/${older.slug}`}
              className="ledger-nav__item ledger-nav__item--next"
            >
              <span className="ledger-nav__label">Older entry</span>
              <span className="ledger-nav__title">{older.title}</span>
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
