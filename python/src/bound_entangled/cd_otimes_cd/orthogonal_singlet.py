"""https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101 as PPT singlets.
ρ_F2 from Phys. Rev. Research 3, 023101 (2021) — the "second family" of
PPT singlets, reverse-engineered from Tóth & Vértesi, PRL 120, 020506 (2018).
Port of BES_metro.m from the QUBIT4MATLAB package."""

from math import sqrt, log2
import numpy as np
from toqito.matrix_ops import tensor
from bound_entangled.utils import ketbra


def ket_i(d: int, i: int):
    ket = np.zeros(d, dtype=np.complex128)
    ket[i] = 1
    return ket


def basis(shield_dim: int, i: int, j: int, k: int, l: int):
    """basis vector |i j k l> in C^2 ⊗ C^2 ⊗ C^d ⊗ C^d"""
    assert i <= 1 and j <= 1
    return tensor(ket_i(2, i), ket_i(2, j), ket_i(shield_dim, k), ket_i(shield_dim, l))


def _build_Q_matrices(d: int) -> np.ndarray:
    """Orthogonal matrices Q^k from Appendix G. Returns shape (d, d, d)
    with Q[k] = Q^k.  d must be 3 or a power of 2."""
    if d == 3:
        Q = np.zeros((3, 3, 3), dtype=np.complex128)
        for k in range(3):
            phi = 2 * np.pi * (k + 1) / 3
            c, s = np.cos(phi), np.sin(phi)
            Q[k] = np.array([[c, s, 0], [s, -c, 0], [0, 0, 1]], dtype=np.complex128)
        return Q

    if d >= 2 and (d & (d - 1)) == 0:
        n = int(round(log2(d)))
        X = np.array([[0, 1], [1, 0]], dtype=np.complex128)
        I2 = np.eye(2, dtype=np.complex128)
        Q = np.zeros((d, d, d), dtype=np.complex128)
        for k in range(d):
            bits = format(k, f"0{n}b")
            factors = [X if b == "1" else I2 for b in bits]
            Pk = factors[0]
            for f in factors[1:]:
                Pk = np.kron(Pk, f)
            Q[k] = Pk
        return Q

    raise ValueError("d must be 3 or a power of 2 (so D = 2d ∈ {4, 6, 8, 16, ...}).")


def _build_sk_vectors(Q: np.ndarray, d: int):
    """The |s_k> vectors on A'B' that pair with |01>_AB in sum2.
    For d = 3 the paper hard-codes them (Eqs. G4-G5, symmetric partners of |t_k>);
    for d = 2^n we take |s_k> = |t_k> per Eq. G16."""
    if d == 3:
        e = [ket_i(d, i) for i in range(d)]
        s0 = (tensor(e[0], e[0]) + tensor(e[1], e[1])) / sqrt(2)
        s1 = (tensor(e[0], e[1]) - tensor(e[1], e[0])) / sqrt(2)
        s2 = tensor(e[2], e[2])
        return [s0, s1, s2]

    sk = []
    for k in range(d):
        t = np.zeros(d * d, dtype=np.complex128)
        for i in range(d):
            for j in range(d):
                if Q[k, i, j] != 0:
                    t = t + Q[k, i, j] * tensor(ket_i(d, i), ket_i(d, j))
        sk.append(t / sqrt(d))
    return sk


def orthogonal_singlet(*, shield_dim: int) -> np.ndarray:
    """Construct the ρ_F2 (second-family) PPT singlet on C^{2d} ⊗ C^{2d}.

    Reverse-engineered from Tóth & Vértesi, PRL 120, 020506 (2018) and
    presented as ρ_F2 in Phys. Rev. Research 3, 023101 (2021).  The state is
    bound entangled for every valid shield_dim.  The returned matrix is in
    ABA'B' ordering (two-qubit pair AB, shield pair A'B').

    Args:
        shield_dim: shield subsystem dimension d.  Must be 3 or a power of 2
            (equivalently, total local dimension 2d ∈ {4, 6, 8, 16, …}).

    Returns:
        np.ndarray: (4d²) × (4d²) density matrix of the ρ_F2 bound-entangled state.

    Raises:
        ValueError: If shield_dim is not 3 or a power of 2.
    """
    d = shield_dim
    p1 = sqrt(d) / (1 + sqrt(d))
    p2 = 1 - p1

    Q = _build_Q_matrices(d)
    sk_vecs = _build_sk_vectors(Q, d)

    sum1 = np.zeros((4 * d * d, 4 * d * d), dtype=np.complex128)
    for i in range(d):
        for j in range(d):
            z = basis(d, 0, 0, i, j) / sqrt(2)
            for k in range(d):
                if Q[j, i, k] != 0:
                    z = z + (Q[j, i, k] / sqrt(2)) * basis(d, 1, 1, j, k)
            sum1 = sum1 + ketbra(z)

    ab01 = np.zeros(4, dtype=np.complex128)
    ab01[1] = 1.0
    sum2 = np.zeros((4 * d * d, 4 * d * d), dtype=np.complex128)
    for k in range(d):
        sum2 = sum2 + np.kron(ketbra(ab01), ketbra(sk_vecs[k]))

    sum3 = np.zeros((4 * d * d, 4 * d * d), dtype=np.complex128)
    for i in range(d):
        v = basis(d, 1, 0, i, i)
        sum3 = sum3 + ketbra(v)

    return (p1 / d**2) * sum1 + (p2 / (2 * d)) * sum2 + (p2 / (2 * d)) * sum3
