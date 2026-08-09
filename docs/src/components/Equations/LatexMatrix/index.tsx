import { useLayoutEffect, useRef, useState } from "react";
import { matToStringArray } from "@/utils/matToString";
import Latex from "../Latex";
import styles from "./LatexMatrix.module.css";

// Re-exported so callers building their own `Cell[][]` (e.g. to feed this
// component) can reference the type without a separate import from the
// ambient `src/types/global.d.ts` declaration. `Cell` itself is ambient
// (global, not a module export), so it can't be re-exported directly —
// this mirrors its definition instead.
export type Cell = number | Complex | string;

export interface LatexMatrixProps {
  /** The matrix, as nested rows or as anything with a `toArray()` (e.g. a mathjs `Matrix`). */
  value: Cell[][] | MatrixLikeObject;
  /** Significant digits kept when rendering numbers. Defaults to 3. */
  precision?: number;
  /**
   * Optional LaTeX set before the brackets, e.g. `"\rho ="`. Passed as a plain JSX
   * attribute, not a `{"…"}"` expression — JSX attribute strings don't process
   * backslash escapes, so a single `\` here is one literal backslash at runtime,
   * exactly as typed (unlike `EquationLine`'s `{"…"}"` children, which do need `\\`).
   */
  label?: string;
  /** Render exact zeros in a lighter colour, so sparse states stay readable. Defaults to true. */
  dimZeros?: boolean;
  className?: string;
}

// Matches formatted numeric cells (plain numbers, ±∞, NaN, or a complex "re ± imi"):
// anything `matToStringArray` produced from an actual number, as opposed to a
// symbolic entry like "a" or "b" authored directly in a definition matrix.
const NUMERIC_CELL = /^-?(\d|∞|NaN)/;

/**
 * Builds the `\begin{bmatrix}…\end{bmatrix}` body from the formatted cells.
 *
 * Numeric cells are set in `\texttt` (KaTeX's monospaced font) rather than the
 * default math italic, whose digit widths vary by glyph (a lone "1" is narrower
 * than "0" or "8" in most math fonts). Left in the default font, an interactive
 * matrix's cell — and so the whole bracket — visibly resizes as its digits change
 * while a slider moves; monospacing keeps every digit the same width, so the
 * matrix's footprint stays constant.
 */
function toBmatrix(stArr: string[][], dimZeros: boolean): string {
  const rows = stArr.map((row) =>
    row
      .map((cell) => {
        const body = NUMERIC_CELL.test(cell) ? `\\texttt{${cell}}` : cell;
        return dimZeros && cell === "0" ? `\\htmlClass{${styles.zero}}{${body}}` : body;
      })
      .join(" & "),
  );
  return `\\begin{bmatrix} ${rows.join(" \\\\ ")} \\end{bmatrix}`;
}

/** Below this, digits stop being legible — a matrix that would need to shrink
 *  further than this falls back to horizontal scrolling instead. */
const MIN_SCALE = 0.4;

/** A small margin so the scaled box lands slightly under the available width
 *  rather than exactly at it — the container is clipped (`overflow: hidden`),
 *  not scrolled, so any sub-pixel rounding between the JS-computed scale and
 *  the browser's actual transformed layout would otherwise shave a hair off
 *  the matrix's right edge. */
const FIT_MARGIN = 0.98;

interface Box {
  width: number;
  height: number;
  scale: number;
  /** True when fitting would need to shrink past `MIN_SCALE`. `scale` is then
   *  left at 1 and the box scrolls: a scale is paint only, so the scrollable
   *  extent tracks the matrix's full unscaled width either way — scaling as
   *  well would just strand the difference as empty space at the end of the
   *  scroll, on top of making the digits illegible. */
  stillOverflows: boolean;
}

/**
 * Measures the rendered (unscaled) matrix against the space actually available
 * for it, and reports how much to scale it down to fit — 1 if it already fits.
 * Re-measures on content change, on container resize, and once more after web
 * fonts finish loading (their fallback-font metrics during load would otherwise
 * produce a scale that's slightly off, and then visibly correct itself).
 */
function useShrinkToFit(source: string) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const [box, setBox] = useState<Box | null>(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let cancelled = false;
    const recompute = () => {
      if (cancelled) return;
      // Measure the content against the space its container actually offers.
      // `scrollWidth`/`scrollHeight` are layout metrics and a scale is paint
      // only, so these already report the natural, unscaled size — the scale
      // from a previous pass must NOT be cleared first. Writing to
      // `inner.style` here would desynchronise the DOM from the `style` prop
      // React last committed, and React diffs styles against that prop rather
      // than against the DOM: the next recompute that lands on the same scale
      // would produce no style change, so React would skip the write and leave
      // the cleared transform in place — an unscaled matrix inside a box sized
      // for a scaled one, clipped with no scrollbar.
      const width = inner.scrollWidth;
      const height = inner.scrollHeight;
      // The width set below is a content width (no `box-sizing: border-box`
      // here), so the scroll box's own horizontal padding sits outside it and
      // `max-width: 100%` clamps the sum. Discount that gutter, or a matrix
      // landing within it of the container's width counts as fitting and then
      // gets clipped by exactly the overshoot, with no scrollbar to recover it.
      const outerStyle = getComputedStyle(outer);
      const gutter =
        parseFloat(outerStyle.paddingLeft) +
        parseFloat(outerStyle.paddingRight) +
        parseFloat(outerStyle.borderLeftWidth) +
        parseFloat(outerStyle.borderRightWidth);
      const available = (outer.parentElement?.clientWidth ?? width + gutter) - gutter;
      const fitted = width > available ? (available * FIT_MARGIN) / width : 1;
      const stillOverflows = fitted < MIN_SCALE;
      setBox({ width, height, scale: stillOverflows ? 1 : fitted, stillOverflows });
    };

    recompute();
    const observed = outer.parentElement;
    const ro = new ResizeObserver(recompute);
    if (observed) ro.observe(observed);
    document.fonts?.ready.then(recompute).catch(() => {});

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [source]);

  return { outerRef, innerRef, box };
}

function LatexMatrix({ value, precision = 3, label, dimZeros = true, className }: LatexMatrixProps) {
  const { stArr: formattedCells } = matToStringArray(value, precision);
  const source = `${label ? `${label}\\ ` : ""}${toBmatrix(formattedCells, dimZeros)}`;
  const { outerRef, innerRef, box } = useShrinkToFit(source);

  return (
    <div
      ref={outerRef}
      className={className ? `${styles.scroll} ${className}` : styles.scroll}
      role="math"
      style={
        box
          ? {
              width: box.width * box.scale,
              height: box.height * box.scale,
              // `overflow-x: auto` (the CSS module default) and a scaled-down
              // child don't reliably compose — some browsers size the scroll
              // area off the child's pre-transform box, so the scrollbar shows
              // up anyway even though the visible content already fits. Since
              // the box above is sized to match exactly, clip instead; only
              // fall back to a real scrollbar once shrinking has hit its floor
              // and genuinely can't fit everything.
              overflowX: box.stillOverflows ? "auto" : "hidden",
            }
          : undefined
      }
    >
      <Latex
        ref={innerRef}
        className={styles.matrix}
        style={box ? { transform: `scale(${box.scale})`, transformOrigin: "top left" } : undefined}
      >
        {source}
      </Latex>
    </div>
  );
}

export default LatexMatrix;
