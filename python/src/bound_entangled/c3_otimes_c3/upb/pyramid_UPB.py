"""https://arxiv.org/abs/quant-ph/9808030

C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M.
Terhal, "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett.
82, 5385 (1999).
"""

import numpy as np
from bound_entangled.utils import upb


def pyramid_basis() -> list[np.ndarray]:
    """The five product vectors of the "Pyramid" UPB on C^3 (x) C^3.

    Returns:
        list[np.ndarray]: the five normalized product vectors forming the
        Pyramid unextendible product basis, as column vectors.
    """
    h = 0.5 * np.sqrt(1 + np.sqrt(5))
    vecs = []
    for j in range(5):
        a = np.array([np.cos(2 * np.pi * j / 5), np.sin(2 * np.pi * j / 5), h])
        b = np.array([np.cos(4 * np.pi * j / 5), np.sin(4 * np.pi * j / 5), h])
        a /= np.linalg.norm(a)
        b /= np.linalg.norm(b)
        vecs.append(np.kron(a, b).reshape(-1, 1))
    return vecs


def pyramid_upb() -> np.ndarray:
    """The bound entangled state built from the Pyramid UPB.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the Pyramid UPB.
    """
    return upb(pyramid_basis())
