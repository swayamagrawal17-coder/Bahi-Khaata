import { useSearchParams } from "react-router-dom";
import { posts } from "../data/posts";
import { categories, site } from "../config";
import { usePageMeta } from "../lib/usePageMeta";
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
  usePageMeta();

  function setActive(view) {
    setSearchParams(view === "All" ? {} : { filter: view }, { replace: true });
  }

  const visible =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  const count =
    active === "All"
      ? `${posts.length} ${posts.length === 1 ? "entry" : "entries"}`
      : `${visible.length} of ${posts.length} entries`;

  return (
    <div className="container">
      <h1 className="sr-only">{site.name}</h1>

      <div className="views" role="group" aria-label="Filter entries by section">
        {views.map((view) => (
          <button
            key={view}
            type="button"
            className={"views__btn" + (active === view ? " is-active" : "")}
            aria-pressed={active === view}
            onClick={() => setActive(view)}
          >
            {view}
          </button>
        ))}
      </div>

      <section className="ledger" aria-label="Entries">
        {visible.length > 0 && (
          <div className="ledger__head" aria-hidden="true">
            <span>Date</span>
            <span>Entry</span>
            <span>Section</span>
            <span className="ledger__head-r">Length</span>
          </div>
        )}

        {visible.length === 0 ? (
          <p className="ledger__empty">Nothing filed under {active} yet.</p>
        ) : (
          <>
            {visible.map((post, i) => (
              <PostListItem key={post.slug} post={post} index={i} />
            ))}
            <p className="ledger__close" data-reveal ref={closeRef}>
              {count} recorded
            </p>
          </>
        )}
      </section>
    </div>
  );
}
