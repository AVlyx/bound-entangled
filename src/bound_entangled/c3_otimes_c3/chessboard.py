r"""The Bruß–Peres chessboard states on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

A six-parameter family of two-qutrit states introduced by Bruß and Peres. They
are named for their matrix: with the ninth row and column empty, the remaining
$8 \times 8$ block has the zero pattern of a chessboard.

# Definition

With real parameters $a, b, c, d, m, n$, the state is the normalized sum of four
rank-one projectors,

$$
\rho = N \sum_{i=1}^{4} |V_i\rangle\langle V_i|, \qquad N = \Big(\sum_i \langle V_i|V_i\rangle\Big)^{-1},
$$

where, writing each vector of $\mathbb{C}^3 \otimes \mathbb{C}^3$ as its three
blocks of three coefficients,

$$
\begin{aligned}
|V_1\rangle &= (m, 0, s;\ 0, n, 0;\ 0, 0, 0), \\
|V_2\rangle &= (0, a, 0;\ b, 0, c;\ 0, 0, 0), \\
|V_3\rangle &= (n, 0, 0;\ 0, -m, 0;\ t, 0, 0), \\
|V_4\rangle &= (0, b, 0;\ -a, 0, 0;\ 0, d, 0).
\end{aligned}
$$

Bruß and Peres choose $s = ac/n$ and $t = ad/m$, which makes the state invariant
under partial transposition, so PPT; the range criterion then shows it is
entangled. These are the defaults of `chessboard`. (toqito's `chessboard`
defaults to $s = c/n$ instead, which agrees only when $a = 1$.)

`chessboard_extremal_PPT` is the member with $m = n = b = -3/5$, $a = 3/5$ and
$c = -d = 6/5$ (and $s = ac/n$, $t = ad/m$). Imai et al. show it as the
extremal PPT entangled state of their Figs. 2 and 9 (Appendix C2).

# References

- Dagmar Bruß and Asher Peres, "Construction of quantum states with bound
  entanglement", *Phys. Rev. A* **61**, 030301 (R) (2000).
  [arXiv:quant-ph/9911056](https://arxiv.org/abs/quant-ph/9911056) ·
  [doi:10.1103/PhysRevA.61.030301](https://doi.org/10.1103/PhysRevA.61.030301)
- Satoya Imai, Nikolai Wyderka, Andreas Ketterer and Otfried Gühne, "Bound
  entanglement from randomized measurements", *Phys. Rev. Lett.* **126**,
  150501 (2021). [arXiv:2010.08372](https://arxiv.org/abs/2010.08372) ·
  [doi:10.1103/PhysRevLett.126.150501](https://doi.org/10.1103/PhysRevLett.126.150501)
"""

from typing import Optional
import numpy as np


def chessboard(
    a: complex, b: complex, c: complex, d: complex, m: complex, n: complex, s: Optional[complex] = None, t: Optional[complex] = None
) -> np.ndarray:
    """A chessboard state.

    Args:
        a: free real parameter.
        b: free real parameter.
        c: free real parameter.
        d: free real parameter.
        m: free real parameter.
        n: free real parameter.
        s: defaults to a*c/n, the Bruß-Peres choice that makes the state PPT.
        t: defaults to a*d/m, likewise.

    Returns:
        np.ndarray: a chessboard quantum state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = chessboard(1, 2, 3, 4, 5, 6)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    if s is None:
        s = a * c / n
    if t is None:
        t = a * d / m
    vectors = [
        np.array([m, 0, s, 0, n, 0, 0, 0, 0]),
        np.array([0, a, 0, b, 0, c, 0, 0, 0]),
        np.array([np.conj(n), 0, 0, 0, -np.conj(m), 0, t, 0, 0]),
        np.array([0, np.conj(b), 0, -np.conj(a), 0, 0, 0, d, 0]),
    ]
    rho = sum(np.outer(v, v.conj()) for v in vectors)
    return rho / np.trace(rho)


def chessboard_extremal_PPT() -> np.ndarray:
    """Extremal PPT chessboard state.

    The state from the chessboard family with m = n = b = -3/5, a = 3/5,
    c = -d = 6/5, the extremal PPT entangled state of Fig. 2 / Fig. 9 in
    S. Imai, N. Wyderka, A. Ketterer, O. Gühne, "Bound entanglement from
    randomized measurements", Phys. Rev. Lett. 126, 150501 (2021),
    https://arxiv.org/abs/2010.08372 (Appendix C2, page 25).

    s and t take their defaults s = a*c/n and t = a*d/m, the choice of both
    Bruß-Peres and Appendix C2. (toqito's chessboard defaults to s = c/n,
    which drops the factor a and with a = 3/5 gives an NPT state.)

    Returns:
        np.ndarray: the extremal PPT chessboard state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = chessboard_extremal_PPT()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    return chessboard(
        # m = n = b = -3/5
        m=-3 / 5,
        n=-3 / 5,
        b=-3 / 5,
        # a = 3/5
        a=3 / 5,
        # c = -d = 6/5
        c=6 / 5,
        d=-6 / 5,
    )
