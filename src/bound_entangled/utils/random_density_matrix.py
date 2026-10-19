import numpy as np


def random_density_matrix(dim: int, seed: int | None = None) -> np.ndarray:
    """A random density matrix drawn from the Hilbert-Schmidt measure.

    Draws a complex Ginibre matrix G with standard normal entries and returns
    G G^dagger / tr(G G^dagger).

    Args:
        dim: the dimension of the density matrix.
        seed: seed for the random number generator, for reproducible draws.

    Returns:
        np.ndarray: a dim x dim density matrix.

    Examples:
        >>> import numpy as np
        >>> rho = random_density_matrix(4, seed=0)
        >>> bool(np.isclose(np.trace(rho).real, 1)), bool(np.linalg.eigvalsh(rho).min() >= 0)
        (True, True)
    """
    gen = np.random.default_rng(seed)
    gin = gen.standard_normal((dim, dim)) + 1j * gen.standard_normal((dim, dim))
    rho = gin @ gin.conj().T
    return rho / np.trace(rho)
