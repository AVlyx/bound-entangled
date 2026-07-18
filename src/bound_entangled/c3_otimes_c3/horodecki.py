"""https://arxiv.org/abs/quant-ph/9703004

P. Horodecki, "Separability criterion and inseparable mixed states with
positive partial transposition", Phys. Lett. A 232, 333 (1997), Section 4.1.
One of the first known families of bound entangled states: PPT for every
a_param in [0, 1], separable only at the endpoints a_param = 0 or 1.
"""

from toqito.states import horodecki as horodecki_toqito
import numpy as np


def horodecki(a_param: float) -> np.ndarray:
    """The 3x3 Horodecki state.

    Args:
        a_param: free real parameter in [0, 1]. The state is PPT for every
            value in this range, and separable only at a_param = 0 or 1.

    Returns:
        np.ndarray: the 3x3 Horodecki density matrix.
    """
    return horodecki_toqito(a_param, dim=[3, 3])  # type: ignore
