import Latex from "../Latex";
import styles from "./EquationLine.module.css";

export interface EquationLineProps {
  /** The equation, as LaTeX source (e.g. `"\\rho = \\tfrac{1+a}{2}"`). */
  children: string;
}

/**
 * A single display equation, typeset by KaTeX. Set in the same math font as
 * `LatexMatrix`, so an equation and a matrix quoted next to each other match.
 */
function EquationLine({ children }: EquationLineProps) {
  return (
    <div className={styles.line} role="math">
      <Latex display>{children}</Latex>
    </div>
  );
}

export default EquationLine;
