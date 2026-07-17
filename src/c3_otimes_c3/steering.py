import numpy as np
from math import sqrt
from utils import ketbra


def steering_state(m1: float, m2: float) -> np.ndarray:
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

    return lambda1 * ketbra(psi_1, psi_1) + lambda2 * ketbra(psi_2, psi_2) + lambda3 * (ketbra(psi_3, psi_3) + ketbra(psi_t_3, psi_t_3))
