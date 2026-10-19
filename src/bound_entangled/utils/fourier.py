import numpy as np


def fourier(dim: int) -> np.ndarray:
    """The d x d discrete Fourier transform matrix, with entries omega^(jk) / sqrt(d).

    Args:
        dim: the dimension d, with omega = exp(2 pi i / d).

    Returns:
        np.ndarray: the unitary Fourier matrix.

    Examples:
        >>> u = fourier(3)
        >>> bool(np.allclose(u @ u.conj().T, np.identity(3)))
        True
    """
    k = np.arange(dim)
    return np.exp(2j * np.pi * np.outer(k, k) / dim) / np.sqrt(dim)
