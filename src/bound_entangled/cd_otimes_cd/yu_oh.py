r"""The Yu–Oh family of nonlocal bound entangled states on $\mathbb{C}^d \otimes \mathbb{C}^d$.

A family of bound entangled states on $\mathbb{C}^d \otimes \mathbb{C}^d$
($d \ge 3$), parametrized by two real numbers $x$ and $y$, that violate a Bell
inequality despite being PPT.

# Definition

The construction uses the antisymmetric vectors
$|\psi_{ij}\rangle = |ij\rangle - |ji\rangle$, and a family of $d$ unit vectors
$\theta_1, \dots, \theta_d$ built by induction on the dimension, which sum to
zero. From these, for $k = 1, \dots, d - 1$,

$$
|\varphi_k\rangle = \frac{(d-1)^{3/2}}{d\sqrt{d-2}} \sum_p \theta_p(k)\,|\theta_p\rangle \otimes |\theta_p\rangle,
$$

which is symmetric under swapping the two factors. With
$z = \sqrt{1 - x^2 - y^2}$ it combines with $x$ and $y$ into

$$
|\psi_k\rangle = x\,|0, k\rangle + y\,|k, 0\rangle + z\,|\varphi_k\rangle .
$$

The state is

$$
\rho = \frac{xy}{R}\,|\Phi_d\rangle\langle\Phi_d|
     + \frac{\delta}{R} \sum_{1 \le j < i < d} |\psi_{ij}\rangle\langle\psi_{ij}|
     + \frac{1}{R} \sum_{k=1}^{d-1} |\psi_k\rangle\langle\psi_k|,
$$

with $|\Phi_d\rangle = \sum_i |ii\rangle$ the unnormalized maximally entangled
vector, $\delta = z^2/(d-2) - xy$ and $R = d\,xy + (d-1)(d-2)\,\delta + d - 1$.
$(x, y)$ must satisfy $x^2 + y^2 \le 1$ and $\delta > 0$, which
`is_valid_yu_oh_input` checks.

# References

- Sixia Yu and C. H. Oh, "Family of nonlocal bound entangled states", *Phys.
  Rev. A* **95**, 032111 (2017).
  [arXiv:1509.08991](https://arxiv.org/abs/1509.08991) ·
  [doi:10.1103/PhysRevA.95.032111](https://doi.org/10.1103/PhysRevA.95.032111)
"""

from toqito.states import max_entangled
import numpy as np
from math import sqrt
from bound_entangled.utils import ketbra


def psi_ij(d: int, i: int, j: int):
    """The antisymmetric basis vector |ij> - |ji> of C^d (x) C^d.

    Args:
        d: local dimension.
        i: first index, 0 <= i < d.
        j: second index, 0 <= j < d.

    Returns:
        np.ndarray: the (unnormalized) vector |ij> - |ji>.
    """
    ket = np.zeros(d * d)
    ket[i * d + j] = 1
    ket[j * d + i] = -1
    return ket


def teta_d_gen(d: int):
    """Generate the family of vectors {theta_p} used to build phi_k, by induction on the dimension.

    Args:
        d: local dimension.

    Returns:
        list[np.ndarray]: the d-1 vectors theta_p in C^d.
    """
    Teta_d = [
        np.array([0.0, 1.0] + [0.0] * (d - 2)),
        np.array([0.0, -1.0] + [0.0] * (d - 2)),
    ]
    for di in range(3, d + 1):
        ket_dm1 = np.zeros(d, dtype=np.float64)
        ket_dm1[di - 1] = 1.0
        sqrtddm2 = sqrt(di * (di - 2))
        Teta_d_new = [(sqrtddm2 * teta_p - ket_dm1) / (di - 1) for teta_p in Teta_d]
        Teta_d = Teta_d_new + [ket_dm1]
    return Teta_d


def phi_k(d: int, k: int):
    """Helper vector phi_k used in the construction of the Yu-Oh state.

    Args:
        d: local dimension.
        k: index, 1 <= k < d.

    Returns:
        np.ndarray: the vector phi_k in C^d (x) C^d.
    """
    ret = np.zeros(d**2, dtype=np.float64)
    for teta_p in teta_d_gen(d):
        innerprod = teta_p[k]
        ret += np.kron(teta_p, teta_p) * innerprod
    ret *= ((d - 1) ** (3 / 2)) / (d * sqrt(d - 2))
    return ret


def psi_k(d: int, k: int, x: float, y: float, z: float):
    """Helper vector psi_k used in the construction of the Yu-Oh state.

    Args:
        d: local dimension.
        k: index, 1 <= k < d.
        x: first free parameter of the Yu-Oh state.
        y: second free parameter of the Yu-Oh state.
        z: sqrt(1 - x**2 - y**2).

    Returns:
        np.ndarray: the vector psi_k in C^d (x) C^d.
    """
    ret: np.ndarray = np.zeros(d**2)
    ret[k] = x
    ret[k * d] = y
    ret += z * phi_k(d, k)
    return ret


def yu_oh(*, full_dim: int, x: float, y: float):
    """The Yu-Oh nonlocal bound entangled state, for local dimension d >= 3.

    A family of PPT entangled states in C^d (x) C^d, parametrized by (x, y),
    that violate a Bell inequality (hence are nonlocal despite being bound
    entangled). See `is_valid_yu_oh_input` for the validity domain of (x, y).

    Args:
        full_dim: local dimension, d >= 3.
        x: first free parameter.
        y: second free parameter.

    Returns:
        np.ndarray: the Yu-Oh bound entangled state.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = yu_oh(full_dim=3, x=0.5, y=0.1)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    if not is_valid_yu_oh_input(full_dim, x, y):
        raise ValueError(f"Invalid input for Yu_Oh state (x={x}, y={y})")
    z = sqrt(1 - x**2 - y**2)
    delta = z**2 / (full_dim - 2) - x * y
    R = full_dim * x * y + (full_dim - 1) * (full_dim - 2) * delta + full_dim - 1

    max_ent_ket: np.ndarray = max_entangled(full_dim) * sqrt(full_dim)  # type: ignore
    ret = x * y / R * ketbra(max_ent_ket)

    psi_ij_sum = np.zeros((full_dim**2, full_dim**2))
    for j in range(1, full_dim - 1):
        for i in range(j + 1, full_dim):
            psi_ij_val = psi_ij(full_dim, i, j)
            psi_ij_sum += ketbra(psi_ij_val)
    ret += delta / R * psi_ij_sum

    psi_k_sum = np.zeros((full_dim**2, full_dim**2))
    for k in range(1, full_dim):
        psi_k_val = psi_k(full_dim, k, x, y, z)
        psi_k_sum += ketbra(psi_k_val)
    ret += psi_k_sum / R
    return ret


def is_valid_yu_oh_input(full_dim: int, x: float, y: float) -> bool:
    """Whether (x, y) lie in the valid parameter domain for `yu_oh`.

    Args:
        full_dim: local dimension.
        x: first free parameter.
        y: second free parameter.

    Returns:
        bool: True if x**2 + y**2 <= 1 and the resulting delta is positive.
    """
    if x**2 + y**2 > 1:
        return False
    z = sqrt(1 - x**2 - y**2)
    delta = z**2 / (full_dim - 2) - x * y
    if delta <= 0:
        return False
    return True
