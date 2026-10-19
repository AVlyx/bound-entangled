r"""The Horodecki state generalized to $\mathbb{C}^2 \otimes \mathbb{C}^d$.

A direct generalization of the
[Horodecki $\mathbb{C}^2 \otimes \mathbb{C}^4$][bound_entangled.c2_otimes_c4.horodecki.horodecki]
state to $\mathbb{C}^2 \otimes \mathbb{C}^d$, introduced by Tura et al. as the
starting point for their four-qubit PPT entangled symmetric states. It mixes an
entangled component built from a chain of $d - 1$ two-term vectors with a single
product vector, in proportions set by the parameter $b$.

# Definition

The entangled part mixes the $d - 1$ vectors
$|\Psi_i\rangle = \tfrac{1}{\sqrt 2}\,(|0, i\rangle + |1, i+1\rangle)$,
$i = 0, \dots, d-2$, with the corner state $|1, 0\rangle$ (Eq. (4) of the
paper):

$$
\rho^d_{\text{insep}} = \frac{2}{2d - 1} \sum_{i=0}^{d-2} |\Psi_i\rangle\langle\Psi_i| + \frac{1}{2d - 1}\,|1, 0\rangle\langle 1, 0| .
$$

The separable part is the product vector

$$
|\Phi_b\rangle = \tfrac{1}{\sqrt 2}\,|0\rangle \otimes \big(\sqrt{1 - b}\,|0\rangle + \sqrt{1 + b}\,|d - 1\rangle\big),
$$

and the state is the weighted mixture (Eq. (5))

$$
\rho_{d,b} = \frac{(2d - 1)\,b\,\rho^d_{\text{insep}} + |\Phi_b\rangle\langle\Phi_b|}{(2d - 1)\,b + 1},
\qquad 0 \le b \le 1 .
$$

The state is PPT for every $d \ge 2$ and $b \in [0, 1]$: its partial transpose
is the state conjugated by an anti-diagonal unitary. It is PPT entangled for
$d \ge 4$ and $b \in (0, 1)$, and separable at $b = 0$, at $b = 1$, and for
$d = 2, 3$. For $d = 4$ it gives the original
$\mathbb{C}^2 \otimes \mathbb{C}^4$ Horodecki state; in this library's
conventions the two agree up to an anti-diagonal transpose, which is pinned by
a doctest.

# References

- J. Tura, R. Augusiak, P. Hyllus, M. Kuś, J. Samsonowicz and M. Lewenstein,
  "Four-qubit entangled symmetric states with positive partial
  transpositions", *Phys. Rev. A* **85**, 060302 (R) (2012).
  [arXiv:1203.3711](https://arxiv.org/abs/1203.3711) ·
  [doi:10.1103/PhysRevA.85.060302](https://doi.org/10.1103/PhysRevA.85.060302)
- Paweł Horodecki, "Separability criterion and inseparable mixed states with
  positive partial transposition", *Phys. Lett. A* **232**, 333–339 (1997).
  [arXiv:quant-ph/9703004](https://arxiv.org/abs/quant-ph/9703004) ·
  [doi:10.1016/S0375-9601(97)00416-7](https://doi.org/10.1016/S0375-9601(97)00416-7)
"""

from bound_entangled.utils import ketbra
import numpy as np
from math import sqrt


def ket_ij(dims: tuple[int, int], i: int, j: int) -> np.ndarray:
    d1, d2 = dims
    ret = np.zeros(d1 * d2, dtype=np.float64)
    ret[i * d2 + j] = 1
    return ret


def ket_i(d: int, i: int) -> np.ndarray:
    ret = np.zeros(d, dtype=np.float64)
    ret[i] = 1
    return ret


def psi_i(d: int, i: int) -> np.ndarray:
    one_sqrt_2 = 1 / sqrt(2)
    return one_sqrt_2 * (ket_ij((2, d), 0, i) + ket_ij((2, d), 1, i + 1))


def rho_insep_d(d: int) -> np.ndarray:
    psi_is = 2 / (2 * d - 1) * sum([ketbra(psi_i(d, i)) for i in range(d - 1)])
    one_zero = (1 / (2 * d - 1)) * ketbra(ket_ij((2, d), 1, 0))
    return psi_is + one_zero


def phi_b(d: int, b: float) -> np.ndarray:
    zero = 1 / sqrt(2) * ket_i(2, 0)
    one_m_b_zero = sqrt(1 - b) * ket_i(d, 0)
    one_p_b_d_m_one = sqrt(1 + b) * ket_i(d, d - 1)
    return np.kron(zero, one_m_b_zero + one_p_b_d_m_one)


def horodecki_2_by_d_generalized(*, second_dim_d: int, b: float) -> np.ndarray:
    """Generalization of the C^2 ⊗ C^4 horodecki state.

    For d = 4 it is equivalent to the C^2 ⊗ C^4 Horodecki state
    (`c2_otimes_c4.horodecki`) up to an anti-diagonal transpose.

    Args:
        second_dim_d (int): second dimension d. The full dimension of the system is 2*d
        b (float): free real parameter in [0, 1]. The state is PPT for every
            d >= 2 and b in [0, 1], and PPT entangled for d >= 4 and b in (0, 1);
            it is separable at b = 0, b = 1 and for d = 2, 3.

    Returns:
        np.ndarray: the generalized horodecki state

    Examples:
        No sufficient separability criterion settles a 2xd PPT state for d >= 4,
        so ``is_separable`` falls through to the DPS symmetric-extension SDP and
        takes roughly ten seconds here.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = horodecki_2_by_d_generalized(second_dim_d=4, b=0.5)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 4])
        True
        >>> sep, _ = is_separable(state, dim=[2, 4])
        >>> sep
        False

        At d = 4 the state matches the C^2 (x) C^4 Horodecki state under an
        anti-diagonal transpose:

        >>> import numpy as np
        >>> from bound_entangled.c2_otimes_c4.horodecki import horodecki
        >>> bool(np.allclose(state, np.flip(horodecki(0.5)).T))
        True

        At d = 3 the total dimension is 6, where PPT already implies separable
        (Horodecki 1996), so the state is not bound entangled:

        >>> sep, _ = is_separable(horodecki_2_by_d_generalized(second_dim_d=3, b=0.5), dim=[2, 3])
        >>> sep
        True
    """
    return ((2 * second_dim_d - 1) * b * rho_insep_d(second_dim_d) + ketbra(phi_b(second_dim_d, b))) / ((2 * second_dim_d - 1) * b + 1)
