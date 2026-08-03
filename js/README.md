# bound-entangled

Reference implementations of several families of **bound entangled states** from
the quantum information literature, as [mathjs](https://mathjs.org) matrices.

A bound entangled state is entangled yet has a positive partial transpose (PPT),
so no pure entanglement can be distilled from it. This library collects
constructions that are otherwise scattered across papers into a single, tested
package, each factory returning the density matrix `rho` of the state.

This is the TypeScript port of the Python package of the same name; the state
families are being ported over, and what is available today is the shared
`utils` layer below.

## Installation

```bash
npm install bound-entangled
```

Requires Node ≥ 18. ESM only, ships its own type declarations, and depends on
`mathjs`.

## Usage

```ts
import { ketbra, upb, partialTranspose, isPSD, isPPT } from 'bound-entangled';

const bell = [
  [0.5, 0, 0, 0.5],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0.5, 0, 0, 0.5],
];

isPSD(bell);                        // true  — a valid density matrix
isPPT(bell, [2, 2]);                // false — entangled, and NPT
partialTranspose(bell, [2, 2]);     // SWAP / 2
```

Vectors and matrices may be given as plain (nested) arrays or as mathjs
matrices; every function returns a mathjs `Matrix`, so `.toArray()` gets you
back to plain data.

## `utils`

| Function | Description |
|---|---|
| `ketbra(a, b?)` | The outer product \|a><b\|, defaulting to \|a><a\|. |
| `upb(basis)` | The bound entangled state on the orthogonal complement of an unextendible product basis. |
| `partialTranspose(rho, dims, sys?)` | Partial transpose over the chosen subsystems. |
| `isPSD(m, tol?)` | Whether `m` is Hermitian with no negative eigenvalue. |
| `isPPT(rho, dims, sys?, tol?)` | Whether the partial transpose of `rho` is positive semidefinite. |

`dims` lists the subsystem dimensions (`[3, 3]` for C³ ⊗ C³, `[2, 2, 2, 2]` for
four qubits) and `sys` selects the subsystem(s) to transpose, **zero-indexed**,
defaulting to `1` — the second subsystem. Either a single index or an array of
them is accepted, so `isPPT(rho, [2, 2, 2, 2], [2, 3])` tests the {0,1} vs {2,3}
cut.

`isPSD` decides positivity from the eigenvalues of a real symmetric
representation of the matrix: a Hermitian `H = A + iB` is PSD exactly when the
real symmetric `[[A, -B], [B, A]]` is, which keeps complex states on mathjs'
real symmetric eigensolver. Eigenvalues above `-tol` (default `1e-8`) count as
non-negative, which is the slack the boundary states in this library need.

## Development

```bash
npm install
npm test
npm run typecheck
npm run build
```

## License

MIT
