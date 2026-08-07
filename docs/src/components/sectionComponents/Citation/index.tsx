import styles from "./Citation.module.css";
import BibTex from "@/components/BibTex";

interface CitationProps {
  bibTex: string;
}
interface CitationsProps {
  citations: CitationProps[];
}

function Citation({ citations }: CitationsProps) {
  return (
    <div className={styles.citation}>
      <h2>References</h2>
      {citations.map(({ bibTex }) => (
        <BibTex>{bibTex}</BibTex>
      ))}
    </div>
  );
}

export default Citation;
