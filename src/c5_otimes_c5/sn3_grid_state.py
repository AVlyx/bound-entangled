"""https://arxiv.org/abs/2402.12966

R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum
bound entangled states", Result 1 / Appendix B: the smallest known Schmidt
number 3 (hence "SN3") PPT bound entangled state, in local dimension 5x5.
"""

from cm_otimes_cn.generalized_grid_state import generalized_grid_state


def sn3_grid_state():
    """The smallest known Schmidt number 3 PPT bound entangled state, in 5x5.

    Returns:
        np.ndarray: the Schmidt number 3 (SN3) generalized grid state rho_5,5.
    """
    return generalized_grid_state(
        (5, 5),
        # loops
        [(0, 0)],
        [(1, 0)],
        [(0, 1)],
        [(4, 1)],
        [(1, 4)],
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
