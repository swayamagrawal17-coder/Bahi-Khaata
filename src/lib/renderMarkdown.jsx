// A tiny renderer for the small markdown subset the blog uses:
// blank-line paragraphs, "## subheading", "- list item", **bold**, *italic*,
// and [text](url). It builds React elements directly (no HTML string, no
// dependency), so there is no injection surface.

const INLINE =
  /(\*\*([\s\S]+?)\*\*)|(\*([^*\n]+?)\*)|(\[([^\]]+?)\]\(([^)\s]+?)\))/;

function isSafeHref(href) {
  return (
    /^https?:\/\//i.test(href) ||
    /^mailto:/i.test(href) ||
    href.startsWith("/") ||
    href.startsWith("#")
  );
}

function parseInline(text, keyBase) {
  const nodes = [];
  let rest = text;
  let i = 0;

  for (let m = rest.match(INLINE); m; m = rest.match(INLINE)) {
    if (m.index > 0) nodes.push(rest.slice(0, m.index));
    const key = `${keyBase}-${i++}`;

    if (m[1] !== undefined) {
      nodes.push(<strong key={key}>{parseInline(m[2], key)}</strong>);
    } else if (m[3] !== undefined) {
      nodes.push(<em key={key}>{parseInline(m[4], key)}</em>);
    } else {
      const label = m[6];
      const href = m[7];
      if (isSafeHref(href)) {
        const external = /^https?:\/\//i.test(href);
        nodes.push(
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>,
        );
      } else {
        nodes.push(label);
      }
    }
    rest = rest.slice(m.index + m[0].length);
  }

  if (rest) nodes.push(rest);
  return nodes;
}

export function renderMarkdown(source = "") {
  const blocks = source.trim().split(/\n{2,}/);

  return blocks.map((raw, b) => {
    const block = raw.trim();
    if (!block) return null;

    if (block.startsWith("## ")) {
      return <h2 key={b}>{parseInline(block.slice(3).trim(), `h${b}`)}</h2>;
    }

    const lines = block.split("\n");
    if (lines.every((l) => l.trim().startsWith("- "))) {
      return (
        <ul key={b}>
          {lines.map((l, li) => (
            <li key={li}>{parseInline(l.trim().slice(2), `l${b}-${li}`)}</li>
          ))}
        </ul>
      );
    }

    // A paragraph: soft-wrap single newlines into spaces.
    return <p key={b}>{parseInline(block.replace(/\n/g, " "), `p${b}`)}</p>;
  });
}
