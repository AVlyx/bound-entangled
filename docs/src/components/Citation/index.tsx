import type { ReactNode } from "react";
import styles from "./Citation.module.css";

interface CitationProps {
  children: ReactNode;
}

function Citation({ children }: CitationProps) {
  return (
    <div className={styles.citation}>
      <h2>References</h2>
      {children}
    </div>
  );
}

export default Citation;
