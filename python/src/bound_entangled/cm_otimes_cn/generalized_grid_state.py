"""https://arxiv.org/abs/2402.12966

R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum
bound entangled states". Generalizes quantum grid states (see
`cm_otimes_cn.grid_state`) to hyperedges spanning more than two vertices.
"""

import numpy as np
from bound_entangled.utils import ketbra


def grid_component(m_n: tuple[int, int], *ij: tuple[int, int]) -> np.ndarray:
    m, n = m_n
    e = np.zeros(m * n)
    for i, j in ij:
        if i >= m or j >= n:
            raise IndexError(f"Vertex ({i},{j}) does not  belong to the graph, m={m}, n={n}")
        e[i * n + j] += 1
    return e


def generalized_grid_state(m_n: tuple[int, int], *hyperedges: list[tuple[int, int]]):
    """A generalized grid state

    Args:
        m_n: grid dimensions (m, n).
        *hyperedges: each hyperedge is a list of vertices (i, j) it spans.

    Returns:
        np.ndarray: the generalized grid state on C^m (x) C^n.

    Examples:
        Unlike `grid_state`, hyperedges add their vertices rather than
        subtracting them, so most hyperedge sets give an NPT (hence
        distillable, not bound entangled) state:

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = generalized_grid_state((3, 3), [(0, 0), (1, 1)], [(0, 1), (2, 2)])
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        False
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False

        See `c5_otimes_c5.sn3_grid_state` for the hyperedge set that does give
        a bound entangled state.
    """
    m, n = m_n
    rho = np.zeros((m * n, m * n))
    for edge in hyperedges:
        gc = grid_component(m_n, *edge)
        rho += ketbra(gc)
    rho /= np.trace(rho)
    return rho
