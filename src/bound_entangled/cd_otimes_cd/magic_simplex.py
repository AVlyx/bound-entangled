from toqito.states import basis, max_entangled
from bound_entangled.utils import ketbra
import numpy as np


def _weyl_heisenberg_operator(d: int, k: int, l: int):
    """https://arxiv.org/pdf/2406.13491 def 2.9"""
    omegas = np.exp(2j * np.pi * np.arange(d) / d)
    j = np.arange(d)
    ret = np.zeros((d, d), dtype=np.complex128)
    ret[j, (j + l) % d] = omegas[(j * k) % d]
    return ret


def _bell_state(d: int, k: int, l: int) -> np.ndarray:
    r"""The bell state \Omega_{k,l} from https://arxiv.org/pdf/2406.13491 def 2.10"""
    bell00 = max_entangled(d)
    w_kl = _weyl_heisenberg_operator(d, k, l)
    return np.kron(w_kl, np.identity(d)) @ bell00


def magic_simplex(d: int, cs: np.ndarray) -> np.ndarray:
    r"""A state from the magic simplex depending on the mixing probabilities cs

    The set \Epsilon_d defined when c_kl \in \[0, \frac{1}{d}\] contains all the PPT states but also some non-PPT states.

    Args:
        d (int): Local dimensions
        cs (np.ndarray): Mixing probabilities

    Raises:
        ValueError: If the mixing probabilities are not probabilities or of the incorrect shape

    Returns:
        np.ndarray: the state from the Magic Simplex
    """
    if not cs.shape == (d, d):
        raise ValueError(f"Mixing probabilities cs have the wrong shape {cs.shape}, expected {(d,d)}")
    if not np.isclose(cs.sum(), 1.0):
        raise ValueError(f"Mixing probabilities cs should sum to 1, got {cs.sum()}")
    if not np.all(cs >= 0):
        raise ValueError(f"Mixing probabilities cs should be positive")

    ret: np.ndarray = np.zeros((d, d), dtype=np.complex128)
    for k in range(d):
        for l in range(d):
            ret += cs[k, l] * ketbra(_bell_state(d, k, l))
    return ret
