"""https://arxiv.org/abs/quant-ph/9911056

D. Bruß, A. Peres, "Construction of quantum states with bound entanglement",
Phys. Rev. A 61, 030301(R) (2000). Named "chessboard states" because their
8x8 matrix form looks like a chessboard (see also
https://arxiv.org/abs/2010.08372, Appendix C2).
"""

from toqito.states import chessboard as chessboard_toqito
from typing import Optional
import numpy as np


def chessboard(
    a: complex, b: complex, c: complex, d: complex, m: complex, n: complex, s: Optional[complex] = None, t: Optional[complex] = None
) -> np.ndarray:
    """A chessboard state.

    The state is guaranteed PPT if s and t are set to None.

    Args:
        a: free real parameter.
        b: free real parameter.
        c: free real parameter.
        d: free real parameter.
        m: free real parameter.
        n: free real parameter.
        s: defaults to c/n if None (this default is required for the state to be PPT).
        t: defaults to a*d/m if None (this default is required for the state to be PPT).

    Returns:
        np.ndarray: a chessboard quantum state.
    """
    return chessboard_toqito([a, b, c, d, m, n], s, t)  # type: ignore


def chessboard_extremal_PPT() -> np.ndarray:
    """Extremal PPT chessboard state.

    The state from the chessboard family with m = n = b = -3/5, a = 3/5,
    c = -d = 6/5, shown to be an extremal point of the PPT-entangled states
    in https://arxiv.org/abs/2010.08372 (Fig. 2 / Fig. 9, page 25).

    Returns:
        np.ndarray: the extremal PPT chessboard state.
    """
    return chessboard(
        # m = n = b = -3/5
        m=-3 / 5,
        n=-3 / 5,
        b=-3 / 5,
        # a = 3/5
        a=3 / 5,
        # c = -d = 6/5
        c=6 / 5,
        d=-6 / 5,
    )
