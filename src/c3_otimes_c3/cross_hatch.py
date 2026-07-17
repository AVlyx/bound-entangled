from cm_otimes_cn.grid_state import grid_state


def cross_hatch():
    return grid_state(
        (3, 3),
        ((0, 0), (1, 2)),
        ((1, 0), (2, 2)),
        ((0, 1), (2, 0)),
        ((0, 2), (2, 1)),
    )
