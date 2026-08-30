"""https://arxiv.org/abs/quant-ph/0001001

J. A. Smolin, "Four-party unlockable bound entangled state",
Phys. Rev. A 63, 032306 (2001).
Bound entangled state on C^4 ⊗ C^4 (four qubits) that can be unlocked
by classical communication between any two of the four parties.
"""

import numpy as np
from bound_entangled.multipartite.generalized_smolin import generalized_smolin


def smolin() -> np.ndarray:
    """Construct the Smolin bound-entangled state on C^4 ⊗ C^4 (arXiv:quant-ph/0001001).

    The Smolin state is the equal mixture of the four two-qubit Bell states
    tensored with themselves::

        rho = (1/4) sum_{i=0}^{3} |phi_i><phi_i| ⊗ |phi_i><phi_i|

    It lives on a four-qubit system A⊗B⊗C⊗D.

    Returns
    -------
    np.ndarray
        16×16 density matrix representing the Smolin state

    Examples
    --------
    The Smolin state's entanglement is genuinely four-party: across any 2|2
    cut it is an explicit mixture of product states, so a *bipartite*
    separability test correctly reports it separable.  Bound entanglement here
    means undistillable four-party entanglement, which `is_separable` on a cut
    does not see.

    >>> from toqito.matrix_props import is_density
    >>> from toqito.state_props import is_ppt, is_separable
    >>> state = smolin()
    >>> is_density(state)
    True
    >>> is_ppt(state, dim=[4, 4])
    True
    >>> sep, _ = is_separable(state, dim=[4, 4])
    >>> sep
    True
    """
    return generalized_smolin(4)
