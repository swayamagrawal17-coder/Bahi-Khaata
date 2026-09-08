import { useSearchParams } from "react-router-dom";
import { posts } from "../data/posts";
import { categories, site } from "../config";
import { usePageMeta } from "../lib/usePageMeta";
import { useUI } from "../lib/preferencesContext";
import { useReveal } from "../lib/useReveal";
import PostListItem from "../components/PostListItem";

// Only offer filters for sections that actually have an entry.
const activeCategories = categories.filter((c) =>
  posts.some((p) => p.category === c),
);
const views = ["All", ...activeCategories];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("filter");
  const active = views.includes(requested) ? requested : "All";
  const closeRef = useReveal();
  const ui = useUI();
  usePageMeta();

  function setActive(view) {
    setSearchParams(view === "All" ? {} : { filter: view }, { replace: true });
  }

  function viewLabel(view) {
    return view === "All" ? ui.home.all : view;
  }

  const visible =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  const count =
    active === "All"
      ? ui.home.countAll(posts.length)
      : ui.home.countFiltered(visible.length, posts.length);

  return (
    <div className="container">
      <h1 className="sr-only">{site.name}</h1>

      <div className="views" role="group" aria-label={ui.home.filterGroup}>
        {views.map((view) => (
          <button
            key={view}
            type="button"
            className={"views__btn" + (active === view ? " is-active" : "")}
            aria-pressed={active === view}
            onClick={() => setActive(view)}
          >
            {viewLabel(view)}
          </button>
        ))}
      </div>

      <p className="orientation">{ui.home.orientation}</p>

      <section className="ledger" aria-label={ui.home.colEntry}>
        {visible.length > 0 && (
          <div className="ledger__head" aria-hidden="true">
            <span>{ui.home.colDate}</span>
            <span>{ui.home.colEntry}</span>
            <span>{ui.home.colSection}</span>
            <span className="ledger__head-r">{ui.home.colLength}</span>
          </div>
        )}

        {/* Filters only list sections that have a post, so this branch is
            reached only when the whole blog is empty. */}
        {visible.length === 0 ? (
          <p className="ledger__empty">{ui.home.empty(viewLabel(active))}</p>
        ) : (
          <>
            {visible.map((post, i) => (
              <PostListItem key={post.slug} post={post} index={i} />
            ))}
            <p className="ledger__close" data-reveal ref={closeRef}>
              {ui.home.closeLine(count)}
            </p>
          </>
        )}
      </section>
    </div>
  );
}
