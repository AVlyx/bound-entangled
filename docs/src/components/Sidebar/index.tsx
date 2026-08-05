import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation, type NavItem, type NavSection } from "../../navigation";
import styles from "./Sidebar.module.css";

function matches(item: NavItem, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    item.title.toLowerCase().includes(needle) ||
    (item.fn?.toLowerCase().includes(needle) ?? false) ||
    (item.space?.toLowerCase().includes(needle) ?? false)
  );
}

/** Keeps only the entries matching the filter, dropping sections left empty. */
function filterSections(query: string): NavSection[] {
  if (!query.trim()) return navigation;

  return navigation
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => matches(item, query)),
      groups: section.groups
        ?.map((group) => ({ ...group, items: group.items.filter((item) => matches(item, query)) }))
        .filter((group) => group.items.length > 0),
    }))
    .filter((section) => section.items.length > 0 || (section.groups?.length ?? 0) > 0);
}

function SidebarLink({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === "/"}
        onClick={onNavigate}
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
      >
        {item.title}
      </NavLink>
    </li>
  );
}

/**
 * Navigation between the documentation pages. On wide screens it sits to the
 * left of the page and stays put while the page scrolls; on narrow ones it
 * collapses behind a button and closes again as soon as a page is opened.
 */
function Sidebar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navId = useId();

  const close = () => setOpen(false);
  const sections = filterSections(query);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        {open ? "Close" : "Browse states"}
      </button>

      {open ? <div className={styles.backdrop} onClick={close} aria-hidden="true" /> : null}

      <nav
        id={navId}
        className={open ? `${styles.sidebar} ${styles.open}` : styles.sidebar}
        aria-label="Documentation"
      >
        <NavLink to="/" className={styles.brand} onClick={close}>
          bound-entangled
        </NavLink>

        <input
          type="search"
          className={styles.search}
          placeholder="Filter states…"
          aria-label="Filter states"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={styles.list}>
              {section.items.map((item) => (
                <SidebarLink key={item.path} item={item} onNavigate={close} />
              ))}
            </ul>

            {section.groups?.map((group) => (
              <div key={group.title} className={styles.group}>
                <p className={styles.groupTitle}>{group.title}</p>
                <ul className={styles.list}>
                  {group.items.map((item) => (
                    <SidebarLink key={item.path} item={item} onNavigate={close} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        {sections.length === 0 ? <p className={styles.empty}>No state matches “{query}”.</p> : null}
      </nav>
    </>
  );
}

export default Sidebar;
