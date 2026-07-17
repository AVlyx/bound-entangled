"""https://arxiv.org/abs/2402.12966

R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum
bound entangled states". Generalizes quantum grid states (see
`cm_otimes_cn.grid_state`) to hyperedges spanning more than two vertices.
"""

import numpy as np
from utils import ketbra


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
    """
    m, n = m_n
    rho = np.zeros((m * n, m * n))
    for edge in hyperedges:
        gc = grid_component(m_n, *edge)
        rho += ketbra(gc, gc)
    rho /= np.trace(rho)
    return rho
