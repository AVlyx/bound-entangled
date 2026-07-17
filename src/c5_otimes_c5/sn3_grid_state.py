"""https://arxiv.org/pdf/2402.12966"""

from cm_otimes_cn.generalized_grid_state import generalized_grid_state


def sn3_grid_state():
    return generalized_grid_state(
        (5, 5),
        # loops
        [(0, 0)],
        [(1, 0)],
        [(0, 1)],
        [(4, 1)],
        [(4, 1)],
        # double loops
        [(3, 2)],
        [(2, 3)],
        [(3, 2)],
        [(2, 3)],
        # edges
        [(1, 2), (3, 4)],
        [(2, 1), (4, 3)],
        [(2, 2), (3, 3)],
        # hyperedge
        [(0, 2), (1, 1), (2, 0)],
    )
