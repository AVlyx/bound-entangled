import { isMatrix } from "mathjs";
import { formatComplex, formatNumber } from "./numberFormatting";

function isComplex(cell: unknown): cell is Complex {
  return (
    typeof cell === "object" &&
    cell !== null &&
    typeof (cell as Complex).re === "number" &&
    typeof (cell as Complex).im === "number"
  );
}

export function to2DArray(value: Cell[][] | MatrixLikeObject): Cell[][] {
  const raw = isMatrix(value) ? value.toArray() : value;
  if (!Array.isArray(raw)) return [];

  const rows = raw.map((row) => (Array.isArray(row) ? (row as Cell[]) : [row as Cell]));
  const columns = rows.reduce((widest, row) => Math.max(widest, row.length), 0);
  return rows.map((row) =>
    row.length === columns ? row : [...row, ...Array<Cell>(columns - row.length).fill("")],
  );
}

function formatCell(cell: Cell, precision: number): string {
  if (typeof cell === "number") return formatNumber(cell, precision);
  if (isComplex(cell)) return formatComplex(cell, precision);
  return cell;
}

export function matToStringArray(
  value: Cell[][] | MatrixLikeObject,
  precision: number,
): { stArr: string[][]; rows: number; cols: number } {
  const cells = to2DArray(value);
  const stArr = cells.map((row) => row.map((cell) => String(formatCell(cell, precision))));
  const rows = stArr.length;
  const cols = rows > 0 ? stArr[0].length : 0;
  return { stArr, rows, cols };
}

/** The languages a matrix can be copied as, in the order the copy menu lists them. */
export const MATRIX_LANGUAGES = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "julia", label: "Julia" },
  { id: "latex", label: "LaTeX" },
] as const;

export type MatrixLanguage = (typeof MATRIX_LANGUAGES)[number]["id"];

/** How each language spells the two values `String(x)` can't express. */
const NON_FINITE: Record<MatrixLanguage, { nan: string; infinity: string }> = {
  python: { nan: "np.nan", infinity: "np.inf" },
  javascript: { nan: "NaN", infinity: "Infinity" },
  julia: { nan: "NaN", infinity: "Inf" },
  latex: { nan: "\\mathrm{NaN}", infinity: "\\infty" },
};

/**
 * `formatCell` formats for reading, not for pasting: it rounds, and it uses a Unicode
 * minus (U+2212) plus "∞"/"NaN" glyphs, none of which parse as code. Copied cells go
 * through these literals instead — full precision, ASCII, and valid in the target language.
 */
function realLiteral(x: number, language: MatrixLanguage): string {
  if (Number.isNaN(x)) return NON_FINITE[language].nan;
  if (!Number.isFinite(x)) return `${x < 0 ? "-" : ""}${NON_FINITE[language].infinity}`;
  return String(x);
}

/** Imaginary units differ per language, and JavaScript has no complex literal at all. */
function complexLiteral({ re, im }: Complex, language: MatrixLanguage): string {
  if (im === 0) return realLiteral(re, language);

  const real = realLiteral(re, language);
  const sign = im < 0 ? "-" : "+";
  const magnitude = realLiteral(Math.abs(im), language);

  switch (language) {
    case "python":
      return `(${real}${sign}${magnitude}j)`;
    case "javascript":
      // mathjs is what the library itself returns complex entries as.
      return `math.complex(${real}, ${realLiteral(im, language)})`;
    case "julia":
      return `(${real} ${sign} ${magnitude}im)`;
    case "latex":
      return `${real} ${sign} ${magnitude}i`;
  }
}

function cellLiteral(cell: Cell, language: MatrixLanguage): string {
  if (typeof cell === "number") return realLiteral(cell, language);
  if (isComplex(cell)) return complexLiteral(cell, language);
  return cell;
}

export function matToLanguageString(
  value: Cell[][] | MatrixLikeObject,
  language: MatrixLanguage,
): string {
  const cells = to2DArray(value);
  const stArr = cells.map((row) => row.map((cell) => cellLiteral(cell, language)));

  switch (language) {
    case "python": {
      const rows = stArr.map((row) => `[${row.join(", ")}]`).join(", ");
      return `rho = np.array([${rows}])`;
    }
    case "javascript": {
      const rows = stArr.map((row) => `[${row.join(", ")}]`).join(", ");
      return `rho = [${rows}];`;
    }
    case "latex": {
      const rows = stArr.map((row) => row.join(" & ")).join(" \\\\ ");
      return `rho = \\begin{pmatrix} ${rows} \\end{pmatrix}`;
    }
    case "julia": {
      const rows = stArr.map((row) => row.join(" ")).join("; ");
      return `rho = [${rows}]`;
    }
  }
}
