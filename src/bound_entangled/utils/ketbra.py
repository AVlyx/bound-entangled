import numpy as np


def ketbra(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """The outer product |a><b|.

    Args:
        a: the "ket" vector.
        b: the "bra" vector (its complex conjugate is used).

    Returns:
        np.ndarray: the rank-1 operator |a><b|.
    """
    return np.outer(a, b.conj())
