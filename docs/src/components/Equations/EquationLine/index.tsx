import { Fragment } from "react";
import styles from "./EquationLine.module.css";

export interface EquationLineProps {
  /**
   * The equation, written as text. Characters are taken literally except for
   * `_` and `^`, which lower and raise what follows them — either a single
   * character (`x_i`, `2^n`) or a braced group (`ρ_{insep}`, `ω^{2πi/d}`). A
   * backslash escapes any of `_`, `^` and `\` back into a literal.
   */
  children: string;
}

/** A run of the source: literal text, or text set as a sub- or superscript. */
interface Token {
  text: string;
  script?: "sub" | "sup";
}

/**
 * Reads the argument of a `_` or `^` beginning at `start`: a `{…}` group if one
 * opens there, otherwise the single character that follows. Returns the
 * argument together with the index just past it, or `null` when there is
 * nothing readable — a trailing `_`, or a group that is never closed.
 *
 * Braces nest, so a set written inside a script (`Σ_{i ∈ {X,Y,Z}}`) closes
 * where it should. Whatever the group holds is taken literally: a script is a
 * run of text, not another equation.
 */
function readArgument(source: string, start: number): [string, number] | null {
  if (start >= source.length) return null;

  if (source[start] === "{") {
    let depth = 1;
    for (let end = start + 1; end < source.length; end += 1) {
      if (source[end] === "{") depth += 1;
      if (source[end] === "}") depth -= 1;
      if (depth === 0) return [source.slice(start + 1, end), end + 1];
    }
    return null;
  }

  // A backslash escapes the next character here just as it does elsewhere.
  if (source[start] === "\\" && start + 1 < source.length) {
    return [source[start + 1], start + 2];
  }

  return [source[start], start + 1];
}

/** Splits the source into literal runs and scripted runs, in order. */
function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let literal = "";
  let i = 0;

  const flush = () => {
    if (literal) tokens.push({ text: literal });
    literal = "";
  };

  while (i < source.length) {
    const char = source[i];

    if (char === "\\" && i + 1 < source.length) {
      literal += source[i + 1];
      i += 2;
      continue;
    }

    if (char !== "_" && char !== "^") {
      literal += char;
      i += 1;
      continue;
    }

    const argument = readArgument(source, i + 1);
    if (argument === null) {
      // Nothing to raise or lower, so the marker is just a character.
      literal += char;
      i += 1;
      continue;
    }

    flush();
    tokens.push({ text: argument[0], script: char === "_" ? "sub" : "sup" });
    i = argument[1];
  }

  flush();
  return tokens;
}

/**
 * A single display equation. The text is set in the same serif stack as
 * `LatexMatrix`, so an equation and a matrix quoted next to each other match.
 */
function EquationLine({ children }: EquationLineProps) {
  // Tokens are positional runs of a fixed string, so the index is a stable key.
  const tokens = tokenize(children);

  return (
    <div className={styles.line} role="math">
      {tokens.map((token, index) => {
        if (token.script === "sub") return <sub key={index}>{token.text}</sub>;
        if (token.script === "sup") return <sup key={index}>{token.text}</sup>;
        return <Fragment key={index}>{token.text}</Fragment>;
      })}
    </div>
  );
}

export default EquationLine;
