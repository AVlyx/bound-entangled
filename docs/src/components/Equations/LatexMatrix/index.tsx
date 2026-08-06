import { matToStringArray } from "@/utils/matToString";
import styles from "./LatexMatrix.module.css";

/** A mathjs `Matrix`, matched structurally. */

export interface LatexMatrixProps {
  /** The matrix, as nested rows or as anything with a `toArray()` (e.g. a mathjs `Matrix`). */
  value: Cell[][] | MatrixLikeObject;
  /** Significant digits kept when rendering numbers. Defaults to 3. */
  precision?: number;
  /** Optional text set before the brackets, e.g. `"ρ ="`. */
  label?: string;
  /** Render exact zeros in a lighter colour, so sparse states stay readable. Defaults to true. */
  dimZeros?: boolean;
  className?: string;
}

/** Plain digits with a typographic minus sign, trailing zeros dropped. */

/** Normalises any accepted input into a rectangular array of rows. */

function LatexMatrix({
  value,
  precision = 3,
  label,
  dimZeros = true,
  className,
}: LatexMatrixProps) {
  const { stArr: formattedCells, cols } = matToStringArray(value, precision);

  return (
    <div className={className ? `${styles.scroll} ${className}` : styles.scroll}>
      <div className={styles.matrix} role="math">
        {label ? <span className={styles.label}>{label}</span> : null}
        <span className={styles.body}>
          <span className={`${styles.bracket} ${styles.bracketLeft}`} aria-hidden="true" />
          <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
            {formattedCells.map((row, i) =>
              row.map((cell, j) => {
                const zero = dimZeros && cell === "0";
                return (
                  <span
                    key={`${i}-${j}`}
                    className={zero ? `${styles.cell} ${styles.cellZero}` : styles.cell}
                  >
                    {cell}
                  </span>
                );
              }),
            )}
          </div>
          <span className={`${styles.bracket} ${styles.bracketRight}`} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

export default LatexMatrix;
