"""https://arxiv.org/abs/quant-ph/0411095

F. Benatti, R. Floreanini, M. Piani, "Non-decomposable quantum dynamical
semigroups and bound entangled states", Open Syst. Inf. Dyn. 11, 325 (2004).

Also presented as "the 4x4 bound entangled Piani state" in
https://arxiv.org/abs/2010.08372 (Appendix C5).
"""

from toqito.matrices import pauli
from toqito.states import max_entangled
from toqito.perms import permute_systems
import numpy as np
from bound_entangled.utils import ketbra


def P_ij(i: int, j: int):
    """The projector onto the generalized Bell state |Psi_ij> = (1 (x) sigma_i (x) sigma_j)|Psi_4^+>.

    Args:
        i: index of the first Pauli matrix (0..3).
        j: index of the second Pauli matrix (0..3).

    Returns:
        np.ndarray: the rank-1 projector P_ij on C^4 (x) C^4.
    """
    sigma_ij = np.kron(np.identity(4), np.kron(pauli(i), pauli(j)))  # type: ignore
    ket_ij = sigma_ij @ max_entangled(4)
    return ketbra(ket_ij, ket_ij)


def pianni():
    """The 4x4 bound entangled "Piani" state.

    Uniform mixture of the six projections P_ij for (i, j) in
    {(0,2), (1,1), (2,3), (3,1), (3,2), (3,3)}, indecomposable and PPT under
    the bipartition AA'|BB' after regrouping the four underlying qubits.

    Returns:
        np.ndarray: the 16x16 bound entangled density matrix.
    """
    rho = np.zeros((16, 16), dtype=np.complex128)
    for i, j in [(0, 2), (1, 1), (2, 3), (3, 1), (3, 2), (3, 3)]:
        rho += P_ij(i, j)
    rho /= 6
    return permute_systems(rho, [0, 2, 1, 3])
