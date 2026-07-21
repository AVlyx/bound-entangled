"""https://arxiv.org/abs/quant-ph/9703004"""

from toqito.states import horodecki as horodecki_toqito
import numpy as np


def horodecki(a_param: float) -> np.ndarray:
    """Construct the 2×4 Horodecki bound-entangled state (arXiv:quant-ph/9703004).

    One of the original examples of PPT entanglement, this state lives on
    C^2 ⊗ C^4 and is PPT for every ``a_param`` in [0, 1], yet entangled (and
    hence bound entangled) for every interior value ``a_param`` ∈ (0, 1).  At
    the endpoints the state is separable.

    Args:
        a_param: free real parameter in [0, 1].

    Returns:
        np.ndarray: 8×8 density matrix of the 2×4 Horodecki state.
    """
    return horodecki_toqito(a_param, dim=[2, 4])  # type: ignore
