from toqito.rand import random_density_matrix
from toqito.state_props import is_ppt
import numpy as np


def random_NPT(m_n: tuple[int, int]) -> np.ndarray:
    """A uniformly random density matrix with a non-positive partial transpose (rejection sampling).

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system.

    Returns:
        np.ndarray: a random NPT (hence necessarily entangled) density matrix.
    """
    m, n = m_n
    while True:
        rho = random_density_matrix(m * n)
        if not is_ppt(rho, dim=[m, n]):
            return rho


def random_PPT(m_n: tuple[int, int]) -> np.ndarray:
    """A uniformly random density matrix with a positive partial transpose (rejection sampling).

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system.

    Returns:
        np.ndarray: a random PPT density matrix.
    """
    m, n = m_n
    while True:
        rho = random_density_matrix(m * n)
        if is_ppt(rho, dim=[m, n]):
            return rho


def random_PPT_close_to_the_PPT_edge(m_n, precision: int) -> np.ndarray:
    """A random PPT state close to the boundary of the PPT set.

    Obtained by bisecting the segment between a random PPT and a random NPT
    state: at each step the midpoint replaces whichever endpoint is on its
    own side, halving the distance to the PPT/NPT boundary.

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system.
        precision: number of bisection steps.

    Returns:
        np.ndarray: a PPT density matrix close to the PPT boundary.
    """
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
