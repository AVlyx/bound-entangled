r"""The GenTiles1 UPB on $\mathbb{C}^d \otimes \mathbb{C}^d$.

GenTiles1 generalizes the
[Tiles UPB][bound_entangled.c3_otimes_c3.upb.tiles_UPB.tiles_upb] of
$\mathbb{C}^3 \otimes \mathbb{C}^3$ to any even local dimension $d \ge 4$
(Theorem 5 of DiVincenzo et al.).

# Definition

The basis is built from a "half-filled" vector on $\mathbb{C}^d$, a sum over
half of the computational basis states weighted by roots of unity:

$$
|\omega_{m,k}\rangle = \sum_{j=0}^{d/2 - 1} \omega^{jm}\,|(j + k) \bmod d\rangle,
\qquad \omega = e^{4\pi i/d} .
$$

For $m = 1, \dots, d/2 - 1$ and $k = 0, \dots, d - 1$ it gives a family of
"vertical" and a family of "horizontal" tiles, and a single "stopper" state
closes the set (Section V B, Eqs. (5.4)–(5.6)):

$$
|V_{mk}\rangle = |k\rangle \otimes |\omega_{m,k+1}\rangle, \qquad
|H_{mk}\rangle = |\omega_{m,k}\rangle \otimes |k\rangle, \qquad
|F\rangle = \frac1d \sum_{i,j} |i\rangle \otimes |j\rangle .
$$

Together, normalized, these $d^2 - 2d + 1$ vectors form the GenTiles1 UPB
(`gen_tiles1_basis`). The state is the uniform mixture over its orthogonal
complement:

$$
\rho = \frac{1}{2d - 1}\Big(\mathbb{1} - \sum_i |v_i\rangle\langle v_i|\Big),
$$

where the sum runs over the $d^2 - 2d + 1$ basis vectors.

# References

- David P. DiVincenzo, Tal Mor, Peter W. Shor, John A. Smolin and Barbara M.
  Terhal, "Unextendible product bases, uncompletable product bases and bound
  entanglement", *Commun. Math. Phys.* **238**, 379–410 (2003).
  [arXiv:quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) ·
  [doi:10.1007/s00220-003-0877-6](https://doi.org/10.1007/s00220-003-0877-6)
- Charles H. Bennett, David P. DiVincenzo, Tal Mor, Peter W. Shor, John A.
  Smolin and Barbara M. Terhal, "Unextendible product bases and bound
  entanglement", *Phys. Rev. Lett.* **82**, 5385–5388 (1999).
  [arXiv:quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) ·
  [doi:10.1103/PhysRevLett.82.5385](https://doi.org/10.1103/PhysRevLett.82.5385)
"""

import numpy as np
from bound_entangled.utils import upb


def gen_tiles1_basis(d: int) -> list[np.ndarray]:
    """The product vectors of the GenTiles1 UPB on C^d (x) C^d.

    Built from d/2 - 1 "vertical" and d/2 - 1 "horizontal" families of tile
    states (Eqs. 5.4-5.5) plus a "stopper" state (Eq. 5.6), for a total of
    d^2 - 2d + 1 states.

    Args:
        d: local dimension of both parties. Must be even and >= 4.

    Returns:
        list[np.ndarray]: the normalized product vectors forming the
        GenTiles1 unextendible product basis, as column vectors.
    """
    if d < 4 or d % 2 != 0:
        raise ValueError("d must be even and >= 4")

    omega = np.exp(1j * 4 * np.pi / d)
    basis = []

    for m in range(1, d // 2):
        for k in range(d):
            # |V_mk> = |k> (x) |omega_{m,k+1}>
            ket_k = np.zeros(d, dtype=np.complex128)
            ket_k[k] = 1
            ket_omega = np.zeros(d, dtype=np.complex128)
            for j in range(d // 2):
                ket_omega[(j + k + 1) % d] += omega ** (j * m)
            ket_omega /= np.linalg.norm(ket_omega)
            basis.append(np.kron(ket_k, ket_omega).reshape(-1, 1))

    for m in range(1, d // 2):
        for k in range(d):
            # |H_mk> = |omega_{m,k}> (x) |k>
            ket_omega = np.zeros(d, dtype=np.complex128)
            for j in range(d // 2):
                ket_omega[(j + k) % d] += omega ** (j * m)
            ket_omega /= np.linalg.norm(ket_omega)
            ket_k = np.zeros(d, dtype=np.complex128)
            ket_k[k] = 1
            basis.append(np.kron(ket_omega, ket_k).reshape(-1, 1))

    # |F> = sum_i sum_j |i> (x) |j>
    stopper = np.ones(d * d, dtype=np.complex128) / d
    basis.append(stopper.reshape(-1, 1))

    return basis


def gen_tiles1(*, full_dim: int) -> np.ndarray:
    """The bound entangled state built from the GenTiles1 UPB on C^d (x) C^d.

    Args:
        full_dim: local dimension of both parties. Must be even and >= 4.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the GenTiles1 unextendible product basis.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = gen_tiles1(full_dim=4)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[4, 4])
        True
        >>> sep, _ = is_separable(state, dim=[4, 4])
        >>> sep
        False
    """
    return upb(gen_tiles1_basis(full_dim))
