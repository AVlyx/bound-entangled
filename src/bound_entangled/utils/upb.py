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

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> from bound_entangled.c3_otimes_c3.upb.pyramid_UPB import pyramid_basis
        >>> state = upb(pyramid_basis())
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False

        Every basis vector lies in the kernel, the defining property of the
        construction:

        >>> import numpy as np
        >>> bool(all(np.allclose(state @ v, 0) for v in pyramid_basis()))
        True
    """
    d_total: int = basis[0].shape[0]
    rho = np.identity(d_total, dtype=np.complex128)
    for i in range(len(basis)):
        rho -= ketbra(basis[i])
    return rho / (d_total - len(basis))
