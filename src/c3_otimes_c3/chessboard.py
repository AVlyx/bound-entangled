"""https://arxiv.org/abs/quant-ph/9911056"""

from toqito.states import chessboard as chessboard_toqito
from typing import Optional
import numpy as np


def chessboard(a: float, b: float, c: float, d: float, m: float, n: float, s: Optional[float] = None, t: Optional[float] = None) -> np.ndarray:
    """A chessboard state

    The state is guaranteed PPT if s and t are set to None

    Returns:
        np.ndarray: a chessboard quantum state
    """
    return chessboard_toqito([a, b, c, d, m, n], s, t)


def chessboard_extremal_PPT() -> np.ndarray:
    """Extremal PPT chessboard state

    https://arxiv.org/pdf/2010.08372 page 25"""
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
