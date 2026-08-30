"""https://arxiv.org/abs/1706.09423

J. Tura, A. Aloy, R. Quesada, M. Lewenstein, A. Sanpera,
"Separability of diagonal symmetric states: a quadratic conic optimization
problem", Quantum 2, 45 (2018).
Theorem 5.1 introduces a uni-parametric class of N-qubit PPT-entangled
symmetric states for an odd number of qubits N = 2K + 1, K > 1: a PPT diagonal
symmetric (DS) state carrying slight GHZ coherences, hence "quasi-DS".
"""

import numpy as np
from math import comb, sqrt
from typing import Literal


def dicke_iso(n):
    """V = sum_{i_1, i_2 \\dots i_n}
    \\frac{1}{
        \\sqrt{
            \\binom{n}{\\nu(i_1, i_2 \\dots i_n)}
        }
    }
    \\ket{i_1, i_2 \\dots i_n} \\bra{\\nu(i_1, i_2 \\dots i_n)}"""

    v = np.zeros((2**n, n + 1))

    combs = np.zeros(n + 1)

    def rec(i_i: int, dicke_index: int, r_index: int):
        if i_i == n:
            if not combs[dicke_index]:
                combs[dicke_index] = 1 / sqrt(comb(n, dicke_index))
            v[r_index, dicke_index] = combs[dicke_index]
            return
        rec(i_i + 1, dicke_index, r_index)
        rec(i_i + 1, dicke_index + 1, r_index + 2**i_i)  # backwards

    rec(0, 0, 0)
    return v


def fkz(n: int, z: float):
    """f_k(Z) for k in Z, via f_{k+2}(Z) = (2+Z)f_{k+1}(Z) - f_k(Z), f_0=1, f_1=1+Z.

    ret[k]  = f_k(z)  for k in [0, K-1]   (forward half, k >= 0)
    ret[-k] = f_{-k}(z) for k in [1, K]   (backward half, accessed via negative indexing)
    """
    K = n // 2
    ret = np.zeros(n)

    ret[0] = 1
    ret[1] = 1 + z

    for k in range(2, K):
        ret[k] = (2 + z) * ret[k - 1] - ret[k - 2]

    for k in range(1, K + 2):
        ret[-k] = (2 + z) * ret[-k + 1] - ret[-k + 2]

    return ret


def dz(n: int, z: int):
    assert n % 2 == 1
    fkz_arr = fkz(n, z)
    K = n // 2

    ret = np.zeros((n + 1, n + 1), dtype=np.float64)
    for k in range(n + 1):
        ret[k, k] = comb(n, k) * fkz_arr[K - k]
    return ret


def o_sigma(n: int, sigma: Literal[-1] | Literal[1]):
    ret = np.zeros((n + 1, n + 1), dtype=np.float64)
    ret[0, n], ret[n, 0] = sigma, sigma
    return ret


def quasi_ds_dicke_basis(n, z, sigma: Literal[-1] | Literal[1]):
    assert n % 2 == 1 and n >= 5, "n must be an odd integer >= 5 (n = 2K + 1, K > 1)"
    assert z > 0, "z must lie in the open interval (0, inf)"
    K = n // 2

    rho = dz(n, z) + o_sigma(n, sigma)
    rho /= 2 * (4 + z) ** K
    return rho


def quasi_ds(n: int, z: float, sigma: Literal[-1, 1]) -> np.ndarray:
    """Construct the quasi-DS bound-entangled state on n qubits (arXiv:1706.09423, Thm. 5.1).

    Builds the state in the computational basis by conjugating the Dicke-basis
    density matrix with the isometry ``V`` that maps Dicke states to the
    computational basis.  The state is PPT across every bipartition and, for
    ``n = 2K + 1`` with ``K > 1``, extreme in the PPT set and therefore
    entangled.

    Args:
        n: number of qubits.  Must be an odd integer ``>= 5``: Theorem 5.1 is
            stated for ``n = 2K + 1`` with ``K > 1``, and at ``n = 3`` (K = 1)
            the construction still yields a valid PPT state but no longer an
            entangled one.
        z: real parameter controlling the state's mixing.  Must lie in the open
            interval (0, inf).
        sigma: sign parameter, either +1 or -1.

    Returns:
        np.ndarray: (2^n) × (2^n) density matrix of the quasi-DS state.

    Raises:
        AssertionError: If ``n`` is not an odd integer ``>= 5``, or ``z <= 0``.

    Examples:
        The defining property is that the state is PPT across *every*
        bipartition — both cuts are shown here for the smallest valid size,
        n = 5.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt
        >>> state = quasi_ds(5, 1.0, 1)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 16])
        True
        >>> is_ppt(state, dim=[4, 8])
        True

        There is deliberately no separability assertion here.  What Theorem 5.1
        proves is that the state is extreme in the PPT set and therefore *not
        fully separable*; it makes no claim that any individual bipartite cut
        is entangled, and indeed every cut is separable (PPT with rank
        ``<= max(dA, dB)``).  A bipartite `is_separable` call would return
        ``True`` and say nothing about the property that makes this state
        interesting.
    """
    assert n % 2 == 1 and n >= 5, "n must be an odd integer >= 5 (n = 2K + 1, K > 1)"
    assert z > 0, "z must lie in the open interval (0, inf)"
    v = dicke_iso(n)
    return v @ quasi_ds_dicke_basis(n, z, sigma) @ v.T
