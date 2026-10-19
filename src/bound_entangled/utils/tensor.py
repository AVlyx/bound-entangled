import numpy as np
from functools import reduce


def tensor(*arrays: np.ndarray) -> np.ndarray:
    """The tensor (Kronecker) product of the given vectors or matrices, left to right.

    Args:
        *arrays: the factors, in order.

    Returns:
        np.ndarray: ``arrays[0] ⊗ arrays[1] ⊗ ...``.

    Examples:
        >>> import numpy as np
        >>> tensor(np.array([1, 0]), np.array([0, 1]))
        array([0, 1, 0, 0])
    """
    if not arrays:
        raise ValueError("tensor needs at least one factor")
    return reduce(np.kron, arrays)
