"""https://arxiv.org/abs/1705.09261"""

import numpy as np
from math import sqrt
from utils import ketbra


def ket(m_n: tuple[int, int], ij: tuple[int, int]):
    m, n = m_n
    i, j = ij
    z = np.zeros(m * n)
    if i >= m or j >= n:
        raise IndexError(f"Vertex ({i},{j}) does not  belong to the graph, m={m}, n={n}")
    z[i * n + j] = 1
    return z


def grid_component(m_n: tuple[int, int], ij: tuple[int, int], kl: tuple[int, int]) -> np.ndarray:
    return 1 / sqrt(2) * (ket(m_n, ij) - ket(m_n, kl))


def grid_state(m_n: tuple[int, int], *edges: tuple[tuple[int, int], tuple[int, int]]) -> np.ndarray:
    m, n = m_n
    ret = np.zeros((m * n, m * n))
    for ij, kl in edges:
        gc = grid_component(m_n, ij, kl)
        ret += ketbra(gc, gc)
    ret /= len(edges)
    return ret
