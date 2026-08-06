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

export function matToLanguageString(
  value: Cell[][] | MatrixLikeObject,
  language: "python" | "javascript" | "latex" | "julia",
): string {
  const cells = to2DArray(value);
  const stArr = cells.map((row) => row.map((cell) => formatCell(cell, -1)));

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
