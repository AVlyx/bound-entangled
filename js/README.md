# bound-entangled

Reference implementations of several families of **bound entangled states** from
the quantum information literature, as [mathjs](https://mathjs.org) matrices.

A bound entangled state is entangled yet has a positive partial transpose (PPT),
so no pure entanglement can be distilled from it. This library collects
constructions that are otherwise scattered across papers into a single, tested
package, each factory returning the density matrix `rho` of the state.

📖 **[Documentation](https://avlyx.github.io/bound-entangled/)** — one page per
state, with the construction written out and what is known about it.

This is the TypeScript port of the Python package of the same name. A handful of
states are still to come — see [TODO.md](TODO.md).

## Installation

```bash
npm install bound-entangled
```

Requires Node ≥ 18. ESM only, ships its own type declarations, and depends on
`mathjs`.

## Usage

States are organized by the Hilbert space they live in, and each module is its
own subpath export. Everything is re-exported from the root as well.

```ts
import { crossHatch, pyramidUpb } from "bound-entangled/c3OtimesC3";
import { yuOh } from "bound-entangled/cdOtimesCd";
import { sn3GridState } from "bound-entangled/c5OtimesC5";

const rho = crossHatch(); // 9x9 PPT-entangled grid state
const sigma = yuOh({ fullDim: 3, x: 0.5, y: 0.1 }); // Yu–Oh nonlocal bound entangled state
```

Any factory taking more than one parameter takes a single options object, so
call sites name what they pass.

The two Horodecki states are both called `horodecki` on their own subpath,
matching the Python package. Since they would collide at the root, they are
re-exported there as `horodecki3By3` and `horodecki2By4`.

Vectors and matrices may be given as plain (nested) arrays or as mathjs
matrices; every function returns a mathjs `Matrix`, so `.toArray()` gets you
back to plain data.

```ts
import { ketbra, upb, partialTranspose, isPSD, isPPT } from "bound-entangled";

const bell = [
  [0.5, 0, 0, 0.5],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0.5, 0, 0, 0.5],
];

isPSD(bell); // true  — a valid density matrix
isPPT(bell, [2, 2]); // false — entangled, and NPT
partialTranspose(bell, [2, 2]); // SWAP / 2
```

## States

### `c2OtimesC4` — C² ⊗ C⁴

| Factory     | State                               | Reference                                                  |
| ----------- | ----------------------------------- | ---------------------------------------------------------- |
| `horodecki` | 2×4 Horodecki bound entangled state | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |

### `c3OtimesC3` — C³ ⊗ C³

| Factory                                | State                                                                             | Reference                                                  |
| -------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `crossHatch`                           | 3×3 "cross-hatch" grid state (CCNR-detected)                                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `horodecki`                            | 3×3 Horodecki bound entangled state                                               | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |
| `tilesUpb`, `tilesBasis`               | State from the Tiles unextendible product basis                                   | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `steeringState`                        | Steerable bound entangled state (counterexample to the stronger Peres conjecture) | [1405.0262](https://arxiv.org/abs/1405.0262)               |
| `ncomms6297`                           | Rank-4 PPT entangled state from an explicit spectral decomposition                | [ncomms6297](https://www.nature.com/articles/ncomms6297)   |
| `pyramidUpb`, `pyramidBasis`           | State from the Pyramid unextendible product basis                                 | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `parametrizedUpb`, `parametrizedBasis` | Six-parameter family of UPBs generalizing Tiles / Pyramid                         | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

### `c4OtimesC4` — C⁴ ⊗ C⁴

| Factory | State                              | Reference                                                  |
| ------- | ---------------------------------- | ---------------------------------------------------------- |
| `piani` | 4×4 Benatti–Floreanini–Piani state | [quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) |

### `c5OtimesC5` — C⁵ ⊗ C⁵

| Factory        | State                                                     | Reference                                      |
| -------------- | --------------------------------------------------------- | ---------------------------------------------- |
| `sn3GridState` | Smallest known Schmidt-number-3 PPT bound entangled state | [2402.12966](https://arxiv.org/abs/2402.12966) |

### `cdOtimesCd` — C^d ⊗ C^d

| Factory                       | State                                               | Reference                                                                                             |
| ----------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `yuOh`, `isValidYuOhInput`    | Yu–Oh family of nonlocal bound entangled states     | [1509.08991](https://arxiv.org/abs/1509.08991)                                                        |
| `genTiles1`, `genTiles1Basis` | GenTiles1 UPB generalizing Tiles to d⊗d, even d≥4   | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070)                                            |
| `badziagPrivateSinglet`       | Bądziąg et al. private-singlet state on C^2d ⊗ C^2d | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `orthogonalSinglet`           | ρ_F2, the second family of PPT singlets             | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `horodecki2ByDGeneralized`    | C² ⊗ C⁴ Horodecki state generalized to C² ⊗ C^d     | [1203.3711](https://arxiv.org/pdf/1203.3711)                                                          |

### `cmOtimesCn` — C^m ⊗ C^n

| Factory                       | State                                                  | Reference                                                  |
| ----------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| `gridState`                   | Quantum grid states from graph edges                   | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `generalizedGridState`        | Grid states generalized to hyperedges                  | [2402.12966](https://arxiv.org/abs/2402.12966)             |
| `genTiles2`, `genTiles2Basis` | GenTiles2 UPB generalizing Tiles to m⊗n, n>3, m≥3, n≥m | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

### `multipartite`

| Factory             | State                                              | Reference                                                  |
| ------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| `smolin`            | Smolin four-party unlockable bound entangled state | [quant-ph/0001001](https://arxiv.org/abs/quant-ph/0001001) |
| `generalizedSmolin` | Generalized Smolin state on 2n qubits              | [quant-ph/0411142](https://arxiv.org/abs/quant-ph/0411142) |
| `quasiDs`           | Quasi-DS (diagonal symmetric) state on an odd number of qubits n ≥ 5 — PPT across every bipartition      | [1706.09423](https://arxiv.org/abs/1706.09423)   |

## `utils`

Building blocks:

| Function                      | Description                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `ket(dims, index)`            | Computational basis vector. `ket(3, 1)` is \|1> in C³; `ket([3, 3], [1, 2])` is \|12> in C³ ⊗ C³.    |
| `ketbra(a, b?)`               | The outer product \|a><b\|, defaulting to \|a><a\|.                                                  |
| `tensor(...factors)`          | Kronecker product of any number of vectors, or of any number of matrices.                            |
| `normalize(v)`                | The unit vector \|v> / \|\| \|v> \|\|.                                                               |
| `normalizeTrace(rho)`         | `rho / tr(rho)`, turning a positive operator into a density matrix.                                  |
| `pauli(index)`                | A Pauli operator by name or index (`0 = I, 1 = X, 2 = Y, 3 = Z`); a list gives their tensor product. |
| `maxEntangled(dim, options?)` | `(1/√d) Σ\|ii>`, or the bare `Σ\|ii>` with `{ normalized: false }`.                                  |
| `fourier(dim)`                | The DFT matrix `W[j][k] = ω^(jk)/√d`.                                                                |
| `tile(index)`                 | One of the five Tile states on C³ ⊗ C³, `index` 0–4.                                                 |
| `upb(basis)`                  | The bound entangled state on the orthogonal complement of an unextendible product basis.             |

Properties:

| Function                            | Description                                                      |
| ----------------------------------- | ---------------------------------------------------------------- |
| `partialTranspose(rho, dims, sys?)` | Partial transpose over the chosen subsystems.                    |
| `permuteSystems(rho, perm, dims?)`  | Reorder the subsystems of an operator.                           |
| `isPSD(m, tol?)`                    | Whether `m` is Hermitian with no negative eigenvalue.            |
| `isPPT(rho, dims, sys?, tol?)`      | Whether the partial transpose of `rho` is positive semidefinite. |

`dims` lists the subsystem dimensions (`[3, 3]` for C³ ⊗ C³, `[2, 2, 2, 2]` for
four qubits) and `sys` selects the subsystem(s) to transpose, **zero-indexed**,
defaulting to `1` — the second subsystem. Either a single index or an array of
them is accepted, so `isPPT(rho, [2, 2, 2, 2], [2, 3])` tests the {0,1} vs {2,3}
cut.

`permuteSystems` reads `perm` positionally and zero-indexed: position `i` of the
new ordering holds the original subsystem `perm[i]`, so on C^A ⊗ C^B ⊗ C^C a
`perm` of `[1, 2, 0]` gives the operator on C^B ⊗ C^C ⊗ C^A. `dims` may be
omitted when the subsystems are of equal dimension.

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
