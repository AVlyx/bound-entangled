import numpy as np


def max_entangled(dim: int) -> np.ndarray:
    """The maximally entangled state (1/sqrt(d)) sum_i |ii> of C^d ⊗ C^d.

    Args:
        dim: the local dimension d.

    Returns:
        np.ndarray: the normalized state as a (d², 1) column vector.

    Examples:
        >>> max_entangled(2).ravel() * np.sqrt(2)
        array([1., 0., 0., 1.])
    """
    if dim < 1:
        raise ValueError("dim must be a positive integer")
    psi = np.zeros((dim * dim, 1))
    psi[np.arange(dim) * (dim + 1), 0] = 1 / np.sqrt(dim)
    return psi
