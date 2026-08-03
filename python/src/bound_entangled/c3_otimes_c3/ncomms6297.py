"""https://www.nature.com/articles/ncomms6297

Rank-4 PPT entangled state on C^3 ⊗ C^3 constructed from an explicit spectral
decomposition (Nature Commun. 5, 6297 (2014)).
"""

import numpy as np
from math import sqrt
from bound_entangled.utils import ketbra


def basis3(i: int, j: int):
    a = np.zeros(3, dtype=np.float64)
    b = np.zeros(3, dtype=np.float64)
    a[i] = 1
    b[j] = 1
    return np.kron(a, b)


def ncomms6297() -> np.ndarray:
    """Construct the ncomms6297 bound-entangled state on C^3 ⊗ C^3.

    A rank-4 PPT entangled state built from four explicit eigenvectors
    ``psi_1 … psi_4`` with eigenvalues from Nature Commun. 5, 6297 (2014).

    Returns:
        np.ndarray: 9×9 density matrix of the bound-entangled state.
    """
    a = sqrt(131 / 2)
    psi_1 = 1 / sqrt(2) * (basis3(0, 0) + basis3(1, 1))
    psi_2 = a / 12 * (basis3(0, 1) + basis3(1, 0)) + 1 / 60 * basis3(0, 2) - 3 / 10 * basis3(2, 1)
    psi_3 = a / 12 * (basis3(0, 0) - basis3(1, 1)) + 1 / 60 * basis3(1, 2) + 3 / 10 * basis3(2, 0)
    psi_4 = 1 / sqrt(3) * (-basis3(0, 1) + basis3(1, 0) + basis3(2, 2))

    psi_i = [psi_1, psi_2, psi_3, psi_4]
    eigenvals = [3257 / 6884, 450 / 1721, 450 / 1721, 27 / 6884]
    return sum([eig * ketbra(psi) for psi, eig in zip(psi_i, eigenvals)])  # type: ignore
