r"""The 2 ⊗ 4 Horodecki state on $\mathbb{C}^2 \otimes \mathbb{C}^4$.

One of the two original examples of a PPT entangled state, introduced together
with the [Horodecki $\mathbb{C}^3 \otimes \mathbb{C}^3$][bound_entangled.c3_otimes_c3.horodecki.horodecki]
state. Since no PPT state can be distilled, it is bound entangled. With total
dimension 8, $\mathbb{C}^2 \otimes \mathbb{C}^4$ is the smallest space that
admits PPT entanglement: in $\mathbb{C}^2 \otimes \mathbb{C}^2$ and
$\mathbb{C}^2 \otimes \mathbb{C}^3$ every PPT state is separable.

# Definition

For $a \in [0, 1]$ the state is (Section IV B of the paper, where the parameter
is called $b$)

$$
\rho(a) = \frac{1}{7a+1}
\begin{pmatrix}
a & 0 & 0 & 0 & 0 & a & 0 & 0 \\
0 & a & 0 & 0 & 0 & 0 & a & 0 \\
0 & 0 & a & 0 & 0 & 0 & 0 & a \\
0 & 0 & 0 & a & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & \frac{1+a}{2} & 0 & 0 & \frac{\sqrt{1-a^2}}{2} \\
a & 0 & 0 & 0 & 0 & a & 0 & 0 \\
0 & a & 0 & 0 & 0 & 0 & a & 0 \\
0 & 0 & a & 0 & \frac{\sqrt{1-a^2}}{2} & 0 & 0 & \frac{1+a}{2}
\end{pmatrix}.
$$

Its partial transpose is unitarily equivalent to the state itself (Eq. (34) of
the paper), so it is PPT for every $a$. Horodecki proves it entangled for every
$0 < a < 1$; at the endpoints $a = 0$ and $a = 1$ it is separable, which Tura
et al. show for the whole $\mathbb{C}^2 \otimes \mathbb{C}^d$ family in their
Appendix B.
[Horodecki 2 ⊗ d][bound_entangled.cd_otimes_cd.horodecki_2_by_d_generalized.horodecki_2_by_d_generalized]
is that generalization.

# References

- Paweł Horodecki, "Separability criterion and inseparable mixed states with
  positive partial transposition", *Phys. Lett. A* **232**, 333–339 (1997).
  [arXiv:quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) ·
  [doi:10.1016/S0375-9601(97)00416-7](https://doi.org/10.1016/S0375-9601(97)00416-7)
- J. Tura, R. Augusiak, P. Hyllus, M. Kuś, J. Samsonowicz and M. Lewenstein,
  "Four-qubit entangled symmetric states with positive partial
  transpositions", *Phys. Rev. A* **85**, 060302 (R) (2012).
  [arXiv:1203.3711](https://arxiv.org/abs/1203.3711) ·
  [doi:10.1103/PhysRevA.85.060302](https://doi.org/10.1103/PhysRevA.85.060302)
"""

from toqito.states import horodecki as horodecki_toqito
import numpy as np


def horodecki(a: float) -> np.ndarray:
    """Construct the 2×4 Horodecki bound-entangled state (arXiv:quant-ph/9703004).

    One of the original examples of PPT entanglement, this state lives on
    C^2 ⊗ C^4 and is PPT for every ``a`` in [0, 1], yet entangled (and
    hence bound entangled) for every interior value ``a`` ∈ (0, 1).  At
    the endpoints the state is separable.

    Args:
        a: free real parameter in [0, 1].

    Returns:
        np.ndarray: 8×8 density matrix of the 2×4 Horodecki state.

    Examples:
        No sufficient separability criterion settles a 2x4 PPT state, so
        ``is_separable`` falls through to the DPS symmetric-extension SDP and
        takes roughly ten seconds here.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = horodecki(0.5)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 4])
        True
        >>> sep, _ = is_separable(state, dim=[2, 4])
        >>> sep
        False
    """
    return horodecki_toqito(a, dim=[2, 4])  # type: ignore
