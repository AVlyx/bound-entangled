"""https://arxiv.org/pdf/1203.3711"""

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
    """Generalization of the C^2 ⊗ C^4 horodecki state
    for d = 4, it is equivalent to the C^2 ⊗ C^4 horodecki state from toqito up to an anti-diagonal transpose

    assert np.allclose(horodecki_2_by_d_generalized(second_dim_d=4, b=b), np.flip(horodecki(b)).T)

    Args:
        second_dim_d (int): second dimension d. The full dimension of the system is 2*d
        b (float): parameter d

    Returns:
        np.ndarray: the generalized horodecki state
    """
    return ((2 * second_dim_d - 1) * b * rho_insep_d(second_dim_d) + ketbra(phi_b(second_dim_d, b))) / ((2 * second_dim_d - 1) * b + 1)
