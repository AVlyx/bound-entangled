"""https://arxiv.org/abs/quant-ph/0411142

A. Kay, "Degree of quantum bound entanglement for a family of mixed states",
Phys. Rev. A 71, 032309 (2005). (See also Smolin: arXiv:quant-ph/0001001.)
Generalization of the Smolin state to 2n qubits: bound entangled for all
even n >= 2, constructed from tensor products of Pauli operators.
"""

from toqito.matrices import pauli
import numpy as np


def generalized_smolin(systems: int) -> np.ndarray:
    """Construct the generalized Smolin (GSS) bound-entangled state (arXiv:quant-ph/0411142).

    For an even number of qubits ``systems = 2n``, the state is::

        rho = (I + (-1)^n * sum_{i in {X,Y,Z}} sigma_i^{⊗2n}) / 2^{2n}

    The ``systems=4`` case (n=1 pairs ⊗ 2 copies) reproduces the original
    Smolin state on C^4 ⊗ C^4.  For all even ``systems >= 4`` the state is
    bound entangled.

    Parameters
    ----------
    systems:
        Total number of qubits.  Must be a positive even integer.

    Returns
    -------
    np.ndarray
        ``2^systems × 2^systems`` density matrix of the GSS state.

    Raises
    ------
    AssertionError
        If ``systems`` is odd.
    """
    assert systems % 2 == 0
    n = systems // 2
    result = np.identity(2**systems, dtype=np.complex128)
    sign = (-1) ** n
    for i in range(1, 4):
        result += sign * pauli([i] * systems)
    return result / 2**systems
