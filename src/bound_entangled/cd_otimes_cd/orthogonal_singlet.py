r"""The orthogonal singlet $\rho_{F2}$ on $\mathbb{C}^{2d} \otimes \mathbb{C}^{2d}$.

The orthogonal singlet, $\rho_{F2}$, is the second family of PPT singlet-like
states of Pál, Tóth, Bene and Vértesi (Definition 2, Eq. (50)), obtained from
the states Tóth and Vértesi had found numerically. It uses the same two-branch
weighting as the
[Badziąg private singlet][bound_entangled.cd_otimes_cd.badziag_private_singlet.badziag_private_singlet],
with the Fourier phases replaced by a family of real orthogonal matrices. Unlike
$\rho_{F1}$, it is not invariant under partial transposition. The code is a port
of the `BES_metro.m` routine of QUBIT4MATLAB.

# Definition

As for the private singlet, the state lives on
$\mathbb{C}^2 \otimes \mathbb{C}^2 \otimes \mathbb{C}^d \otimes \mathbb{C}^d$ in
$ABA'B'$ order and mixes two branches with weights

$$
p_1 = \frac{\sqrt d}{1 + \sqrt d}, \qquad p_2 = 1 - p_1 .
$$

It is built from a family of $d$ real orthogonal $d \times d$ matrices $Q^k$
(Appendix G of the paper):

$$
\rho = \frac{p_1}{d^2} \sum_{ij} |z_{ij}\rangle\langle z_{ij}|
     + \frac{p_2}{2d} \sum_k |01\rangle\langle 01|_{AB} \otimes |s_k\rangle\langle s_k|_{A'B'}
     + \frac{p_2}{2d} \sum_i |10, ii\rangle\langle 10, ii|,
$$

where
$|z_{ij}\rangle = \tfrac{1}{\sqrt 2}\big(|00, ij\rangle + \sum_k Q^j_{ik}\,|11, jk\rangle\big)$
and the $|s_k\rangle$ live on the shield pair $A'B'$.

For $d = 3$ the $Q^k$ are reflections in the first two coordinates, with
$\varphi = 2\pi(k+1)/3$,

$$
Q^k = \begin{pmatrix} \cos\varphi & \sin\varphi & 0 \\ \sin\varphi & -\cos\varphi & 0 \\ 0 & 0 & 1 \end{pmatrix},
$$

and the $|s_k\rangle$ are fixed as $|s_0\rangle = (|00\rangle + |11\rangle)/\sqrt2$,
$|s_1\rangle = (|01\rangle - |10\rangle)/\sqrt2$, $|s_2\rangle = |22\rangle$.
For $d = 2^n$, $Q^k$ is the $n$-fold tensor product of Pauli $X$ and the
identity, one factor per bit of $k$ (Eq. (G6)), and
$|s_k\rangle = \tfrac{1}{\sqrt d}\sum_{ij} Q^k_{ij}\,|ij\rangle$ (Eq. (G16)).

!!! note "Subsystem order"

    The construction is naturally written in $ABA'B'$ order; the returned
    matrix is reordered to $AA'BB'$, so the physical
    Alice $= (A, A')$ | Bob $= (B, B')$ cut of dimension $2d \times 2d$ can be
    tested on it directly.

# References

- Károly F. Pál, Géza Tóth, Erika Bene and Tamás Vértesi, "Bound entangled
  singlet-like states for quantum metrology", *Phys. Rev. Research* **3**,
  023101 (2021). [arXiv:2002.12409](https://arxiv.org/abs/2002.12409) ·
  [doi:10.1103/PhysRevResearch.3.023101](https://doi.org/10.1103/PhysRevResearch.3.023101)
- Géza Tóth and Tamás Vértesi, "Quantum states with a positive partial
  transpose are useful for metrology", *Phys. Rev. Lett.* **120**, 020506
  (2018). [arXiv:1709.03995](https://arxiv.org/abs/1709.03995) ·
  [doi:10.1103/PhysRevLett.120.020506](https://doi.org/10.1103/PhysRevLett.120.020506)
- Géza Tóth, "QUBIT4MATLAB V3.0: A program package for quantum information
  science and quantum optics for MATLAB", *Comput. Phys. Commun.* **179**,
  430–437 (2008). [arXiv:0709.0948](https://arxiv.org/abs/0709.0948) ·
  [doi:10.1016/j.cpc.2008.03.007](https://doi.org/10.1016/j.cpc.2008.03.007)
"""

from math import sqrt, log2
import numpy as np
from toqito.matrix_ops import tensor
from toqito.perms import permute_systems
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
    bound entangled for every valid shield_dim.  The construction is built up
    in ABA'B' ordering (two-qubit pair AB, shield pair A'B'), then permuted to
    AA'BB' before being returned, so the Alice = (A, A') | Bob = (B, B') cut
    of dimension 2d x 2d can be tested directly on the result.

    Args:
        shield_dim: shield subsystem dimension d.  Must be 3 or a power of 2
            (equivalently, total local dimension 2d ∈ {4, 6, 8, 16, …}).

    Returns:
        np.ndarray: (4d²) × (4d²) density matrix of the ρ_F2 bound-entangled
        state, in AA'BB' ordering.

    Raises:
        ValueError: If shield_dim is not 3 or a power of 2.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = orthogonal_singlet(shield_dim=2)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[4, 4])
        True
        >>> sep, _ = is_separable(state, dim=[4, 4])
        >>> sep
        False
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

    rho = (p1 / d**2) * sum1 + (p2 / (2 * d)) * sum2 + (p2 / (2 * d)) * sum3
    return permute_systems(rho, [0, 2, 1, 3], dim=[2, 2, d, d])
