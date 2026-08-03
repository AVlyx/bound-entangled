"""https://www.nature.com/articles/ncomms6297"""

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
    assert n % 2 == 1
    K = n // 2

    rho = dz(n, z) + o_sigma(n, sigma)
    rho /= 2 * (4 + z) ** K
    return rho


def quasi_ds(n: int, z: float, sigma: Literal[-1, 1]) -> np.ndarray:
    """Construct the quasi-Dicke bound-entangled state on n qubits (Nature Commun. 5, 6297).

    Builds the state in the computational basis by conjugating the Dicke-basis
    density matrix with the isometry ``V`` that maps Dicke states to the
    computational basis.  The state is PPT across every bipartition and bound
    entangled for all valid parameters.

    Args:
        n: number of qubits.  Must be a positive odd integer.
        z: real parameter controlling the state's mixing.
        sigma: sign parameter, either +1 or -1.

    Returns:
        np.ndarray: (2^n) × (2^n) density matrix of the quasi-Dicke state.

    Raises:
        AssertionError: If ``n`` is even.
    """
    v = dicke_iso(n)
    return v @ quasi_ds_dicke_basis(n, z, sigma) @ v.T
