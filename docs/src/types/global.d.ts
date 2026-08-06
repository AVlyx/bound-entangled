// Global/ambient types for the app.
// No top-level `import`/`export` in this file — that's what makes every
// declaration below available anywhere in `src` without an import.

// Matched structurally everywhere it's used (`matToString.ts`, `numberFormatting.ts`,
// the UPB pages' own cleaned-up copies) — never a real mathjs `Complex` instance,
// so the type asks for only what's actually read: the real and imaginary parts.
interface Complex {
  re: number;
  im: number;
}

type Cell = number | Complex | string;

interface MatrixLikeObject {
  toArray(): unknown;
}
