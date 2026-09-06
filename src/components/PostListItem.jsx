import { Link } from "react-router-dom";
import { readingTime } from "../lib/readingTime";
import { formatDate } from "../lib/formatDate";
import { useReveal } from "../lib/useReveal";

export default function PostListItem({ post, index = 0 }) {
  const date = formatDate(post.date);
  const length = readingTime(post.content);
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
          <Link to={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="row__excerpt">{post.excerpt}</p>
      </div>
      <p className="row__date">{date}</p>
      <p className="row__section">{post.category}</p>
      <p className="row__length">{length}</p>
    </article>
  );
}
