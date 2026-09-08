import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatDate";
import { useLang, useUI } from "../lib/preferencesContext";
import { resolvePost } from "../lib/resolvePost";
import { useReveal } from "../lib/useReveal";

export default function PostListItem({ post, index = 0 }) {
  const [lang] = useLang();
  const ui = useUI();
  const r = resolvePost(post, lang);
  const date = formatDate(post.date);
  const length = `${r.minutes} ${ui.post.minUnit}`;
  const ref = useReveal(Math.min(index, 6) * 55);

  return (
    <article className="row" data-reveal ref={ref}>
      <div className="row__entry">
        <p className="row__coords">
          {date}
          <span className="row__coords-sep" aria-hidden="true">
            /
          </span>
          {post.category}
          <span className="row__coords-sep" aria-hidden="true">
            /
          </span>
          {length}
        </p>
        <h2 className="row__title">
          <Link to={`/posts/${post.slug}`}>{r.title}</Link>
        </h2>
        <p className="row__excerpt">{r.excerpt}</p>
      </div>
      <p className="row__date">{date}</p>
      <p className="row__section">{post.category}</p>
      <p className="row__length">{length}</p>
    </article>
  );
}
