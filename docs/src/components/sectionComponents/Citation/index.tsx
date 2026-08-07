import { BibTex } from "react-bibtex";
import styles from "./Citation.module.css";

interface CitationProps {
  bibTex: string;
  arxivLink: string;
}
interface CitationsProps {
  citations: CitationProps[];
}

function Citation({ citations }: CitationsProps) {
  return (
    <div className={styles.citation}>
      <h2>References</h2>
      {citations.map(({ bibTex, arxivLink }) => (
        <>
          <BibTex>{bibTex}</BibTex>
          <a href={arxivLink}>Link to arxiv</a>
          <br />
        </>
      ))}
    </div>
  );
}

export default Citation;
