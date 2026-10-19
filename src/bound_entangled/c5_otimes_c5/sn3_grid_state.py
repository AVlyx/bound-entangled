r"""The Schmidt number 3 grid state on $\mathbb{C}^5 \otimes \mathbb{C}^5$.

The smallest known Schmidt number 3 PPT bound entangled state, on
$\mathbb{C}^5 \otimes \mathbb{C}^5$ (Result 1 of Krebs and Gachechiladze, who
note it had been believed to require $6 \times 6$). It is an instance of the
[generalized grid state][bound_entangled.cm_otimes_cn.generalized_grid_state.generalized_grid_state]
construction: a mixture of pure states, each carried by a hyperedge over the
product basis, chosen so the state stays positive under partial transpose while
having Schmidt number 3.

# Definition

A hyperedge is a list of one or more vertices $|i\rangle \otimes |j\rangle$ of
the grid, possibly repeated across hyperedges, and carries the unnormalized
vector $|c\rangle = \sum_i |v_i\rangle$ — no relative minus sign, unlike the
edges of a plain
[grid state][bound_entangled.cm_otimes_cn.grid_state.grid_state]. The state is
the trace-normalized sum over every hyperedge:

$$
\rho = \frac{\sum_{c} |c\rangle\langle c|}{\operatorname{tr}\big(\sum_{c} |c\rangle\langle c|\big)} .
$$

`sn3_grid_state()` is this construction on the $5 \times 5$ grid with the 13
hyperedges of Fig. 2 of the paper:

- five single-vertex loops at $(0,0)$, $(1,0)$, $(0,1)$, $(4,1)$ and $(1,4)$;
- two double loops, the vertices $(3,2)$ and $(2,3)$, each listed twice and so
  carrying twice the weight of a single loop;
- three two-vertex edges $\{(1,2), (3,4)\}$, $\{(2,1), (4,3)\}$ and
  $\{(2,2), (3,3)\}$, each carrying $|ij\rangle + |kl\rangle$;
- one three-vertex hyperedge $\{(0,2), (1,1), (2,0)\}$, carrying
  $|02\rangle + |11\rangle + |20\rangle$.

Appendix B of the paper proves that the component of the three-vertex hyperedge
cannot be spanned by Schmidt rank 2 vectors in the range of the state, which is
what makes the Schmidt number 3.

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

from bound_entangled.cm_otimes_cn.generalized_grid_state import generalized_grid_state


def sn3_grid_state():
    """The smallest known Schmidt number 3 PPT bound entangled state, in 5x5.

    Returns:
        np.ndarray: the Schmidt number 3 (SN3) generalized grid state rho_5,5.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = sn3_grid_state()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[5, 5])
        True
        >>> sep, _ = is_separable(state, dim=[5, 5])
        >>> sep
        False
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
