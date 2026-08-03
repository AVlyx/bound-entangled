# TODO — TypeScript port

Tracks what the TS package still owes the Python one. The Python code gets a lot
from [`toqito`](https://toqito.readthedocs.io), which has no JS equivalent, so
each item below names the helper that has to be written first.

Everything else is ported and checked entrywise against the Python
implementation — see the state tables in [README.md](README.md).

## Blocked on a toqito helper

| State | Needs |
|---|---|
| `randomNPT`, `randomPPT`, `randomPPTCloseToThePPTEdge` | `randomDensityMatrix`. toqito builds it from the Ginibre ensemble: draw a `dim × k` matrix of i.i.d. standard Gaussians (complex unless `isReal`), then `rho = G G† / tr(G G†)`; `k = dim` gives the Hilbert–Schmidt measure. Needs Box–Muller over an injectable `rng: () => number`, since Node has no `np.random.seed`. Its `bures` variant additionally needs `randomUnitary` (Ginibre → QR → `Q · diag(sign(diag(R)))`). |

Note on seeding: the Python suite's `np.random.seed(1234)` fixture in
`test_random_not_bound_entangled.py` does not actually reach toqito, which uses
`np.random.default_rng(seed=None)` — a separate generator seeded from OS
entropy. Whatever seeding decision is made on the Python side should be mirrored
here.

## Whole states that toqito supplies

The Python package wraps toqito for these, so the TS port needs real
implementations rather than a wrapper:

- `chessboard`, `chessboardExtremalPPT` (C³ ⊗ C³) — [quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056)
- `breuer` (C⁴ ⊗ C⁴) — [quant-ph/0605036](https://arxiv.org/abs/quant-ph/0605036)

Both Horodecki states and `tile` / `tilesUpb` have now been written from the
toqito sources and match bit-for-bit.

## Other

- `symmetricBE` — not implemented on the Python side either
  ([symmetric_BE.py](../python/src/bound_entangled/cd_otimes_cd/symmetric_BE.py) is
  just a reference to [2012.06631](https://arxiv.org/pdf/2012.06631)).
- `psiIj(d, i, i)` returns `-|ii>` rather than the zero vector, because the two
  writes land on the same index. This is faithful to the Python `psi_ij`, and
  `yuOh` only ever calls it with `i > j`, so nothing depends on it — but both
  implementations would need the same fix if it is ever called directly.
- `isPSD` decides positivity through mathjs' `eigs`, whose Jacobi solver is much
  slower than LAPACK. Test dimensions are capped accordingly (e.g.
  `orthogonalSinglet` is eigen-checked at shield dimension 2 and 3, shape-only at
  4). An LDL^H-based positivity test would avoid the eigendecomposition entirely
  if larger states are ever needed.
- No npm publish job in [.github/workflows/publish.yml](../.github/workflows/publish.yml)
  yet; it needs an `NPM_TOKEN` secret or npm trusted publishing configured.
- The root [README.md](../README.md) still describes only the Python package.
