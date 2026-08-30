"""https://arxiv.org/abs/1705.09261

J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid
states", Phys. Rev. A 97, 062340 (2018).
"""

from bound_entangled.cm_otimes_cn.grid_state import grid_state


def cross_hatch():
    """The 3x3 "cross-hatch" grid state.

    A bound entangled example of a quantum grid state, detected by the CCNR
    (realignment) criterion.

    Returns:
        np.ndarray: the cross-hatch grid state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = cross_hatch()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    return grid_state(
        (3, 3),
        ((0, 0), (1, 2)),
        ((1, 0), (2, 2)),
        ((0, 1), (2, 0)),
        ((0, 2), (2, 1)),
    )
