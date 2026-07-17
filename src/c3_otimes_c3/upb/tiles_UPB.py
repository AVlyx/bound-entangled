"""https://arxiv.org/abs/quant-ph/9808030

C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M.
Terhal, "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett.
82, 5385 (1999).
"""

import numpy as np
from toqito.states import tile
from utils import upb


def tiles_upb() -> np.ndarray:
    """The bound entangled state built from the "Tiles" UPB on C^3 (x) C^3.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the Tiles unextendible product basis (`toqito.states.tile`).
    """
    return upb([tile(i) for i in range(5)])
