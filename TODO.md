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

### `piani` — C⁴ ⊗ C⁴ ([quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095)) — resolved

Commit `984c5d8` removed the `permute_systems(rho, [0, 2, 1, 3])` regrouping
from both the Python and TypeScript sources.

The evidence favours the removal, and both halves of it are certificates rather
than heuristics: with the permutation `is_separable` returns `True` having
*constructed an explicit product-state decomposition*, so that matrix is
provably separable and cannot be the bound entangled Piani state; without it,
CCNR certifies PPT entanglement. The permutation was destroying the
entanglement.

`js/tests/c4OtimesC4/piani.test.ts`, which still pinned the old permuted
values, was removed along with the rest of the old TS test layout in
`3db7d2d` and superseded by the entrywise parity suite (`dcc4307`,
[js/tests/parity/cases.ts](../js/tests/parity/cases.ts)), which covers `piani()`
and `projectorIj` against the current (unpermuted) Python reference and passes.
The docs site and the JS docstring described the old permuted construction
until this pass; both have been corrected to match.

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

### `quasi_ds` — multipartite ([1706.09423](https://arxiv.org/abs/1706.09423))

Separable across every cut checked — `n=5` at both 1|4 and 2|3 — each certified
rigorously by PPT + rank ≤ max(dA, dB). This is expected rather than suspicious:
Theorem 5.1 proves the state is extreme in the PPT set and therefore *not fully
separable*, which is a claim about the n-party split, not about any bipartite
cut. So unlike `smolin` and `generalized_smolin`, no bipartite cut distinguishes
it, and nothing currently tests the property that actually makes it interesting.

Worth working out which multipartite entanglement criterion detects it — the
paper's own route is extremality in the PPT set, via the ranks
`(n+1, 2n, ..., 2n, 2n-1)` that Theorem 5.1 predicts and that the construction
does reproduce.

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

### `orthogonal_singlet`, `badziag_private_singlet` — resolved

Both used to return the matrix in ABA'B' ordering, which had to be permuted to
AA'BB' before an Alice|Bob cut of dimension 2d × 2d meant anything — until this
was documented, any caller checking PPT directly on the returned matrix got a
meaningless answer.

Both factories (Python and TypeScript) now apply

```python
permute_systems(rho, [0, 2, 1, 3], dim=[2, 2, d, d])
```

internally before returning, so the trap is gone: the returned matrix is
already in AA'BB' order and the Alice|Bob cut can be tested directly on it.
Docstrings and the docs site were updated to match; the parity suite needed no
changes since it already calls both factories directly and compares entrywise.

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
Python ones". At the time this was written there was no such check for
`piani` — the old TS test asserted its own hard-coded diagonal instead, so
neither side would have caught the two implementations disagreeing.

Resolved by `dcc4307`: `js/tests/parity/cases.ts` now runs `piani()` and
`projectorIj` through the same entrywise comparison as every other state, so
the README's claim now holds for `piani` too.
