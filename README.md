# bound-entangled

[![Documentation](https://img.shields.io/badge/docs-zensical-blue?style=for-the-badge&logo=materialformkdocs&logoColor=white)](https://avlyx.github.io/bound-entangled/)
[![PyPI](https://img.shields.io/badge/pypi-package-blue?style=for-the-badge&logo=pypi&logoColor=white)](https://pypi.org/project/bound-entangled/)

Reference implementations of families of **bound entangled states** from the
quantum information literature, as plain NumPy density matrices.

A bound entangled state is entangled, yet no pure entanglement can be distilled
from it, however many copies are available. No state with a positive partial
transpose (PPT) is distillable, so every PPT entangled state is bound
entangled — and the bipartite bound entangled states collected here are all
PPT. They are otherwise scattered across papers; this package gathers them into
one tested library, each factory returning the density matrix `rho` of the state.

📖 **[Documentation](https://avlyx.github.io/bound-entangled/)** — one page per
state, with the construction written out, what is known about it, and the
papers it comes from, plus a bibliography with BibTeX.

## Installation

```bash
pip install bound-entangled
```

Requires Python ≥ 3.11. The only runtime dependency is NumPy; every state is
built from the small linear-algebra helpers in `bound_entangled.utils`. To
classify the states — `is_separable` and the like — use a toolbox such as
[`toqito`](https://toqito.readthedocs.io), which the test suite depends on.

## Usage

Packages are organized by the Hilbert space the states live in
(`c3_otimes_c3` = C³ ⊗ C³, `cm_otimes_cn` = C^m ⊗ C^n, etc.).

```python
from bound_entangled.c3_otimes_c3 import chessboard_extremal_PPT, tiles_upb
from bound_entangled.cd_otimes_cd import yu_oh
from bound_entangled.c5_otimes_c5 import sn3_grid_state

rho = chessboard_extremal_PPT()          # 9x9 PPT entangled chessboard state
rho = tiles_upb()                        # 9x9 state from the Tiles UPB
rho = yu_oh(full_dim=3, x=0.5, y=0.1)    # Yu–Oh nonlocal bound entangled state
rho = sn3_grid_state()                   # 25x25, Schmidt number 3
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
| `vertesi_brunner`                       | Vértesi–Brunner rank-4 PPT entangled state that violates a Bell inequality        | [1405.4502](https://arxiv.org/abs/1405.4502)               |
| `steering_state`                        | Steerable bound entangled state (counterexample to the stronger Peres conjecture) | [1405.0262](https://arxiv.org/abs/1405.0262)               |
| `tiles_upb`, `pyramid_upb`              | States from the Tiles / Pyramid unextendible product bases                        | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `parametrized_upb`                      | Six-parameter family of UPBs generalizing Tiles / Pyramid                         | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

`vertesi_brunner` was called `ncomms6297` up to version 0.2.2.

### `c4_otimes_c4` — C⁴ ⊗ C⁴

| Factory | State                              | Reference                                                  |
| ------- | ---------------------------------- | ---------------------------------------------------------- |
| `piani` | 4×4 Benatti–Floreanini–Piani state | [quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) |

### `c5_otimes_c5` — C⁵ ⊗ C⁵

| Factory          | State                                                     | Reference                                      |
| ---------------- | --------------------------------------------------------- | ---------------------------------------------- |
| `sn3_grid_state` | Smallest known Schmidt-number-3 PPT bound entangled state | [2402.12966](https://arxiv.org/abs/2402.12966) |

### `cd_otimes_cd` — C^d ⊗ C^d

| Factory                         | State                                                      | Reference                                                                                    |
| ------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `yu_oh`, `is_valid_yu_oh_input` | Yu–Oh family of nonlocal bound entangled states            | [1509.08991](https://arxiv.org/abs/1509.08991)                                               |
| `gen_tiles1`                    | GenTiles1 UPB generalizing Tiles to d⊗d, even d ≥ 4        | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070)                                   |
| `badziag_private_singlet`       | Badziąg et al. private-singlet state on C^2d ⊗ C^2d (ρ_F1) | [1309.7992](https://arxiv.org/abs/1309.7992), [2002.12409](https://arxiv.org/abs/2002.12409) |
| `orthogonal_singlet`            | ρ_F2, the second family of PPT singlets                    | [2002.12409](https://arxiv.org/abs/2002.12409)                                               |
| `horodecki_2_by_d_generalized`  | The 2×4 Horodecki state generalized to C² ⊗ C^d            | [1203.3711](https://arxiv.org/abs/1203.3711)                                                 |
| `breuer`                        | Breuer states on C^d ⊗ C^d, even d — bound entangled for 0 < λ ≤ 1/(d+2) | [quant-ph/0605036](https://arxiv.org/abs/quant-ph/0605036)                     |

### `cm_otimes_cn` — C^m ⊗ C^n (parametric constructions)

| Factory                                                        | State                                                     | Reference                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `grid_state`                                                   | Quantum grid states from graph edges                      | [1705.09261](https://arxiv.org/abs/1705.09261)             |
| `generalized_grid_state`                                       | Grid states generalized to hyperedges                     | [2402.12966](https://arxiv.org/abs/2402.12966)             |
| `gen_tiles2`                                                   | GenTiles2 UPB generalizing Tiles to m⊗n, n > 3, m ≥ 3, n ≥ m | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |
| `random_NPT`, `random_PPT`, `random_PPT_close_to_the_PPT_edge` | Random density matrices by PPT class (rejection sampling) | —                                                          |

`grid_state` and `generalized_grid_state` are general constructors: not every
graph gives a bound entangled state, and the documentation says which ones do.

### `multipartite` — multipartite systems

| Factory              | State                                                                                             | Reference                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `smolin`             | Smolin four-party unlockable state — separable across 2\|2 cuts, NPT across 1\|3                  | [quant-ph/0001001](https://arxiv.org/abs/quant-ph/0001001) |
| `generalized_smolin` | Generalized Smolin state on an even number of qubits — separable across even cuts, NPT across odd | [quant-ph/0411142](https://arxiv.org/abs/quant-ph/0411142) |
| `quasi_ds`           | Quasi-DS (diagonal symmetric) state on an odd number n ≥ 5 of qubits — PPT across every bipartition | [1706.09423](https://arxiv.org/abs/1706.09423)           |

For the two Smolin states the bound entanglement lives in the cuts where they
are separable: with the parties grouped that way nothing is distillable, while
the state as a whole is multipartite entangled. The doctests on `smolin` assert
both kinds of cut; those on `generalized_smolin` assert the separable 2|4 cut of
the six-qubit state.

### `utils`

| Function                              | Description                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------------------------- |
| `ketbra(a, b?)`                       | The outer product \|a><b\|, defaulting to \|a><a\|.                                      |
| `upb(basis)`                          | The bound entangled state on the orthogonal complement of an unextendible product basis. |
| `tensor(*arrays)`                     | The Kronecker product of the factors, left to right.                                    |
| `max_entangled(d)`                    | The maximally entangled state of C^d ⊗ C^d, as a column vector.                          |
| `pauli(i)`, `pauli([i, j, ...])`      | A Pauli matrix (0 = I, 1 = X, 2 = Y, 3 = Z), or a tensor product of them.               |
| `fourier(d)`                          | The d × d discrete Fourier matrix.                                                       |
| `permute_systems(mat, perm, dim)`     | Reorder the subsystems of an operator on a multipartite space.                           |
| `partial_transpose(mat, dim)`, `is_ppt(mat, dim)` | The partial transpose over the second system, and the PPT test.              |
| `random_density_matrix(d, seed?)`     | A random density matrix from the Hilbert–Schmidt measure.                                |

## Repository layout

| Path                      | Contents                                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`src/`](src)             | The Python package, published to PyPI when a GitHub release is published.                                     |
| [`tests/`](tests)         | Checks of everything that used to come from toqito — the helpers in `utils` and the reimplemented states — entrywise against toqito. |
| [`docs/`](docs)           | The [Zensical](https://zensical.org) site behind the documentation link, deployed to GitHub Pages on every push to `main`. |
| [`includes/`](includes)   | One file per cited paper, with its BibTeX, pulled into the documentation's bibliography.                      |
| [`TODO.md`](TODO.md)      | Open questions about specific states, and what has been resolved.                                             |

## Development

```bash
pip install -e ".[test]"
pytest
```

The `test` extra installs `toqito`, which only the tests use. Most of the suite
lives in the docstrings: every state factory carries an `Examples` block
asserting that what it returns is a valid density matrix, that it is PPT, and
how `toqito`'s `is_separable` classifies it — run as doctests by `pytest`, so
the documented behaviour and the tested behaviour cannot drift apart. A few of
them fall through to toqito's semidefinite-programming check and take around
ten seconds each. `tests/` pins the package's own linear algebra, and the states
it used to take from toqito, entrywise against toqito.

The documentation pages are generated from the docstrings: each page is the
module docstring of one file under `src/` (the construction, its math and its
references) followed by the factory's own docstring. The files in `docs/` only
say which module goes on which page, so to change a page, edit the docstring.
To preview the site:

```bash
pip install -e ".[docs]"
zensical serve
```

## License

MIT — see [LICENSE](LICENSE).
