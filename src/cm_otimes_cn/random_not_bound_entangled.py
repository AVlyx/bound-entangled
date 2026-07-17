from toqito.rand import random_density_matrix
from toqito.state_props import is_ppt
import numpy as np


def random_NPT(m_n: tuple[int, int]) -> np.ndarray:
    m, n = m_n
    while True:
        rho = random_density_matrix(m * n)
        if not is_ppt(rho, dim=[m, n]):
            return rho


def random_PPT(m_n: tuple[int, int]) -> np.ndarray:
    m, n = m_n
    while True:
        rho = random_density_matrix(m * n)
        if is_ppt(rho, dim=[m, n]):
            return rho


def random_PPT_close_to_the_PPT_edge(m_n, precision: int) -> np.ndarray:
    m, n = m_n
    ppt: np.ndarray = random_PPT(m_n)
    not_ppt: np.ndarray = random_NPT(m_n)

    for _ in range(precision):
        temp = (ppt + not_ppt) / 2
        if is_ppt(temp, dim=[m, n]):
            ppt = temp
        else:
            not_ppt = temp
    return ppt / np.trace(ppt)
