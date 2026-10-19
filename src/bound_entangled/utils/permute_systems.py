import numpy as np


def permute_systems(mat: np.ndarray, perm: list[int], dim: list[int]) -> np.ndarray:
    """Reorder the subsystems of an operator on C^dim[0] ⊗ C^dim[1] ⊗ ...

    Subsystem ``i`` of the result is subsystem ``perm[i]`` of ``mat``, so
    ``perm = [0, 2, 1, 3]`` turns an ABA'B' ordering into AA'BB'.

    Args:
        mat: a square matrix on the tensor product of the subsystems.
        perm: the new order of the subsystems.
        dim: the dimension of each subsystem, in the current order.

    Returns:
        np.ndarray: the matrix with its subsystems reordered.

    Examples:
        Swapping the two factors of a product operator swaps the factors:

        >>> import numpy as np
        >>> a, b = np.diag([1.0, 2.0]), np.diag([1.0, 3.0, 5.0])
        >>> bool(np.allclose(permute_systems(np.kron(a, b), [1, 0], [2, 3]), np.kron(b, a)))
        True
    """
    n = len(dim)
    if sorted(perm) != list(range(n)):
        raise ValueError(f"{perm} is not a permutation of the {n} subsystems")
    total = int(np.prod(dim))
    if mat.shape != (total, total):
        raise ValueError(f"matrix of shape {mat.shape} does not match subsystem dimensions {dim}")
    out = mat.reshape(list(dim) * 2).transpose(list(perm) + [n + p for p in perm])
    return out.reshape(total, total)
