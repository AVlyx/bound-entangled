# States to revisit

Open questions turned up while replacing the pytest suite with doctests. Each
entry says what was observed and what needs deciding; none of them is a
confirmed bug in the physics unless marked so.

Unless noted, "separable" / "entangled" below means toqito's `is_separable`,
whose two return values are *not* symmetric — always read the verdict together
with the witness string it returns alongside it.

A `True` is a certificate: every path returning it cites a sufficient condition
for separability (`rank <= max(dA, dB)` with PPT, PPT with dA*dB <= 6, the
Gurvits-Barnum ball, Cariello, Johnston, Hildebrand, an explicit product-state
decomposition, the inner DPS cone). Those are theorems.

A `False` is **not** automatically a certificate. It is also the catch-all
fallback: when every implemented criterion comes up empty the function returns
`False, "inconclusive: PPT but no implemented sufficient condition proved
separability"` (`is_separable.py:641`), and its own docstring describes this as
"`False` as inconclusive rather than as an entanglement verdict". So `False`
means *either* proved entangled *or* nothing was proved.

A `False` is a real entanglement proof only when the witness names one — NPT,
realignment/CCNR, the reduction criterion, a positive-map witness (Choi, Ha-Kye,
Breuer-Hall), or a failed k-symmetric extension. Every `False` asserted by a
doctest in this library was checked to cite one of those; none is inconclusive.

## Removed, needs re-deriving before it comes back

### `breuer` — C⁴ ⊗ C⁴ ([quant-ph/0605036](https://arxiv.org/abs/quant-ph/0605036))

Removed from the library. Both our docstring and toqito's claim the state is
bound entangled "for even local dimension d ≥ 4 and every λ > 0". That is false
for the construction as toqito implements it: the partial transpose stays
positive exactly for

    0 < λ ≤ 1/(d+2)

(1/6 at d = 4, 1/8 at d = 6, confirmed by bisection on the hand-computed
partial-transpose spectrum, matching to 10 decimal places). Above the threshold
the state is NPT, and at λ = 1 it is pure and maximally entangled — so "every
λ > 0" cannot be right under any reading.

Decide whether this is a toqito implementation bug or a difference from Breuer's
own parametrization in the paper, then reinstate with the correct λ range.

## Possible errors

### `gen_tiles2` — C^m ⊗ C^n ([quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070), Thm. 6)

For **m = 3 and n ≥ 5 the resulting state is provably separable**, so the basis
cannot be unextendible there. The complement of the basis has dimension
`m*n - (m*n - 2m + 1) = 2m - 1`, which is 5 for m = 3 regardless of n; from
n = 5 the state is PPT with rank ≤ max(m, n), and PPT + rank ≤ max(dA, dB)
implies separable (Horodecki et al. 2000, a rigorous criterion). Only `(3, 4)`
works for m = 3.

The current guard only enforces `n > 3, m >= 3, n >= m`. Check Theorem 6's
actual hypotheses — the paper may state a constraint we dropped. Pinned as a
passing doctest on `gen_tiles2` so it is recorded rather than hidden.

### `piani` — C⁴ ⊗ C⁴ ([quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095))

Commit `984c5d8` removed the `permute_systems(rho, [0, 2, 1, 3])` regrouping
from both the Python and TypeScript sources, but not from the TS tests.
**`js/tests/c4OtimesC4/piani.test.ts` is currently red** — two tests still pin
the permuted values (`applies the [0, 2, 1, 3] qubit permutation` and `has the
expected diagonal`).

The evidence favours the removal, and both halves of it are certificates rather
than heuristics: with the permutation `is_separable` returns `True` having
*constructed an explicit product-state decomposition*, so that matrix is
provably separable and cannot be the bound entangled Piani state; without it,
CCNR certifies PPT entanglement. The permutation was destroying the
entanglement.

