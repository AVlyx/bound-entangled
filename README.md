# bound-entangled

Reference implementations of several families of **bound entangled states** from
the quantum information literature, in Python and TypeScript.

A bound entangled state is entangled yet has a positive partial transpose (PPT),
so no pure entanglement can be distilled from it. This library collects
constructions that are otherwise scattered across papers into a single, tested
package, each factory returning the density matrix `rho` of the state.

📖 **[Documentation](https://avlyx.github.io/bound-entangled/)** — one page per
state, with the construction written out, what is known about it, and the code
to build it in either language.

## Packages

| Package                    | Source                       | Install                        |
| -------------------------- | ---------------------------- | ------------------------------ |
| Python, as NumPy arrays    | [`python/`](python)          | `pip install bound-entangled`  |
| TypeScript, as mathjs matrices | [`js/`](js)              | `npm install bound-entangled`  |

The two expose the same states under the same names — `snake_case` in Python,
`camelCase` in TypeScript — and the TS values are checked entrywise against the
Python ones. Each package has its own README with the full API:
[python/README.md](python/README.md), [js/README.md](js/README.md).

## Usage

States are organized by the Hilbert space they live in (`c3_otimes_c3` = C³ ⊗ C³,
`cm_otimes_cn` = C^m ⊗ C^n, and so on).

```python
from bound_entangled.c3_otimes_c3 import chessboard_extremal_PPT, tiles_upb
from bound_entangled.cd_otimes_cd import yu_oh
from bound_entangled.c5_otimes_c5 import sn3_grid_state

rho = chessboard_extremal_PPT()          # 9x9 PPT-entangled chessboard state
rho = yu_oh(full_dim=3, x=0.5, y=0.1)    # Yu-Oh nonlocal bound entangled state
```

```ts
import { crossHatch, pyramidUpb } from "bound-entangled/c3OtimesC3";
import { yuOh } from "bound-entangled/cdOtimesCd";
import { sn3GridState } from "bound-entangled/c5OtimesC5";

const rho = crossHatch();                            // 9x9 PPT-entangled grid state
const sigma = yuOh({ fullDim: 3, x: 0.5, y: 0.1 });  // Yu–Oh nonlocal bound entangled state
```

## States

A `—` in the TypeScript column marks a state the port still owes the Python
package; see [js/TODO.md](js/TODO.md).

### C² ⊗ C⁴

| Python      | TypeScript                     | State                               | Reference                                                  |
| ----------- | ------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| `horodecki` | `horodecki` (`horodecki2By4`) | 2×4 Horodecki bound entangled state | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |

### C³ ⊗ C³

| Python                                  | TypeScript                             | State                                                                             | Reference                                                  |
| --------------------------------------- | -------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `chessboard`, `chessboard_extremal_PPT` | —                                      | Bruß–Peres chessboard states                                                      | [quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056) |
| `cross_hatch`                           | `crossHatch`                           | 3×3 "cross-hatch" grid state (CCNR-detected)                                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `horodecki`                             | `horodecki` (`horodecki3By3`)          | 3×3 Horodecki bound entangled state                                               | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |
| `ncomms6297`                            | `ncomms6297`                           | Rank-4 PPT entangled state from an explicit spectral decomposition                | [ncomms6297](https://www.nature.com/articles/ncomms6297)   |
| `steering_state`                        | `steeringState`                        | Steerable bound entangled state (counterexample to the stronger Peres conjecture) | [1405.0262](https://arxiv.org/abs/1405.0262)               |
| `tiles_upb`                             | `tilesUpb`, `tilesBasis`               | State from the Tiles unextendible product basis                                   | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `pyramid_upb`                           | `pyramidUpb`, `pyramidBasis`           | State from the Pyramid unextendible product basis                                 | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `parametrized_upb`                      | `parametrizedUpb`, `parametrizedBasis` | Six-parameter family of UPBs generalizing Tiles / Pyramid                         | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

### C⁴ ⊗ C⁴

| Python  | TypeScript | State                              | Reference                                                  |
| ------- | ---------- | ---------------------------------- | ---------------------------------------------------------- |
| `piani` | `piani`    | 4×4 Benatti–Floreanini–Piani state | [quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) |

### C⁵ ⊗ C⁵

| Python           | TypeScript     | State                                                     | Reference                                      |
| ---------------- | -------------- | --------------------------------------------------------- | ---------------------------------------------- |
| `sn3_grid_state` | `sn3GridState` | Smallest known Schmidt-number-3 PPT bound entangled state | [2402.12966](https://arxiv.org/abs/2402.12966) |

### C^d ⊗ C^d

| Python                          | TypeScript                    | State                                               | Reference                                                                                            |
| ------------------------------- | ----------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `yu_oh`, `is_valid_yu_oh_input` | `yuOh`, `isValidYuOhInput`    | Yu–Oh family of nonlocal bound entangled states     | [1509.08991](https://arxiv.org/abs/1509.08991)                                                       |
| `gen_tiles1`                    | `genTiles1`, `genTiles1Basis` | GenTiles1 UPB generalizing Tiles to d⊗d, even d≥4   | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070)                                           |
| `badziag_private_singlet`       | `badziagPrivateSinglet`       | Bądziąg et al. private-singlet state on C^2d ⊗ C^2d | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `orthogonal_singlet`            | `orthogonalSinglet`           | ρ_F2, the second family of PPT singlets             | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `horodecki_2_by_d_generalized`  | `horodecki2ByDGeneralized`    | C² ⊗ C⁴ Horodecki state generalized to C² ⊗ C^d     | [1203.3711](https://arxiv.org/abs/1203.3711)                                                         |

### C^m ⊗ C^n

| Python                                                         | TypeScript                    | State                                                     | Reference                                                  |
| -------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `grid_state`                                                   | `gridState`                   | Quantum grid states from graph edges                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `generalized_grid_state`                                       | `generalizedGridState`        | Grid states generalized to hyperedges                     | [2402.12966](https://arxiv.org/abs/2402.12966)             |
| `gen_tiles2`                                                   | `genTiles2`, `genTiles2Basis` | GenTiles2 UPB generalizing Tiles to m⊗n, n>3, m≥3, n≥m    | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |
| `random_NPT`, `random_PPT`, `random_PPT_close_to_the_PPT_edge` | —                             | Random density matrices by PPT class (rejection sampling) | —                                                          |

### Multipartite

| Python               | TypeScript          | State                                                                      | Reference                                                  |
| -------------------- | ------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `smolin`             | `smolin`            | Smolin four-party unlockable bound entangled state                         | [quant-ph/0001001](https://arxiv.org/abs/quant-ph/0001001) |
| `generalized_smolin` | `generalizedSmolin` | Generalized Smolin state on 2n qubits (bound entangled for all even n ≥ 2) | [quant-ph/0411142](https://arxiv.org/abs/quant-ph/0411142) |
| `quasi_ds`           | `quasiDs`           | Quasi-Dicke bound entangled state on n qubits                              | [ncomms6297](https://www.nature.com/articles/ncomms6297)   |

## Repository layout

| Directory           | Contents                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| [`python/`](python) | The Python package and its pytest suite, published to PyPI on a `v*` tag.                      |
| [`js/`](js)         | The TypeScript package and its vitest suite.                                                   |
| [`docs/`](docs)     | The React site behind the documentation link, deployed to GitHub Pages on every push to `main`. |

## License

MIT
