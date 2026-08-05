import styles from "./LatexMatrix.module.css";
import * as math from "mathjs";

/** A mathjs `Complex`, matched structurally so `docs` needs no mathjs dependency. */
interface ComplexLike {
  re: number;
  im: number;
}

/** A mathjs `Matrix`, matched structurally. */
interface MatrixLikeObject {
  toArray(): unknown;
}

/** One entry of the matrix: a real number, a complex number, or literal LaTeX-ish text. */
export type Cell = number | ComplexLike | string;

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

function isComplex(cell: unknown): cell is ComplexLike {
  return (
    typeof cell === "object" &&
    cell !== null &&
    typeof (cell as ComplexLike).re === "number" &&
    typeof (cell as ComplexLike).im === "number"
  );
}

function roundTo(x: number, precision: number): number {
  return x === 0 || !Number.isFinite(x) ? x : Number(x.toPrecision(precision));
}

/** Plain digits with a typographic minus sign, trailing zeros dropped. */
function formatNumber(x: number, precision: number): string {
  if (Number.isNaN(x)) return "NaN";
  if (!Number.isFinite(x)) return x > 0 ? "∞" : "−∞";
  const rounded = roundTo(x, precision);
  if (rounded === 0) return "0";
  return String(rounded).replace("-", "−");
}

function formatComplex({ re, im }: ComplexLike, precision: number): string {
  const r = roundTo(re, precision);
  const i = roundTo(im, precision);
  if (i === 0) return formatNumber(r, precision);

  const magnitude = Math.abs(i);
  const imaginary = magnitude === 1 ? "i" : `${formatNumber(magnitude, precision)}i`;
  if (r === 0) return i < 0 ? `−${imaginary}` : imaginary;

  return `${formatNumber(r, precision)} ${i < 0 ? "−" : "+"} ${imaginary}`;
}

function formatCell(cell: Cell, precision: number): string {
  if (typeof cell === "number") return formatNumber(cell, precision);
  if (isComplex(cell)) return formatComplex(cell, precision);
  return String(cell);
}

/** Normalises any accepted input into a rectangular array of rows. */
function toRows(value: Cell[][] | MatrixLikeObject): Cell[][] {
  const raw = math.isMatrix(value) ? value.toArray() : value;
  if (!Array.isArray(raw)) return [];

  const rows = raw.map((row) => (Array.isArray(row) ? (row as Cell[]) : [row as Cell]));
  const columns = rows.reduce((widest, row) => Math.max(widest, row.length), 0);
  return rows.map((row) =>
    row.length === columns ? row : [...row, ...Array<Cell>(columns - row.length).fill("")],
  );
}

/**
 * Displays a matrix of any size between square brackets, the way LaTeX's
 * `bmatrix` would. Entries may be real numbers, complex numbers, or strings
 * (handy for symbolic entries such as `"a"` or `"√2/2"`).
 */
function LatexMatrix({
  value,
  precision = 3,
  label,
  dimZeros = true,
  className,
}: LatexMatrixProps) {
  const rows = toRows(value);
  const columns = rows[0]?.length ?? 0;

  return (
    <div className={className ? `${styles.scroll} ${className}` : styles.scroll}>
      <div className={styles.matrix} role="math">
        {label ? <span className={styles.label}>{label}</span> : null}
        <span className={styles.body}>
          <span className={`${styles.bracket} ${styles.bracketLeft}`} aria-hidden="true" />
          <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}>
            {rows.map((row, i) =>
              row.map((cell, j) => {
                const text = formatCell(cell, precision);
                const zero = dimZeros && text === "0";
                return (
                  <span
                    key={`${i}-${j}`}
                    className={zero ? `${styles.cell} ${styles.cellZero}` : styles.cell}
                  >
                    {text}
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
