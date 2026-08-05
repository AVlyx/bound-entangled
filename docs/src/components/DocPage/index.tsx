import { useEffect } from "react";
import { Link } from "react-router-dom";
import { navItems, type NavItem } from "../../navigation";
import styles from "./DocPage.module.css";

interface DocPageProps {
  item: NavItem;
}

/**
 * Frame around a documentation page: the title block comes from the navigation
 * entry, the body from the page's own component, and the previous/next links
 * follow the sidebar order.
 */
function DocPage({ item }: DocPageProps) {
  const { Component } = item;
  const index = navItems.findIndex((candidate) => candidate.path === item.path);
  const previous = index > 0 ? navItems[index - 1] : undefined;
  const next = index >= 0 ? navItems[index + 1] : undefined;

  useEffect(() => {
    document.title = item.path === "/" ? "bound-entangled" : `${item.title} · bound-entangled`;
    window.scrollTo(0, 0);
  }, [item]);

  return (
    <article className="doc">
      <header>
        {item.space ? <p className="doc-eyebrow">{item.space}</p> : null}
        <h1 className="doc-title">{item.title}</h1>
        {item.fn ? <p className="api-signature">{item.fn}()</p> : null}
        {item.summary ? <p className="doc-lead">{item.summary}</p> : null}
      </header>

      <Component />

      {previous || next ? (
        <nav className={styles.pager} aria-label="Pagination">
          {previous ? (
            <Link to={previous.path} className={styles.previous}>
              <span className={styles.direction}>Previous</span>
              {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={next.path} className={styles.next}>
              <span className={styles.direction}>Next</span>
              {next.title}
            </Link>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}

export default DocPage;