Note the old test's own comment though — "the unpermuted mixture is itself PPT,
so `expectBoundEntangled` cannot catch a missing `permuteSystems`". PPT alone
never distinguished the two conventions, which is why this went unnoticed; the
diagonal values are the more robust check. Update or delete those two TS tests.

### `chessboard_extremal_PPT` — C³ ⊗ C³ ([quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056))

The factory passes `s = a*c/n = -1.2`, but the documented default (and toqito's)
is `s = conj(c)/conj(n) = -2.0`. The override is **load-bearing, not cosmetic**:
with the documented default the state is NPT. The passed value does give a PPT
entangled state, so nothing is broken — but confirm `a*c/n` against
[2010.08372](https://arxiv.org/abs/2010.08372) (Fig. 2 / Fig. 9, p. 25) and say
in the docstring why it deviates.

Separately, `chessboard` is a general family, not a bound-entangled-state
factory: toqito warns some `(s, t)` choices give non-PPT states. Worth saying so.

## Unfinished

### `symmetric_BE` — C^d ⊗ C^d ([2012.06631](https://arxiv.org/pdf/2012.06631))

`python/src/bound_entangled/cd_otimes_cd/symmetric_BE.py` contains only a paper
link and no code. Either implement it or delete the file.

## Not bugs, but the tests cannot see what matters

### `smolin`, `generalized_smolin`, `quasi_ds` — multipartite

All three are **separable across the bipartite cut**, correctly and rigorously
(PPT + rank ≤ max(dA, dB)). Their bound entanglement is genuinely multipartite,
so `is_separable` on a cut cannot see the property that makes them interesting;
their doctests assert `True` and say why.

Nothing currently tests their actual defining property. Worth adding a
multipartite entanglement check — e.g. that `generalized_smolin(6)` is PPT
across every bipartition but not fully separable, or that the Smolin state is
separable across each 2|2 cut yet four-party entangled.

### `grid_state`, `generalized_grid_state` — generic constructors

Both accept graphs that do not give bound entangled states, and there is no
guard or documentation of which do:

- `grid_state` on a 2×3 path is separable (total dimension 6, where PPT implies
  separable).
- `generalized_grid_state` on most small hyperedge sets is **NPT**, including
  the example the old test used. The only documented bound entangled instance is
  `sn3_grid_state`.

Consider documenting the families that work, or renaming to signal these are
constructors rather than bound-entangled-state factories.

### `orthogonal_singlet`, `badziag_private_singlet` — easy to misuse

Both return the matrix in **ABA'B' ordering**, which must be permuted to AA'BB'
before an Alice|Bob cut of dimension 2d × 2d means anything:

```python
permute_systems(rho, [0, 2, 1, 3], dim=[2, 2, d, d])
```

Until now this lived only in a test helper, so any caller checking PPT directly
on the returned matrix got a meaningless answer. Now documented in both
docstrings — but consider just returning AA'BB' ordering so the trap disappears.

### `horodecki_2_by_d_generalized` — C² ⊗ C^d ([1203.3711](https://arxiv.org/abs/1203.3711))

At `second_dim_d=3` the total dimension is 6, so PPT implies separable and the
state is **not** bound entangled. Fine, but there is no guard or note; d ≥ 4 is
the meaningful range. The d = 4 equivalence with toqito's C² ⊗ C⁴ Horodecki
state (up to an anti-diagonal transpose) is verified and now a doctest.

### `random_PPT` — C^m ⊗ C^n

In 2 ⊗ 2 every PPT draw is separable, so the name promises more than it
delivers at small dimensions. The module is called
`random_not_bound_entangled`, which is consistent — just make sure callers do
not read `random_PPT` as "random bound entangled".

## Cross-package

The root README says the TypeScript values are "checked entrywise against the
Python ones", but Python's `piani` carried the permutation while TypeScript's
did not, and nothing failed. That parity check appears not to cover `piani` —
the TS test asserts its own hard-coded diagonal instead. Confirm the cross-check
covers what it claims to.
