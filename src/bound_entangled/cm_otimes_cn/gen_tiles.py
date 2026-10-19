r"""The GenTiles2 UPB on $\mathbb{C}^m \otimes \mathbb{C}^n$.

GenTiles2 generalizes the
[Tiles UPB][bound_entangled.c3_otimes_c3.upb.tiles_UPB.tiles_upb] of
$\mathbb{C}^3 \otimes \mathbb{C}^3$ to $\mathbb{C}^m \otimes \mathbb{C}^n$ with
$n > 3$, $m \ge 3$ and $n \ge m$ (Theorem 6 of DiVincenzo et al.).

# Definition

The basis consists of three families of product vectors (Section V B,
Eqs. (5.9)–(5.11)). There are $m$ "short" tiles,

$$
|S_j\rangle = \tfrac{1}{\sqrt 2}\,\big(|j\rangle - |j + 1 \bmod m\rangle\big) \otimes |j\rangle,
\qquad 0 \le j \le m - 1,
$$

$m(n - 3)$ "long" tiles, with $\omega = e^{2\pi i/(n-2)}$,

$$
|L_{jk}\rangle = |j\rangle \otimes \frac{1}{\sqrt{n-2}}
\Big(\sum_{i=0}^{m-3} \omega^{ik}\,|i + j + 1 \bmod m\rangle + \sum_{i=m-2}^{n-3} \omega^{ik}\,|i + 2\rangle\Big),
\qquad 0 \le j \le m-1,\ 1 \le k \le n - 3,
$$

and one "stopper" state,

$$
|F\rangle = \frac{1}{\sqrt{mn}} \sum_{i=0}^{m-1} \sum_{j=0}^{n-1} |i\rangle \otimes |j\rangle,
$$

for a total of $N = mn - 2m + 1$ vectors. The state is the uniform mixture over
the orthogonal complement of their span:

$$
\rho = \frac{1}{mn - N}\Big(\mathbb{1} - \sum_{i=1}^{N} |v_i\rangle\langle v_i|\Big).
$$

!!! warning "$m = 3$, $n \ge 5$"

    The complement has dimension $2m - 1$, which is 5 for $m = 3$ whatever
    $n$. From $n = 5$ on, the state is PPT with rank no larger than the local
    dimension $n$, and `toqito`'s `is_separable` certifies it separable. So for
    $m = 3$ only $n = 4$ gives a bound entangled state here, even though
    Theorem 6 as stated covers every $n > 3$. A doctest on `gen_tiles2` pins
    the $(3, 5)$ case.

# References

- David P. DiVincenzo, Tal Mor, Peter W. Shor, John A. Smolin and Barbara M.
  Terhal, "Unextendible product bases, uncompletable product bases and bound
  entanglement", *Commun. Math. Phys.* **238**, 379–410 (2003).
  [arXiv:quant-ph/9908070](https://arxiv.org/abs/quant-ph/9908070) ·
  [doi:10.1007/s00220-003-0877-6](https://doi.org/10.1007/s00220-003-0877-6)
"""

import numpy as np
from bound_entangled.utils import upb


def gen_tiles2_basis(m_n: tuple[int, int]) -> list[np.ndarray]:
    """The product vectors of the GenTiles2 UPB on C^m (x) C^n.

    Built from m "short" tile states (Eq. 5.9), m * (n - 3) "long" tile
    states (Eq. 5.10), and a "stopper" state (Eq. 5.11), for a total of
    m*n - 2m + 1 states.

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system. Requires
            n > 3, m >= 3, and n >= m. Note m = n = 3 does not yield a UPB
            (excluded by n > 3).

    Returns:
        list[np.ndarray]: the normalized product vectors forming the
        GenTiles2 unextendible product basis, as column vectors.
    """
    m, n = m_n
    if not (n > 3 and m >= 3 and n >= m):
        raise ValueError("requires n > 3, m >= 3, and n >= m")

    basis_upb = []

    for j in range(m):
        # |S_j> = 1/sqrt(2) (|j> - |j+1 mod m>) (x) |j>
        ket_a = np.zeros(m, dtype=np.complex128)
        ket_a[j] = 1
        ket_a[(j + 1) % m] -= 1
        ket_a /= np.linalg.norm(ket_a)
        ket_b = np.zeros(n, dtype=np.complex128)
        ket_b[j] = 1
        basis_upb.append(np.kron(ket_a, ket_b).reshape(-1, 1))

    omega = np.exp(1j * 2 * np.pi / (n - 2))
    for j in range(m):
        ket_a = np.zeros(m, dtype=np.complex128)
        ket_a[j] = 1
        for k in range(1, n - 2):
            # |L_jk> = |j> (x) 1/sqrt(n-2) (sum_{i=0}^{m-3} w^ik |i+j+1 mod m>
            #                               + sum_{i=m-2}^{n-3} w^ik |i+2>)
            ket_b = np.zeros(n, dtype=np.complex128)
            for i in range(m - 2):
                ket_b[(i + j + 1) % m] += omega ** (i * k)
            for i in range(m - 2, n - 2):
                ket_b[i + 2] += omega ** (i * k)
            ket_b /= np.linalg.norm(ket_b)
            basis_upb.append(np.kron(ket_a, ket_b).reshape(-1, 1))

    # |F> = 1/sqrt(nm) sum_i sum_j |i> (x) |j>
    stopper = np.ones(m * n, dtype=np.complex128) / np.sqrt(m * n)
    basis_upb.append(stopper.reshape(-1, 1))

    return basis_upb


def gen_tiles2(m_n: tuple[int, int]) -> np.ndarray:
    """The bound entangled state built from the GenTiles2 UPB on C^m (x) C^n.

    Args:
        m_n: dimensions (m, n) of the C^m (x) C^n bipartite system. Requires
            n > 3, m >= 3, and n >= m. Note m = n = 3 does not yield a UPB
            (excluded by n > 3).

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the GenTiles2 unextendible product basis.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = gen_tiles2((3, 4))
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 4])
        True
        >>> sep, _ = is_separable(state, dim=[3, 4])
        >>> sep
        False

        Note that m = 3 only yields a bound entangled state at n = 4.  The
        complement of the basis has dimension m*n - (m*n - 2m + 1) = 2m - 1,
        which is 5 for m = 3, so from n = 5 on the state is PPT with rank at
        most max(m, n) and therefore separable (Horodecki et al. 2000) — the
        basis cannot be unextendible there:

        >>> sep, _ = is_separable(gen_tiles2((3, 5)), dim=[3, 5])
        >>> sep
        True
    """
    return upb(gen_tiles2_basis(m_n))
