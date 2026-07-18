import numpy as np
from bound_entangled.utils import ketbra


def upb(basis: list[np.ndarray]) -> np.ndarray:
    """Bound entangled state built from an unextendible product basis (UPB).

    The uniform mixture over the orthogonal complement of a UPB is PPT (each
    |v_i><v_i| being a product-state projector, partial transposition leaves
    it unchanged) yet has no product vector in its range, hence is entangled:
    a bound entangled state.

    Reference: C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A.
    Smolin, B. M. Terhal, "Unextendible Product Bases and Bound Entanglement",
    Phys. Rev. Lett. 82, 5385 (1999), https://arxiv.org/abs/quant-ph/9808030

    Args:
        basis: the product vectors (as column vectors) forming the UPB.

    Returns:
        np.ndarray: the corresponding bound entangled density matrix.
    """
    d_total: int = basis[0].shape[0]
    rho = np.identity(d_total, dtype=np.complex128)
    for i in range(len(basis)):
        rho -= ketbra(basis[i], basis[i])
    return rho / (d_total - len(basis))
