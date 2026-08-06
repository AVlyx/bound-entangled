import katex from "katex";
import type { StrictFunction } from "katex";

/**
 * Every equation on this site is authored by us, never by a visitor, so
 * `trust: true` (needed for `\htmlClass`, used to dim zero entries in
 * `LatexMatrix`) is safe. KaTeX's strict mode otherwise warns on that macro
 * specifically ("htmlExtension"); everything else still warns normally so a
 * genuine typo in an equation surfaces in the console during development.
 */
const strict: StrictFunction = (errorCode) => (errorCode === "htmlExtension" ? "ignore" : "warn");

/**
 * Renders a LaTeX source string to KaTeX's HTML. Malformed input renders
 * KaTeX's own inline error span instead of throwing, so one bad equation
 * can't take the whole page down.
 */
export function renderLatex(source: string, displayMode: boolean): string {
  return katex.renderToString(source, {
    throwOnError: false,
    displayMode,
    trust: true,
    strict,
  });
}
