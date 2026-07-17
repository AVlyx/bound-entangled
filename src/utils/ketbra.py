import numpy as np


def ketbra(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    return ketbra(a, b.conj())
