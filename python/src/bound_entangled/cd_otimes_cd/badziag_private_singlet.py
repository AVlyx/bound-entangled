"""https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101 as PPT singlets."""

from toqito.matrices import fourier
from toqito.matrix_ops import tensor
from math import sqrt
from bound_entangled.utils import ketbra
import numpy as np


def ket_i(d: int, i: int):
    ket = np.zeros(d, dtype=np.complex128)
    ket[i] = 1
    return ket


def basis(shield_dim: int, i: int, j: int, k: int, l: int):
    """basis vector |ijkj>"""
    assert i <= 1 and j <= 1
    return tensor(ket_i(2, i), ket_i(2, j), ket_i(shield_dim, k), ket_i(shield_dim, l))


def badziag_private_singlet(*, shield_dim: int) -> np.ndarray:
    """Construct the Bädziąg et al. private-singlet bound-entangled state on C^{2d} ⊗ C^{2d}.

    A PPT singlet in dimension 2d × 2d built from a shield subsystem of
    dimension d and a two-qubit pair, following Phys. Rev. Research 3, 023101
    (2021).  The state is bound entangled for every shield_dim >= 2.

    Args:
        shield_dim: shield subsystem dimension d (>= 2).

    Returns:
        np.ndarray: (4d²) × (4d²) density matrix of the bound-entangled state.

    Examples:
        The matrix is returned in ABA'B' ordering (two-qubit pair A,B then the
        shield pair A',B').  The physical bipartition is Alice=(A,A') against
        Bob=(B,B'), so it has to be permuted to AA'BB' before the Alice|Bob cut
        of dimension 2d x 2d means anything.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.perms import permute_systems
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = permute_systems(
        ...     badziag_private_singlet(shield_dim=2), [0, 2, 1, 3], dim=[2, 2, 2, 2]
        ... )
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[4, 4])
        True
        >>> sep, _ = is_separable(state, dim=[4, 4])
        >>> sep
        False
    """
    p1 = sqrt(shield_dim) / (1 + sqrt(shield_dim))
    p2 = 1 - p1
    u = fourier(shield_dim)

    ret = sum(
        ketbra(
            basis(shield_dim, 0, 0, i, j),
        )
        + ketbra(
            basis(shield_dim, 1, 1, i, j),
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p1 / (2 * shield_dim**2))

    ret += sum(
        (
            u[i, j]
            * ketbra(
                basis(shield_dim, 0, 0, i, j),
                basis(shield_dim, 1, 1, j, i),
            )
        )
        + (
            u[i, j].conj()
            * ketbra(
                basis(shield_dim, 1, 1, j, i),
                basis(shield_dim, 0, 0, i, j),
            )
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p1 / (2 * shield_dim * sqrt(shield_dim)))

    ret += sum(
        ketbra(
            basis(shield_dim, 0, 1, i, i),
        )
        + ketbra(
            basis(shield_dim, 1, 0, i, i),
        )
        for i in range(shield_dim)
    ) * (p2 / (2 * shield_dim))

    ret += sum(
        (
            u[i, j]
            * ketbra(
                basis(shield_dim, 0, 1, i, i),
                basis(shield_dim, 1, 0, j, j),
            )
        )
        + (
            u[i, j].conj()
            * ketbra(
                basis(shield_dim, 1, 0, j, j),
                basis(shield_dim, 0, 1, i, i),
            )
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p2 / (2 * shield_dim))

    return ret  # type: ignore
