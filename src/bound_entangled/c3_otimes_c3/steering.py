r"""The Moroder–Gittsovich–Huber–Gühne steering state on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

A two-parameter family of two-qutrit PPT states containing steerable bound
entangled states: a counterexample to the stronger Peres conjecture, which held
that bound entangled states cannot be used to demonstrate EPR steering.

# Definition

In the product basis $|ij\rangle$ of $\mathbb{C}^3 \otimes \mathbb{C}^3$, with
parameters $m_1, m_2 \ge 0$ and $m_3 = \sqrt{(1 - m_1^2 - m_2^2)/2}$
(Eqs. (16)–(17) of the paper):

$$
\begin{aligned}
|\psi_1\rangle &= \tfrac{1}{\sqrt 2}\,(|12\rangle + |21\rangle), \\
|\psi_2\rangle &= \tfrac{1}{\sqrt 3}\,(|00\rangle + |11\rangle - |22\rangle), \\
|\psi_3\rangle &= m_1|01\rangle + m_2|10\rangle + m_3\,(|11\rangle + |22\rangle), \\
|\tilde\psi_3\rangle &= m_1|02\rangle - m_2|20\rangle + m_3\,(|21\rangle - |12\rangle),
\end{aligned}
$$

combined as

$$
\rho = \lambda_1 |\psi_1\rangle\langle\psi_1| + \lambda_2 |\psi_2\rangle\langle\psi_2|
     + \lambda_3 \big(|\psi_3\rangle\langle\psi_3| + |\tilde\psi_3\rangle\langle\tilde\psi_3|\big).
$$

Making the state invariant under partial transposition fixes the weights
(Eqs. (18)–(19)): with $D = 4 - 2m_1^2 + m_1 m_2 - 2m_2^2$,

$$
\lambda_1 = 1 - \frac{2 + 3 m_1 m_2}{D}, \qquad
\lambda_3 = \frac{1}{D}, \qquad
\lambda_2 = 1 - \lambda_1 - 2\lambda_3 .
$$

The weights are non-negative only when $m_1^2 + m_2^2 + m_1 m_2 \le 1$. Within
that region every member is PPT; Fig. 2 of the paper shows where the family
violates their steering inequality.

# References

- Tobias Moroder, Oleg Gittsovich, Marcus Huber and Otfried Gühne, "Steering
  bound entangled states: A counterexample to the stronger Peres conjecture",
  *Phys. Rev. Lett.* **113**, 050404 (2014).
  [arXiv:1405.0262](https://arxiv.org/abs/1405.0262) ·
  [doi:10.1103/PhysRevLett.113.050404](https://doi.org/10.1103/PhysRevLett.113.050404)
"""

import numpy as np
from math import sqrt
from bound_entangled.utils import ketbra


def steering_state(m1: float, m2: float) -> np.ndarray:
    """A 3x3 bound entangled state that is steerable, parametrized by m1, m2.

    Counterexample to the (stronger) Peres conjecture that bound entangled
    states cannot be used to demonstrate EPR steering. The family is PPT by
    construction (Eqs. 16-19); Fig. 2 of the paper shows the parameter region
    where it violates their steering inequality.

    Args:
        m1: first free real parameter, m1 >= 0.
        m2: second free real parameter, m2 >= 0. The weights are non-negative,
            so the result is a state, only if m1**2 + m2**2 + m1*m2 <= 1.

    Returns:
        np.ndarray: the steerable bound entangled state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = steering_state(0.5, 0.5)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    m3 = sqrt((1 - m1**2 - m2**2) / 2)

    psi_1 = np.zeros(9, dtype=np.float64)
    psi_2 = np.zeros(9, dtype=np.float64)
    psi_3 = np.zeros(9, dtype=np.float64)
    psi_t_3 = np.zeros(9, dtype=np.float64)

    psi_1[1 * 3 + 2], psi_1[2 * 3 + 1] = 1 / sqrt(2), 1 / sqrt(2)
    psi_2[0], psi_2[1 * 3 + 1], psi_2[2 * 3 + 2] = 1 / sqrt(3), 1 / sqrt(3), -1 / sqrt(3)
    psi_3[1], psi_3[1 * 3], psi_3[1 * 3 + 1], psi_3[2 * 3 + 2] = m1, m2, m3, m3
    psi_t_3[2], psi_t_3[2 * 3], psi_t_3[2 * 3 + 1], psi_t_3[1 * 3 + 2] = m1, -m2, m3, -m3

    lambda1 = 1 - (2 + 3 * m1 * m2) / (4 - 2 * m1**2 + m1 * m2 - 2 * m2**2)
    lambda3 = 1 / (4 - 2 * m1**2 + m1 * m2 - 2 * m2**2)
    lambda2 = 1 - lambda1 - 2 * lambda3

    return lambda1 * ketbra(psi_1) + lambda2 * ketbra(psi_2) + lambda3 * (ketbra(psi_3) + ketbra(psi_t_3))
