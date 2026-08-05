import type { ReactElement } from "react";
import type EquationLine from "../EquationLine";
import type { EquationLineProps } from "../EquationLine";
import styles from "./EquationBlock.module.css";

/** An `<EquationLine>` element — the only child this block takes. */
export type EquationLineElement = ReactElement<EquationLineProps, typeof EquationLine>;

export interface EquationBlockProps {
  /** The lines of the equation, in the order they should be read. */
  children: EquationLineElement | EquationLineElement[];
}

/**
 * Groups consecutive `EquationLine`s into one display equation, so a definition
 * spread over several lines reads as a single block rather than as a series of
 * unrelated equations.
 */
function EquationBlock({ children }: EquationBlockProps) {
  // Each line already carries `role="math"`; nesting another one here would
  // only announce a second, empty formula.
  return <div className={styles.block}>{children}</div>;
}

export default EquationBlock;
