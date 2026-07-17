import numpy as np
from utils import upb


def pyramid_basis():
    h = 0.5 * np.sqrt(1 + np.sqrt(5))
    vecs = []
    for j in range(5):
        a = np.array([np.cos(2 * np.pi * j / 5), np.sin(2 * np.pi * j / 5), h])
        b = np.array([np.cos(4 * np.pi * j / 5), np.sin(4 * np.pi * j / 5), h])
        a /= np.linalg.norm(a)
        b /= np.linalg.norm(b)
        vecs.append(np.kron(a, b).reshape(-1, 1))
    return vecs


def pyramid_upb() -> np.ndarray:
    return upb(pyramid_basis())
