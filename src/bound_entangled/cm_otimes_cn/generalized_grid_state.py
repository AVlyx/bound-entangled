r"""Generalized grid states on $\mathbb{C}^m \otimes \mathbb{C}^n$.

The generalized grid state of Krebs and Gachechiladze extends the
[grid state][bound_entangled.cm_otimes_cn.grid_state.grid_state] by letting a
hyperedge span any number of vertices of the $m \times n$ grid, not just two.
Each hyperedge contributes the unnormalized sum of its vertices' basis states
rather than their normalized difference, and the mixture is trace-normalized
rather than divided by the number of edges. Hyperedges with three or more
vertices are what allow high Schmidt numbers.

# Definition

A hyperedge $h$ is a list of one or more vertices $(i, j)$; one-vertex
hyperedges are called loops, and the same hyperedge may appear more than once.
Its component is the sum of the corresponding basis states, with no relative
minus sign:

$$
|h\rangle = \sum_{(i, j) \in h} |i, j\rangle .
$$

The generalized grid state is the trace-normalized mixture over a multiset $H$
of hyperedges (Eq. (2) of the paper):

$$
\rho = \frac{\sum_{h \in H} |h\rangle\langle h|}{\operatorname{tr}\big(\sum_{h \in H} |h\rangle\langle h|\big)} .
$$

!!! warning "Not every hyperedge set gives a bound entangled state"

    Most small hyperedge sets give an NPT state, which is distillable. The
    documented bound entangled instance is the
    [SN3 grid state][bound_entangled.c5_otimes_c5.sn3_grid_state.sn3_grid_state].

# References

- Robin Krebs and Mariami Gachechiladze, "High Schmidt number concentration in
  quantum bound entangled states", *Phys. Rev. Lett.* **132**, 220203 (2024).
  [arXiv:2402.12966](https://arxiv.org/abs/2402.12966) ·
  [doi:10.1103/PhysRevLett.132.220203](https://doi.org/10.1103/PhysRevLett.132.220203)
- Joshua Lockhart, Otfried Gühne and Simone Severini, "Entanglement properties
  of quantum grid states", *Phys. Rev. A* **97**, 062340 (2018).
  [arXiv:1705.09261](https://arxiv.org/abs/1705.09261) ·
  [doi:10.1103/PhysRevA.97.062340](https://doi.org/10.1103/PhysRevA.97.062340)
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
