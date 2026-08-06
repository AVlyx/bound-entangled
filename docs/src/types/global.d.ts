// Global/ambient types for the app.
// No top-level `import`/`export` in this file — that's what makes every
// declaration below available anywhere in `src` without an import.
//
// To reference a type from another package without adding a top-level
// `import` (which would turn this file into a module and break the
// "no import needed" behavior), use an inline `import(...)` type query:

type Complex = import("mathjs").Complex;
type Cell = number | Complex | string;

interface MatrixLikeObject {
  toArray(): unknown;
}
