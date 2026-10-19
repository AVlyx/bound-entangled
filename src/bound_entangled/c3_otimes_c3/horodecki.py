r"""The 3 ⊗ 3 Horodecki state on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

The two-qutrit member of the Horodecki family, introduced in the same paper as
the [Horodecki $\mathbb{C}^2 \otimes \mathbb{C}^4$][bound_entangled.c2_otimes_c4.horodecki.horodecki]
state and one of the first known examples of bound entanglement.

# Definition

With $\{e_1, e_2, e_3\}$ the standard basis of $\mathbb{C}^3$ and
$P_\varphi = |\varphi\rangle\langle\varphi|$, Section IV A of the paper sets

$$
\begin{aligned}
Q &= \mathbb{1} \otimes \mathbb{1} - \Big(\sum_{i=1}^{3} P_{e_i} \otimes P_{e_i} + P_{e_3} \otimes P_{e_1}\Big), \\
|\Psi\rangle &= \tfrac{1}{\sqrt 3}\,(e_1 \otimes e_1 + e_2 \otimes e_2 + e_3 \otimes e_3), \\
|\Phi_a\rangle &= e_3 \otimes \Big(\sqrt{\tfrac{1+a}{2}}\, e_1 + \sqrt{\tfrac{1-a}{2}}\, e_3\Big),
\end{aligned}
$$

and mixes the entangled $\rho_{\text{insep}} = \tfrac38 P_\Psi + \tfrac18 Q$ with
the product state $P_{\Phi_a}$,

$$
\rho(a) = \frac{8a}{8a+1}\,\rho_{\text{insep}} + \frac{1}{8a+1}\,P_{\Phi_a},
$$

which in the computational basis reads (Eqs. (1)–(2) of Chruściński and
Kossakowski)

$$
\rho(a) = \frac{1}{8a+1}
\begin{pmatrix}
a & 0 & 0 & 0 & a & 0 & 0 & 0 & a \\
0 & a & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & a & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & a & 0 & 0 & 0 & 0 & 0 \\
a & 0 & 0 & 0 & a & 0 & 0 & 0 & a \\
0 & 0 & 0 & 0 & 0 & a & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & \frac{1+a}{2} & 0 & \frac{\sqrt{1-a^2}}{2} \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & a & 0 \\
a & 0 & 0 & 0 & a & 0 & \frac{\sqrt{1-a^2}}{2} & 0 & \frac{1+a}{2}
\end{pmatrix}.
$$

The state is PPT for every $a \in [0, 1]$, entangled for every $0 < a < 1$, and
separable at the endpoints $a = 0$ and $a = 1$. The product state $P_{\Phi_a}$
masks the entanglement of $\rho_{\text{insep}}$ from the partial-transpose test
without destroying it.

# References

- Paweł Horodecki, "Separability criterion and inseparable mixed states with
  positive partial transposition", *Phys. Lett. A* **232**, 333–339 (1997).
  [arXiv:quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) ·
  [doi:10.1016/S0375-9601(97)00416-7](https://doi.org/10.1016/S0375-9601(97)00416-7)
- Dariusz Chruściński and Andrzej Kossakowski, "On the symmetry of the seminal
  Horodecki state", *Phys. Lett. A* **375**, 434–436 (2011).
  [arXiv:1009.4385](https://arxiv.org/abs/1009.4385) ·
  [doi:10.1016/j.physleta.2010.11.069](https://doi.org/10.1016/j.physleta.2010.11.069)
"""

import numpy as np


def horodecki(a: float) -> np.ndarray:
    """The 3x3 Horodecki state.

    Args:
        a: free real parameter in [0, 1]. The state is PPT for every
            value in this range, and separable only at a = 0 or 1.

    Returns:
        np.ndarray: the 3x3 Horodecki density matrix.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = horodecki(0.5)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    if not 0 <= a <= 1:
        raise ValueError(f"a must lie in [0, 1], got {a}")
    b = (1 + a) / 2
    c = np.sqrt(1 - a**2) / 2
    return np.array(
        [
            [a, 0, 0, 0, a, 0, 0, 0, a],
            [0, a, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, a, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, a, 0, 0, 0, 0, 0],
            [a, 0, 0, 0, a, 0, 0, 0, a],
            [0, 0, 0, 0, 0, a, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, b, 0, c],
            [0, 0, 0, 0, 0, 0, 0, a, 0],
            [a, 0, 0, 0, a, 0, c, 0, b],
        ]
    ) / (8 * a + 1)
