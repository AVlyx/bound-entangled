"""https://arxiv.org/abs/1705.09261

J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid
states", Phys. Rev. A 97, 062340 (2018).
"""

import numpy as np
from math import sqrt
from bound_entangled.utils import ketbra


def ket(m_n: tuple[int, int], ij: tuple[int, int]):
    m, n = m_n
    i, j = ij
    z = np.zeros(m * n)
    if i >= m or j >= n:
        raise IndexError(f"Vertex ({i},{j}) does not  belong to the graph, m={m}, n={n}")
    z[i * n + j] = 1
    return z


def grid_component(m_n: tuple[int, int], ij: tuple[int, int], kl: tuple[int, int]) -> np.ndarray:
    return 1 / sqrt(2) * (ket(m_n, ij) - ket(m_n, kl))


def grid_state(m_n: tuple[int, int], *edges: tuple[tuple[int, int], tuple[int, int]]) -> np.ndarray:
    """A quantum grid state: the uniform mixture of pure states over a set of graph edges.

    Args:
        m_n: grid dimensions (m, n).
        *edges: each edge is a pair of vertices ((i, j), (k, l)).

    Returns:
        np.ndarray: the grid state on C^m (x) C^n.

    Examples:
        Whether a grid state is bound entangled depends on the graph.  The
        cross-hatch edge set on a 3x3 grid gives one (see
        `c3_otimes_c3.cross_hatch`):

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = grid_state(
        ...     (3, 3),
        ...     ((0, 0), (1, 2)),
        ...     ((1, 0), (2, 2)),
        ...     ((0, 1), (2, 0)),
        ...     ((0, 2), (2, 1)),
        ... )
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False

        A path on a 2x3 grid does not: the total dimension is 6, where PPT
        already implies separable (Horodecki 1996).

        >>> path = grid_state((2, 3), ((0, 0), (0, 1)), ((0, 1), (0, 2)), ((0, 0), (1, 0)))
        >>> sep, _ = is_separable(path, dim=[2, 3])
        >>> sep
        True
    """
    m, n = m_n
    ret = np.zeros((m * n, m * n))
    for ij, kl in edges:
        gc = grid_component(m_n, ij, kl)
        ret += ketbra(gc)
    ret /= len(edges)
    return ret
