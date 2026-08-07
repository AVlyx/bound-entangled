"""https://arxiv.org/abs/quant-ph/9703004

P. Horodecki, "Separability criterion and inseparable mixed states with
positive partial transposition", Phys. Lett. A 232, 333 (1997), Section 4.1.
One of the first known families of bound entangled states: PPT for every
a in [0, 1], separable only at the endpoints a = 0 or 1.
"""

from toqito.states import horodecki as horodecki_toqito
import numpy as np


def horodecki(a: float) -> np.ndarray:
    """The 3x3 Horodecki state.

    Args:
        a: free real parameter in [0, 1]. The state is PPT for every
            value in this range, and separable only at a = 0 or 1.

    Returns:
        np.ndarray: the 3x3 Horodecki density matrix.
    """
    return horodecki_toqito(a, dim=[3, 3])  # type: ignore
