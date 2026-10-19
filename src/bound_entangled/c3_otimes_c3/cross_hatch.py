r"""The cross-hatch grid state on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

The cross-hatch state is the $3 \times 3$ instance of the
[quantum grid state][bound_entangled.cm_otimes_cn.grid_state.grid_state]
construction that is bound entangled. Its entanglement is detected by the CCNR
(realignment) criterion.

# Definition

A grid state is built from a graph whose vertices are the product basis states
$|i\rangle \otimes |j\rangle$ of $\mathbb{C}^m \otimes \mathbb{C}^n$ and whose
edges pair up vertices. An edge joining $(i, j)$ and $(k, l)$ carries the pure
state

$$
|e\rangle = \tfrac{1}{\sqrt 2}\,\big(|ij\rangle - |kl\rangle\big),
$$

and the grid state is the uniform mixture over the edge set $E$:

$$
\rho = \frac{1}{|E|} \sum_{e \in E} |e\rangle\langle e|.
$$

The cross-hatch state is this construction on the $3 \times 3$ grid with the
four edges (as listed in Appendix C1 of Imai et al.)

$$
\{(0,0), (1,2)\},\quad \{(1,0), (2,2)\},\quad \{(0,1), (2,0)\},\quad \{(0,2), (2,1)\}.
$$

Every vertex is used at most once, so the four edge states are mutually
orthogonal.

# References

- Joshua Lockhart, Otfried Gühne and Simone Severini, "Entanglement properties
  of quantum grid states", *Phys. Rev. A* **97**, 062340 (2018).
  [arXiv:1705.09261](https://arxiv.org/abs/1705.09261) ·
  [doi:10.1103/PhysRevA.97.062340](https://doi.org/10.1103/PhysRevA.97.062340)
- Satoya Imai, Nikolai Wyderka, Andreas Ketterer and Otfried Gühne, "Bound
  entanglement from randomized measurements", *Phys. Rev. Lett.* **126**,
  150501 (2021). [arXiv:2010.08372](https://arxiv.org/abs/2010.08372) ·
  [doi:10.1103/PhysRevLett.126.150501](https://doi.org/10.1103/PhysRevLett.126.150501)
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
