r"""The Badziąg et al. private singlet on $\mathbb{C}^{2d} \otimes \mathbb{C}^{2d}$.

The bound entangled states of Badziąg, Horodecki, Horodecki, Jenkinson and
Szarek, built from private states: a two-qubit block mixed with a "shield" pair
of local dimension $d$. Pál, Tóth, Bene and Vértesi present them as the first
family of PPT singlet-like states, $\rho_{F1}$, and show they are as useful for
quantum metrology as the best states found numerically. The construction here
follows their Definition 1, Eqs. (23)–(28), and matches the `BES_private.m`
routine of QUBIT4MATLAB.

# Definition

The state lives on
$\mathbb{C}^2 \otimes \mathbb{C}^2 \otimes \mathbb{C}^d \otimes \mathbb{C}^d$ in
$ABA'B'$ ordering: a two-qubit pair $AB$ and a shield pair $A'B'$. Writing
basis states as
$|ij, kl\rangle = |i\rangle_A |j\rangle_B |k\rangle_{A'} |l\rangle_{B'}$, it
mixes two branches with weights

$$
p_1 = \frac{\sqrt d}{1 + \sqrt d}, \qquad p_2 = 1 - p_1 .
$$

Both branches use the discrete Fourier matrix
$u_{ij} = \omega^{ij}/\sqrt d$, $\omega = e^{2\pi i/d}$ (Eq. (28)). The $p_1$
branch is supported on $|00, ij\rangle$ and $|11, ij\rangle$,

$$
\frac{p_1}{2d^2} \sum_{ij} \big(|00,ij\rangle\langle 00,ij| + |11,ij\rangle\langle 11,ij|\big)
+ \frac{p_1}{2d\sqrt d} \sum_{ij} \big(u_{ij}\,|00,ij\rangle\langle 11,ji| + \text{h.c.}\big),
$$

and the $p_2$ branch on $|01, ii\rangle$ and $|10, ii\rangle$,

$$
\frac{p_2}{2d} \sum_{i} \big(|01,ii\rangle\langle 01,ii| + |10,ii\rangle\langle 10,ii|\big)
+ \frac{p_2}{2d} \sum_{ij} \big(u_{ij}\,|01,ii\rangle\langle 10,jj| + \text{h.c.}\big).
$$

The state is the sum of the two branches. It is invariant under partial
transposition, and bound entangled for every $d \ge 2$.

!!! note "Subsystem order"

    The construction is naturally written in $ABA'B'$ order; the returned
    matrix is reordered to $AA'BB'$, so the physical
    Alice $= (A, A')$ | Bob $= (B, B')$ cut of dimension $2d \times 2d$ can be
    tested on it directly.

# References

- Piotr Badziąg, Karol Horodecki, Michał Horodecki, Justin Jenkinson and
  Stanisław J. Szarek, "Bound entangled states with extremal properties",
  *Phys. Rev. A* **90**, 012301 (2014).
  [arXiv:1309.7992](https://arxiv.org/abs/1309.7992) ·
  [doi:10.1103/PhysRevA.90.012301](https://doi.org/10.1103/PhysRevA.90.012301)
- Károly F. Pál, Géza Tóth, Erika Bene and Tamás Vértesi, "Bound entangled
  singlet-like states for quantum metrology", *Phys. Rev. Research* **3**,
  023101 (2021). [arXiv:2002.12409](https://arxiv.org/abs/2002.12409) ·
  [doi:10.1103/PhysRevResearch.3.023101](https://doi.org/10.1103/PhysRevResearch.3.023101)
- Géza Tóth, "QUBIT4MATLAB V3.0: A program package for quantum information
  science and quantum optics for MATLAB", *Comput. Phys. Commun.* **179**,
  430–437 (2008). [arXiv:0709.0948](https://arxiv.org/abs/0709.0948) ·
  [doi:10.1016/j.cpc.2008.03.007](https://doi.org/10.1016/j.cpc.2008.03.007)
"""

from toqito.matrices import fourier
from toqito.matrix_ops import tensor
from toqito.perms import permute_systems
from math import sqrt
from bound_entangled.utils import ketbra
import numpy as np


def ket_i(d: int, i: int):
    ket = np.zeros(d, dtype=np.complex128)
    ket[i] = 1
    return ket


def basis(shield_dim: int, i: int, j: int, k: int, l: int):
    """basis vector |ijkj>"""
    assert i <= 1 and j <= 1
    return tensor(ket_i(2, i), ket_i(2, j), ket_i(shield_dim, k), ket_i(shield_dim, l))


def badziag_private_singlet(*, shield_dim: int) -> np.ndarray:
    """Construct the Badziąg et al. private-singlet bound-entangled state on C^{2d} ⊗ C^{2d}.

    A PPT singlet in dimension 2d × 2d built from a shield subsystem of
    dimension d and a two-qubit pair, the state ρ_F1 of Phys. Rev. Research 3,
    023101 (2021), with the Fourier choice u_ij = exp(2πi ij/d)/√d of
    Eq. (28).  The state is bound entangled for every shield_dim >= 2.  The
    construction is built up in ABA'B' ordering (two-qubit pair A,B then the
    shield pair A',B'), then permuted to AA'BB' before being returned, so the
    Alice = (A, A') | Bob = (B, B') cut of dimension 2d x 2d can be tested
    directly on the result.

    Args:
        shield_dim: shield subsystem dimension d (>= 2).

    Returns:
        np.ndarray: (4d²) × (4d²) density matrix of the bound-entangled state,
        in AA'BB' ordering.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = badziag_private_singlet(shield_dim=2)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[4, 4])
        True
        >>> sep, _ = is_separable(state, dim=[4, 4])
        >>> sep
        False
    """
    p1 = sqrt(shield_dim) / (1 + sqrt(shield_dim))
    p2 = 1 - p1
    u = fourier(shield_dim)

    ret = sum(
        ketbra(
            basis(shield_dim, 0, 0, i, j),
        )
        + ketbra(
            basis(shield_dim, 1, 1, i, j),
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p1 / (2 * shield_dim**2))

    ret += sum(
        (
            u[i, j]
            * ketbra(
                basis(shield_dim, 0, 0, i, j),
                basis(shield_dim, 1, 1, j, i),
            )
        )
        + (
            u[i, j].conj()
            * ketbra(
                basis(shield_dim, 1, 1, j, i),
                basis(shield_dim, 0, 0, i, j),
            )
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p1 / (2 * shield_dim * sqrt(shield_dim)))

    ret += sum(
        ketbra(
            basis(shield_dim, 0, 1, i, i),
        )
        + ketbra(
            basis(shield_dim, 1, 0, i, i),
        )
        for i in range(shield_dim)
    ) * (p2 / (2 * shield_dim))

    ret += sum(
        (
            u[i, j]
            * ketbra(
                basis(shield_dim, 0, 1, i, i),
                basis(shield_dim, 1, 0, j, j),
            )
        )
        + (
            u[i, j].conj()
            * ketbra(
                basis(shield_dim, 1, 0, j, j),
                basis(shield_dim, 0, 1, i, i),
            )
        )
        for i in range(shield_dim)
        for j in range(shield_dim)
    ) * (p2 / (2 * shield_dim))

    return permute_systems(ret, [0, 2, 1, 3], dim=[2, 2, shield_dim, shield_dim])  # type: ignore
