import { forwardRef, type CSSProperties } from "react";
import { renderLatex } from "@/utils/katex";

export interface LatexProps {
  /** LaTeX source. */
  children: string;
  /** Centred, own-line display style instead of the compact inline style. */
  display?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** The KaTeX rendering primitive `EquationLine` and `LatexMatrix` are built on. */
const Latex = forwardRef<HTMLSpanElement, LatexProps>(function Latex(
  { children, display = false, className, style },
  ref,
) {
  return (
    <span
      ref={ref}
      className={className}
      style={style}
      // KaTeX escapes its own output; nothing here comes from user input.
      dangerouslySetInnerHTML={{ __html: renderLatex(children, display) }}
    />
  );
});

export default Latex;
