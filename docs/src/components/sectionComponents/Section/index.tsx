import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

/**
 * The base "titled block" every doc-page section is built from: an `<h2>` heading
 * over a `.doc-section` wrapper. `Definition`, `Usage` and `Example`
 * all sit on top of this — reach for it directly for a one-off, differently titled
 * section.
 */
function Section({ title, children }: SectionProps) {
  return (
    <div className="doc-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Section;
