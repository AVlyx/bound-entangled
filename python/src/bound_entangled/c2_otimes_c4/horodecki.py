"""https://arxiv.org/abs/quant-ph/9703004"""

from toqito.states import horodecki as horodecki_toqito
import numpy as np


def horodecki(a: float) -> np.ndarray:
    """Construct the 2×4 Horodecki bound-entangled state (arXiv:quant-ph/9703004).

    One of the original examples of PPT entanglement, this state lives on
    C^2 ⊗ C^4 and is PPT for every ``a`` in [0, 1], yet entangled (and
    hence bound entangled) for every interior value ``a`` ∈ (0, 1).  At
    the endpoints the state is separable.

    Args:
        a: free real parameter in [0, 1].

    Returns:
        np.ndarray: 8×8 density matrix of the 2×4 Horodecki state.

    Examples:
        No sufficient separability criterion settles a 2x4 PPT state, so
        ``is_separable`` falls through to the DPS symmetric-extension SDP and
        takes roughly ten seconds here.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = horodecki(0.5)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 4])
        True
        >>> sep, _ = is_separable(state, dim=[2, 4])
        >>> sep
        False
    """
    return horodecki_toqito(a, dim=[2, 4])  # type: ignore
