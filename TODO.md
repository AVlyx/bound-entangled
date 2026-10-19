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

## Resolved

### `breuer` — C^d ⊗ C^d ([quant-ph/0605036](https://arxiv.org/abs/quant-ph/0605036)) — reinstated

It had been removed because toqito's docstring (and ours) called the state
bound entangled "for even local dimension d ≥ 4 and every λ > 0", while the
partial transpose stays positive only for 0 < λ ≤ 1/(d+2).

Neither an implementation bug nor a different parametrization: the construction
is Eq. (7) of the paper, ρ(λ) = λP₀ + (1−λ)·2P_S/(d(d+1)), and the paper itself
proves both halves — entangled for every λ > 0 (its witness gives
tr{Wρ(λ)} = −λ(d−2)) and PPT exactly for λ ≤ 1/(d+2). Only toqito's docstring
overstates it. `cd_otimes_cd/breuer.py` reimplements the state, matches toqito's
entrywise (`tests/test_toqito_parity.py`), and says the correct range; doctests
pin the PPT threshold at d = 4 and the witness value.

## Possible errors

### `gen_tiles2` — C^m ⊗ C^n ([quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070), Thm. 6)

For **m = 3 and n ≥ 5 the resulting state is provably separable**, so the basis
cannot be unextendible there. The complement of the basis has dimension
`m*n - (m*n - 2m + 1) = 2m - 1`, which is 5 for m = 3 regardless of n; from
n = 5 the state is PPT with rank ≤ max(m, n), and PPT + rank ≤ max(dA, dB)
implies separable (Horodecki et al. 2000, a rigorous criterion). Only `(3, 4)`
works for m = 3.

The current guard enforces `n > 3, m >= 3, n >= m`, which is exactly what
Theorem 6 (Section V B) states — no constraint was dropped. The paper presents
GenTiles2 as a conjecture and points to its Ref. [20] for the proof, so the
conflict is with the stated theorem itself; check Ref. [20] before narrowing the
guard. Pinned as a passing doctest on `gen_tiles2` so it is recorded rather than
hidden.

### `piani` — C⁴ ⊗ C⁴ ([quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095)) — resolved

Commit `984c5d8` removed the `permute_systems(rho, [0, 2, 1, 3])` regrouping.

The evidence favours the removal, and both halves of it are certificates rather
than heuristics: with the permutation `is_separable` returns `True` having
*constructed an explicit product-state decomposition*, so that matrix is
provably separable and cannot be the bound entangled Piani state; without it,
CCNR certifies PPT entanglement. The permutation was destroying the
entanglement.

The unpermuted mixture is Eq. (29) of the paper and Eq. (S.124) of
[2010.08372](https://arxiv.org/abs/2010.08372), Appendix C5, both of which
call it bound entangled under the AA'|BB' split without any regrouping.

### `chessboard_extremal_PPT` — C³ ⊗ C³ ([quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056)) — resolved

The factory passes `s = a*c/n = -1.2`, while toqito's default is
`s = conj(c)/conj(n) = -2.0`, which gives an NPT state. `s = ac/n` and
`t = ad/m` are what Bruß and Peres choose, and what
[2010.08372](https://arxiv.org/abs/2010.08372) uses in Appendix C2 (p. 25) for
the extremal state of Fig. 2 / Fig. 9, so the override is the paper's
construction and toqito's default drops the factor `a`.

Since dropping the toqito dependency, `chessboard()` builds the state itself and
defaults to `s = a*c/n`, `t = a*d/m`, so `chessboard_extremal_PPT` no longer
needs to override anything.

Separately, `chessboard` is a general family, not a bound-entangled-state
factory: toqito warns some `(s, t)` choices give non-PPT states. Worth saying so.

## Unfinished

### `symmetric_BE` — C^d ⊗ C^d ([2012.06631](https://arxiv.org/abs/2012.06631))

The stub `symmetric_BE.py`, which held only a link to C. Marconi, A. Aloy,
J. Tura, A. Sanpera, "Entangled symmetric states and copositive matrices",
Quantum 5, 561 (2021), is no longer in the tree. Implement it from that paper or
drop this entry.

### `magic_simplex` — C^d ⊗ C^d ([2406.13491](https://arxiv.org/abs/2406.13491), Defs. 2.9-2.10)

`src/bound_entangled/cd_otimes_cd/magic_simplex.py` is not exported and does not
run yet: the accumulator is allocated as `(d, d)` but each Bell projector is
`(d², d²)`, so every call raises a broadcasting `ValueError`. It has no doctest
and is left out of the docs until it works.

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

Both factories now apply

```python
permute_systems(rho, [0, 2, 1, 3], dim=[2, 2, d, d])
```

internally before returning, so the trap is gone: the returned matrix is
already in AA'BB' order and the Alice|Bob cut can be tested directly on it.
Docstrings and the docs site were updated to match.

### `horodecki_2_by_d_generalized` — C² ⊗ C^d ([1203.3711](https://arxiv.org/abs/1203.3711))

At `second_dim_d=3` the total dimension is 6, so PPT implies separable and the
state is **not** bound entangled. Fine, but there is no guard or note; d ≥ 4 is
the meaningful range. The d = 4 equivalence with toqito's C² ⊗ C⁴ Horodecki
state (up to an anti-diagonal transpose) is verified and now a doctest.

### `steering_state` — C³ ⊗ C³ ([1405.0262](https://arxiv.org/abs/1405.0262))

The weights of Eqs. (18)-(19) are non-negative only for `m1, m2 >= 0` with
`m1² + m2² + m1·m2 <= 1`; the docstring used to say `m1² + m2² <= 1`, which lets
through e.g. `(0.6, 0.6)`, whose result has a negative eigenvalue. The
docstring is fixed, but there is still no guard.

### `random_PPT` — C^m ⊗ C^n

In 2 ⊗ 2 every PPT draw is separable, so the name promises more than it
delivers at small dimensions. The module is called
`random_not_bound_entangled`, which is consistent — just make sure callers do
not read `random_PPT` as "random bound entangled".
