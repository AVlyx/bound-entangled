import numpy as np


def partial_transpose(mat: np.ndarray, dim: list[int]) -> np.ndarray:
    """The partial transpose of an operator on C^dim[0] ⊗ C^dim[1] over the second system.

    Args:
        mat: a square matrix on C^dim[0] ⊗ C^dim[1].
        dim: the two local dimensions [d_A, d_B].

    Returns:
        np.ndarray: (1 ⊗ T)(mat).

    Examples:
        The partial transpose of the projector onto the two-qubit maximally
        entangled state is half the swap operator:

        >>> import numpy as np
        >>> phi = np.array([1, 0, 0, 1]) / np.sqrt(2)
        >>> np.rint(partial_transpose(np.outer(phi, phi), [2, 2]) * 2).astype(int)
        array([[1, 0, 0, 0],
               [0, 0, 1, 0],
               [0, 1, 0, 0],
               [0, 0, 0, 1]])
    """
    d_a, d_b = dim
    if mat.shape != (d_a * d_b, d_a * d_b):
        raise ValueError(f"matrix of shape {mat.shape} does not match dimensions {dim}")
    return mat.reshape(d_a, d_b, d_a, d_b).transpose(0, 3, 2, 1).reshape(d_a * d_b, d_a * d_b)


def is_ppt(mat: np.ndarray, dim: list[int], tol: float | None = None) -> bool:
    """Whether a bipartite operator has a positive partial transpose.

    Args:
        mat: a square matrix on C^dim[0] ⊗ C^dim[1].
        dim: the two local dimensions [d_A, d_B].
        tol: eigenvalues down to -tol count as non-negative. Defaults to the
            square root of machine epsilon.

    Returns:
        bool: True if every eigenvalue of the partial transpose is >= -tol.

    Examples:
        >>> import numpy as np
        >>> phi = np.array([1, 0, 0, 1]) / np.sqrt(2)
        >>> is_ppt(np.outer(phi, phi), [2, 2])
        False
        >>> is_ppt(np.identity(4) / 4, [2, 2])
        True
    """
    if tol is None:
        tol = float(np.sqrt(np.finfo(float).eps))
    pt = partial_transpose(mat, dim)
    return bool(np.linalg.eigvalsh((pt + pt.conj().T) / 2).min() >= -tol)
