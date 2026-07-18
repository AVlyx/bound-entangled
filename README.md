# bound-entangled

[![Documentation](https://img.shields.io/badge/Documentation-blue?style=for-the-badge)](https://avlyx.github.io/bound-entangled/)

Reference implementations of several families of **bound entangled states** from
the quantum information literature, as plain NumPy density matrices.

A bound entangled state is entangled yet has a positive partial transpose (PPT),
so no pure entanglement can be distilled from it. This library collects
constructions that are otherwise scattered across papers into a single, tested
package, each factory returning the density matrix `rho` of the state.

## Installation

```bash
pip install -e .
# with the test dependencies:
pip install -e ".[test]"
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

rho = chessboard_extremal_PPT()   # 9x9 PPT-entangled chessboard state
rho = yu_oh(d=3, x=0.5, y=0.5)    # Yu-Oh nonlocal bound entangled state
```

## States

### `c3_otimes_c3` — C³ ⊗ C³

| Factory | State | Reference |
|---|---|---|
| `chessboard`, `chessboard_extremal_PPT` | Bruß–Peres chessboard states | [quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056) |
| `cross_hatch` | 3×3 "cross-hatch" grid state (CCNR-detected) | [1705.09261](https://arxiv.org/abs/1705.09261) |
| `steering_state` | Steerable bound entangled state (counterexample to the stronger Peres conjecture) | [1405.0262](https://arxiv.org/abs/1405.0262) |
| `tiles_upb`, `pyramid_upb` | States from the Tiles / Pyramid unextendible product bases | [quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) |
| `parametrized_upb` | Six-parameter family of UPBs generalizing Tiles / Pyramid | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |
| `horodecki` | 3x3 Horodecki bound entangled state | [quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) |


### `c4_otimes_c4` — C⁴ ⊗ C⁴

| Factory | State | Reference |
|---|---|---|
| `pianni` | 4×4 Benatti–Floreanini–Piani state | [quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) |

### `c5_otimes_c5` — C⁵ ⊗ C⁵

| Factory | State | Reference |
|---|---|---|
| `sn3_grid_state` | Smallest known Schmidt-number-3 PPT bound entangled state | [2402.12966](https://arxiv.org/abs/2402.12966) |

### `cd_otimes_cd` — C^d ⊗ C^d

| Factory | State | Reference |
|---|---|---|
| `yu_oh`, `is_valid_yu_oh_input` | Yu–Oh family of nonlocal bound entangled states | [1509.08991](https://arxiv.org/abs/1509.08991) |
| `gen_tiles1` | GenTiles1 UPB generalizing Tiles to d⊗d, even d≥4 | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |

### `cm_otimes_cn` — C^m ⊗ C^n (parametric constructions)

| Factory | State | Reference |
|---|---|---|
| `grid_state` | Quantum grid states from graph edges | [1705.09261](https://arxiv.org/abs/1705.09261) |
| `generalized_grid_state` | Grid states generalized to hyperedges | [2402.12966](https://arxiv.org/abs/2402.12966) |
| `random_NPT`, `random_PPT`, `random_PPT_close_to_the_PPT_edge` | Random density matrices by PPT class (rejection sampling) | — |
| `gen_tiles2` | GenTiles2 UPB generalizing Tiles to m⊗n, n>3, m≥3, n≥m | [quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) |


## Documentation

Full API docs (built with [MkDocs](https://www.mkdocs.org/) +
[mkdocstrings](https://mkdocstrings.github.io/)) are published to GitHub Pages
on every push to `main`. 

## License

MIT
