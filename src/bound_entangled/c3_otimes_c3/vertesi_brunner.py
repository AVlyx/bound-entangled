r"""The Vértesi–Brunner state on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

Peres conjectured that a bound entangled state can never violate a Bell
inequality. In the words of Vértesi and Brunner's abstract, "In 1999, Peres
conjectured that Bell nonlocality is equivalent to distillability of
entanglement." They disproved it with the two-qutrit state below, which is PPT
— hence bound entangled — yet violates a Bell inequality.

# Definition

The state is given by its spectral decomposition
$\rho = \sum_i \lambda_i |\psi_i\rangle\langle\psi_i|$ with
$a = \sqrt{131/2}$ and

$$
\begin{aligned}
|\psi_1\rangle &= \tfrac{1}{\sqrt 2}\,(|00\rangle + |11\rangle), \\
|\psi_2\rangle &= \tfrac{a}{12}\,(|01\rangle + |10\rangle) + \tfrac{1}{60}\,|02\rangle - \tfrac{3}{10}\,|21\rangle, \\
|\psi_3\rangle &= \tfrac{a}{12}\,(|00\rangle - |11\rangle) + \tfrac{1}{60}\,|12\rangle + \tfrac{3}{10}\,|20\rangle, \\
|\psi_4\rangle &= \tfrac{1}{\sqrt 3}\,(-|01\rangle + |10\rangle + |22\rangle),
\end{aligned}
$$

with eigenvalues

$$
\lambda = \left(\tfrac{3257}{6884},\ \tfrac{450}{1721},\ \tfrac{450}{1721},\ \tfrac{27}{6884}\right).
$$

The state has rank 4. Its spectrum is the same as that of the
[steering state][bound_entangled.c3_otimes_c3.steering.steering_state] at
$m_1 = 1/60$, $m_2 = 3/10$, the parameter point that the "Note added" of
Moroder et al. points to.

# References

- Tamás Vértesi and Nicolas Brunner, "Disproving the Peres conjecture by
  showing Bell nonlocality from bound entanglement", *Nat. Commun.* **5**,
  5297 (2014). [arXiv:1405.4502](https://arxiv.org/abs/1405.4502) ·
  [doi:10.1038/ncomms6297](https://doi.org/10.1038/ncomms6297)
"""

import numpy as np
from math import sqrt
from bound_entangled.utils import ketbra


def basis3(i: int, j: int):
    a = np.zeros(3, dtype=np.float64)
    b = np.zeros(3, dtype=np.float64)
    a[i] = 1
    b[j] = 1
    return np.kron(a, b)


def vertesi_brunner() -> np.ndarray:
    """Construct the Vértesi-Brunner bound-entangled state on C^3 ⊗ C^3.

    A rank-4 PPT entangled state built from four explicit eigenvectors
    ``psi_1 … psi_4`` with eigenvalues from Nat. Commun. 5, 5297 (2014),
    which violates a Bell inequality despite being bound entangled.

    Returns:
        np.ndarray: 9×9 density matrix of the bound-entangled state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = vertesi_brunner()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    a = sqrt(131 / 2)
    psi_1 = 1 / sqrt(2) * (basis3(0, 0) + basis3(1, 1))
    psi_2 = a / 12 * (basis3(0, 1) + basis3(1, 0)) + 1 / 60 * basis3(0, 2) - 3 / 10 * basis3(2, 1)
    psi_3 = a / 12 * (basis3(0, 0) - basis3(1, 1)) + 1 / 60 * basis3(1, 2) + 3 / 10 * basis3(2, 0)
    psi_4 = 1 / sqrt(3) * (-basis3(0, 1) + basis3(1, 0) + basis3(2, 2))

    psi_i = [psi_1, psi_2, psi_3, psi_4]
    eigenvals = [3257 / 6884, 450 / 1721, 450 / 1721, 27 / 6884]
    return sum([eig * ketbra(psi) for psi, eig in zip(psi_i, eigenvals)])  # type: ignore
