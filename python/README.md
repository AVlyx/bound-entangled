# bound-entangled

Reference implementations of several families of **bound entangled states** from
the quantum information literature, as plain NumPy density matrices.

A bound entangled state is entangled yet has a positive partial transpose (PPT),
so no pure entanglement can be distilled from it. This library collects
constructions that are otherwise scattered across papers into a single, tested
package, each factory returning the density matrix `rho` of the state.

📖 **[Documentation](https://avlyx.github.io/bound-entangled/)** — one page per
state, with the construction written out and what is known about it.

There is a TypeScript port of this package, also called `bound-entangled` — see
[js/README.md](https://github.com/AVlyx/bound-entangled/blob/main/js/README.md).

## Installation

```bash
pip install bound-entangled
```

From a clone (the package lives in the `python/` directory):

```bash
cd python && pip install -e ".[test]"
```

Requires Python ≥ 3.9. Depends on [`toqito`](https://toqito.readthedocs.io) and
NumPy.

## Usage

Packages are organized by the bipartite Hilbert space the states live in
(`c3_otimes_c3` = C³ ⊗ C³, `cm_otimes_cn` = C^m ⊗ C^n, etc.).

```python
from bound_entangled.c3_otimes_c3 import chessboard_extremal_PPT, tiles_upb, pyramid_upb
from bound_entangled.cd_otimes_cd import yu_oh
from bound_entangled.c5_otimes_c5 import sn3_grid_state

rho = chessboard_extremal_PPT()          # 9x9 PPT-entangled chessboard state
rho = yu_oh(full_dim=3, x=0.5, y=0.1)    # Yu-Oh nonlocal bound entangled state
```

The two Horodecki states are both called `horodecki`, each in the package of the
space it lives in: `c2_otimes_c4` and `c3_otimes_c3`.

## States

### `c2_otimes_c4` — C² ⊗ C⁴

| Factory     | State                               | Reference                                                  |
| ----------- | ----------------------------------- | ---------------------------------------------------------- |
| `horodecki` | 2×4 Horodecki bound entangled state | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |

### `c3_otimes_c3` — C³ ⊗ C³

| Factory                                 | State                                                                             | Reference                                                  |
| --------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `chessboard`, `chessboard_extremal_PPT` | Bruß–Peres chessboard states                                                      | [quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056) |
| `cross_hatch`                           | 3×3 "cross-hatch" grid state (CCNR-detected)                                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `horodecki`                             | 3×3 Horodecki bound entangled state                                               | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |
| `ncomms6297`                            | Rank-4 PPT entangled state from an explicit spectral decomposition                | [ncomms6297](https://www.nature.com/articles/ncomms6297)   |
| `steering_state`                        | Steerable bound entangled state (counterexample to the stronger Peres conjecture) | [1405.0262](https://arxiv.org/abs/1405.0262)               |
| `tiles_upb`, `pyramid_upb`              | States from the Tiles / Pyramid unextendible product bases                        | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `parametrized_upb`                      | Six-parameter family of UPBs generalizing Tiles / Pyramid                         | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

### `c4_otimes_c4` — C⁴ ⊗ C⁴

| Factory | State                              | Reference                                                  |
| ------- | ---------------------------------- | ---------------------------------------------------------- |
| `piani` | 4×4 Benatti–Floreanini–Piani state | [quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) |

### `c5_otimes_c5` — C⁵ ⊗ C⁵

| Factory          | State                                                     | Reference                                      |
| ---------------- | --------------------------------------------------------- | ---------------------------------------------- |
| `sn3_grid_state` | Smallest known Schmidt-number-3 PPT bound entangled state | [2402.12966](https://arxiv.org/abs/2402.12966) |

### `cd_otimes_cd` — C^d ⊗ C^d

| Factory                         | State                                               | Reference                                                                                            |
| ------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `yu_oh`, `is_valid_yu_oh_input` | Yu–Oh family of nonlocal bound entangled states     | [1509.08991](https://arxiv.org/abs/1509.08991)                                                       |
| `gen_tiles1`                    | GenTiles1 UPB generalizing Tiles to d⊗d, even d≥4   | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070)                                           |
| `badziag_private_singlet`       | Bądziąg et al. private-singlet state on C^2d ⊗ C^2d | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `orthogonal_singlet`            | ρ_F2, the second family of PPT singlets             | [PRResearch 3, 023101](https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101) |
| `horodecki_2_by_d_generalized`  | C² ⊗ C⁴ Horodecki state generalized to C² ⊗ C^d     | [1203.3711](https://arxiv.org/abs/1203.3711)                                                         |

### `cm_otimes_cn` — C^m ⊗ C^n (parametric constructions)

| Factory                                                        | State                                                     | Reference                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `grid_state`                                                   | Quantum grid states from graph edges                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `generalized_grid_state`                                       | Grid states generalized to hyperedges                     | [2402.12966](https://arxiv.org/abs/2402.12966)             |
| `gen_tiles2`                                                   | GenTiles2 UPB generalizing Tiles to m⊗n, n>3, m≥3, n≥m    | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |
| `random_NPT`, `random_PPT`, `random_PPT_close_to_the_PPT_edge` | Random density matrices by PPT class (rejection sampling) | —                                                          |

### `multipartite` — multipartite systems

| Factory              | State                                                                      | Reference                                                  |
| -------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `smolin`             | Smolin four-party unlockable state — separable across 2\|2 cuts, NPT across 1\|3 | [quant-ph/0001001](https://arxiv.org/abs/quant-ph/0001001) |
| `generalized_smolin` | Generalized Smolin state on 2n qubits — separable across 2\|n−2 cuts, NPT across 1\|n−1 and n/2\|n/2 | [quant-ph/0411142](https://arxiv.org/abs/quant-ph/0411142) |
| `quasi_ds`           | Quasi-DS (diagonal symmetric) state on an odd number of qubits n ≥ 5 — PPT across every bipartition                              | [1706.09423](https://arxiv.org/abs/1706.09423)   |

### `utils`

| Function        | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| `ketbra(a, b?)` | The outer product \|a><b\|, defaulting to \|a><a\|.                                      |
| `upb(basis)`    | The bound entangled state on the orthogonal complement of an unextendible product basis. |

## Development

```bash
pip install -e ".[test]"
pytest
```

Most of the suite lives in the docstrings. Every state factory carries an
`Examples` block asserting that what it returns is a valid density matrix, that
it is PPT, and how `is_separable` classifies it — run as doctests by `pytest`,
so the documented behaviour and the tested behaviour cannot drift apart. The
files under `tests/` cover only what a finished state cannot show: that the
product bases behind the UPB constructions really are orthonormal, that invalid
parameters raise, and the index arithmetic in the grid-state helpers.

## License

MIT
