import numpy as np
from bound_entangled.utils.tensor import tensor

_PAULIS = (
    np.identity(2, dtype=np.complex128),
    np.array([[0, 1], [1, 0]], dtype=np.complex128),
    np.array([[0, -1j], [1j, 0]], dtype=np.complex128),
    np.array([[1, 0], [0, -1]], dtype=np.complex128),
)


def pauli(ind: int | list[int]) -> np.ndarray:
    """A Pauli matrix, or a tensor product of them.

    Indices follow 0 = I, 1 = X, 2 = Y, 3 = Z.

    Args:
        ind: one index, or a list of indices for the product
            sigma_{ind[0]} ⊗ sigma_{ind[1]} ⊗ ...

    Returns:
        np.ndarray: the 2x2 Pauli matrix, or the 2^n x 2^n product.

    Examples:
        >>> pauli(3).real
        array([[ 1.,  0.],
               [ 0., -1.]])
        >>> pauli([1, 3]).shape
        (4, 4)
    """
    if isinstance(ind, (list, tuple)):
        return tensor(*(pauli(i) for i in ind))
    if ind not in (0, 1, 2, 3):
        raise ValueError(f"Pauli index must be 0, 1, 2 or 3, got {ind}")
    return _PAULIS[ind].copy()
