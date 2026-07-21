"""https://arxiv.org/abs/quant-ph/9908070

D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
"Unextendible Product Bases, Uncompletable Product Bases and Bound
Entanglement", Commun. Math. Phys. 238, 379 (2003), Section V B, Theorem 6. A
"tile" construction generalizing the Tiles UPB (`c3_otimes_c3.tiles_upb`) to
arbitrary m (x) n dimension.
"""

import numpy as np
from bound_entangled.utils import upb
from toqito.states import basis


def gen_tiles2_basis(m_n: tuple[int, int]) -> list[np.ndarray]:
    """The product vectors of the GenTiles2 UPB on C^m (x) C^n.

    Built from m "short" tile states (Eq. 5.9), m * (n - 3) "long" tile
    states (Eq. 5.10), and a "stopper" state (Eq. 5.11), for a total of
    m*n - 2m + 1 states.

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system. Requires
            n > 3, m >= 3, and n >= m. Note m = n = 3 does not yield a UPB
            (excluded by n > 3).

    Returns:
        list[np.ndarray]: the normalized product vectors forming the
        GenTiles2 unextendible product basis, as column vectors.
    """
    m, n = m_n
    if not (n > 3 and m >= 3 and n >= m):
        raise ValueError("requires n > 3, m >= 3, and n >= m")

    basis_upb = []

    for j in range(m):
        # |S_j> = 1/sqrt(2) (|j> - |j+1 mod m>) (x) |j>
        ket_a = np.zeros(m, dtype=np.complex128)
        ket_a[j] = 1
        ket_a[(j + 1) % m] -= 1
        ket_a /= np.linalg.norm(ket_a)
        ket_b = np.zeros(n, dtype=np.complex128)
        ket_b[j] = 1
        basis_upb.append(np.kron(ket_a, ket_b).reshape(-1, 1))

    omega = np.exp(1j * 2 * np.pi / (n - 2))
    for j in range(m):
        ket_a = np.zeros(m, dtype=np.complex128)
        ket_a[j] = 1
        for k in range(1, n - 2):
            # |L_jk> = |j> (x) 1/sqrt(n-2) (sum_{i=0}^{m-3} w^ik |i+j+1 mod m>
            #                               + sum_{i=m-2}^{n-3} w^ik |i+2>)
            ket_b = np.zeros(n, dtype=np.complex128)
            for i in range(m - 2):
                ket_b[(i + j + 1) % m] += omega ** (i * k)
            for i in range(m - 2, n - 2):
                ket_b[i + 2] += omega ** (i * k)
            ket_b /= np.linalg.norm(ket_b)
            basis_upb.append(np.kron(ket_a, ket_b).reshape(-1, 1))

    # |F> = 1/sqrt(nm) sum_i sum_j |i> (x) |j>
    stopper = np.ones(m * n, dtype=np.complex128) / np.sqrt(m * n)
    basis_upb.append(stopper.reshape(-1, 1))

    return basis_upb


def gen_tiles2(m_n: tuple[int, int]) -> np.ndarray:
    """The bound entangled state built from the GenTiles2 UPB on C^m (x) C^n.

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system. Requires
            n > 3, m >= 3, and n >= m. Note m = n = 3 does not yield a UPB
            (excluded by n > 3).

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the GenTiles2 unextendible product basis.
    """
    return upb(gen_tiles2_basis(m_n))
