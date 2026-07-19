"""https://arxiv.org/abs/quant-ph/0605036

H.-P. Breuer, "Optimal entanglement criterion for mixed quantum states",
Phys. Rev. Lett. 97, 080501 (2006).
Bound entangled states for even local dimension d >= 4: PPT for any positive
weight lam, yet entangled by Breuer's anti-linear map criterion.
"""

import numpy as np
from toqito.states import breuer as _breuer


def breuer(lam: float) -> np.ndarray:
    """Construct a Breuer bound-entangled state on C^4 ⊗ C^4.

    Wraps :func:`toqito.states.breuer` with ``dim=4``, which is the smallest
    local dimension for which Breuer's construction yields a bound-entangled
    state (requires even ``dim >= 4``).

    The state is a mixture of the maximally mixed state and a
    partially-transposed singlet component weighted by ``lam``.  For any
    ``lam > 0`` the state is entangled yet PPT, making it bound entangled.

    Parameters
    ----------
    lam:
        Weight of the singlet component.  Must satisfy ``0 < lam <= 1``.

    Returns
    -------
    np.ndarray
        16×16 density matrix of the Breuer state.
    """
    return _breuer(dim=4, lam=lam)
