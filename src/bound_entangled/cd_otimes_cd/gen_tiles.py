"""https://arxiv.org/abs/quant-ph/9908070

D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
"Unextendible Product Bases, Uncompletable Product Bases and Bound
Entanglement", Commun. Math. Phys. 238, 379 (2003), Section V B, Theorem 5. A
"tile" construction generalizing the Tiles UPB (`c3_otimes_c3.tiles_upb`) to
arbitrary even dimension.
"""

import numpy as np
from bound_entangled.utils import upb


def gen_tiles1_basis(d: int) -> list[np.ndarray]:
    """The product vectors of the GenTiles1 UPB on C^d (x) C^d.

    Built from d/2 - 1 "vertical" and d/2 - 1 "horizontal" families of tile
    states (Eqs. 5.4-5.5) plus a "stopper" state (Eq. 5.6), for a total of
    d^2 - 2d + 1 states.

    Args:
        d: local dimension of both parties. Must be even and >= 4.

    Returns:
        list[np.ndarray]: the normalized product vectors forming the
        GenTiles1 unextendible product basis, as column vectors.
    """
    if d < 4 or d % 2 != 0:
        raise ValueError("d must be even and >= 4")

    omega = np.exp(1j * 4 * np.pi / d)
    basis = []

    for m in range(1, d // 2):
        for k in range(d):
            # |V_mk> = |k> (x) |omega_{m,k+1}>
            ket_k = np.zeros(d, dtype=np.complex128)
            ket_k[k] = 1
            ket_omega = np.zeros(d, dtype=np.complex128)
            for j in range(d // 2):
                ket_omega[(j + k + 1) % d] += omega ** (j * m)
            ket_omega /= np.linalg.norm(ket_omega)
            basis.append(np.kron(ket_k, ket_omega).reshape(-1, 1))

    for m in range(1, d // 2):
        for k in range(d):
            # |H_mk> = |omega_{m,k}> (x) |k>
            ket_omega = np.zeros(d, dtype=np.complex128)
            for j in range(d // 2):
                ket_omega[(j + k) % d] += omega ** (j * m)
            ket_omega /= np.linalg.norm(ket_omega)
            ket_k = np.zeros(d, dtype=np.complex128)
            ket_k[k] = 1
            basis.append(np.kron(ket_omega, ket_k).reshape(-1, 1))

    # |F> = sum_i sum_j |i> (x) |j>
    stopper = np.ones(d * d, dtype=np.complex128) / d
    basis.append(stopper.reshape(-1, 1))

    return basis


def gen_tiles1(d: int) -> np.ndarray:
    """The bound entangled state built from the GenTiles1 UPB on C^d (x) C^d.

    Args:
        d: local dimension of both parties. Must be even and >= 4.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the GenTiles1 unextendible product basis.
    """
    return upb(gen_tiles1_basis(d))
