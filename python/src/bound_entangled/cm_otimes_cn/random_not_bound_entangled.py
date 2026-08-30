from toqito.rand import random_density_matrix
from toqito.state_props import is_ppt
import numpy as np


def random_NPT(m_n: tuple[int, int]) -> np.ndarray:
    """A uniformly random density matrix with a non-positive partial transpose (rejection sampling).

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system.

    Returns:
        np.ndarray: a random NPT (hence necessarily entangled) density matrix.

    Examples:
        The rejection sampling makes both properties true of every draw, so no
        seed is needed.  Being NPT, the state is distillable — it is *not*
        bound entangled.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt
        >>> state = random_NPT((2, 2))
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 2])
        False
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

    Examples:
        In 2 (x) 2 the total dimension is 4, so PPT implies separable
        (Horodecki 1996) — the draw is not bound entangled either.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = random_PPT((2, 2))
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 2])
        True
        >>> sep, _ = is_separable(state, dim=[2, 2])
        >>> sep
        True
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

    Examples:
        Bisection only ever keeps the PPT endpoint, so the result is PPT for
        every draw and every precision.

        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt
        >>> state = random_PPT_close_to_the_PPT_edge((2, 3), 20)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[2, 3])
        True
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
