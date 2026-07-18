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
    """
    return grid_state(
        (3, 3),
        ((0, 0), (1, 2)),
        ((1, 0), (2, 2)),
        ((0, 1), (2, 0)),
        ((0, 2), (2, 1)),
    )
