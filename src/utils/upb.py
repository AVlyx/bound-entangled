import numpy as np
from utils import ketbra


def upb(basis: list[np.ndarray]) -> np.ndarray:
    d_total: int = basis[0].shape[0]
    rho = np.identity(d_total)
    for i in range(len(basis)):
        rho -= ketbra(basis[i], basis[i])
    return rho / (d_total - len(basis))
