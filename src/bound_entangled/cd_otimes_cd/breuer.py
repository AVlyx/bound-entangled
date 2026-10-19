r"""The Breuer states on $\mathbb{C}^d \otimes \mathbb{C}^d$.

A one-parameter family of two-qudit states, for even local dimension $d \ge 4$,
that Breuer used to show his positive map $\Phi$ is non-decomposable: every
member with $\lambda > 0$ is entangled, which his witness detects, yet the
members with small $\lambda$ are PPT and therefore bound entangled.

# Definition

View $\mathbb{C}^d$ as the space of a spin $j = (d-1)/2$, with basis
$|m\rangle$, $m = -j, \dots, j$. The two-spin singlet (total spin $J = 0$) is

$$
|\psi_0\rangle = \frac{1}{\sqrt d} \sum_{m=-j}^{j} (-1)^{j-m}\, |m\rangle \otimes |{-m}\rangle,
$$

and $P_0 = |\psi_0\rangle\langle\psi_0|$. The Breuer state mixes it with the
normalized projector $P_S$ onto the symmetric subspace, a separable Werner
state (Eq. (7) of the paper):

$$
\rho(\lambda) = \lambda\, P_0 + (1 - \lambda)\, \frac{2}{d(d+1)}\, P_S,
\qquad 0 \le \lambda \le 1 .
$$

Breuer's witness gives $\operatorname{tr}\{W \rho(\lambda)\} = -\lambda (d - 2)$,
so every $\rho(\lambda)$ with $\lambda > 0$ is entangled. The partial transpose
is positive exactly when

$$
\lambda \le \frac{1}{d + 2},
$$

so the states with $0 < \lambda \le 1/(d+2)$ are bound entangled — $1/6$ at
$d = 4$, $1/8$ at $d = 6$. Above that threshold the state is NPT, and at
$\lambda = 1$ it is the pure singlet.

!!! warning "Not bound entangled for every $\lambda > 0$"

    toqito's `breuer` docstring calls the state bound entangled for every
    $\lambda > 0$. Only the entanglement holds for every $\lambda > 0$; the
    paper's own PPT condition restricts bound entanglement to
    $\lambda \le 1/(d+2)$.

# References

- Heinz-Peter Breuer, "Optimal entanglement criterion for mixed quantum states",
  *Phys. Rev. Lett.* **97**, 080501 (2006).
  [arXiv:quant-ph/0605036](https://arxiv.org/abs/quant-ph/0605036) ·
  [doi:10.1103/PhysRevLett.97.080501](https://doi.org/10.1103/PhysRevLett.97.080501)
"""

import numpy as np
from bound_entangled.utils import ketbra, max_entangled


def singlet(dim: int) -> np.ndarray:
    """The two-spin singlet of C^d ⊗ C^d, for the spin j = (d - 1) / 2.

    Built as (1 ⊗ V)|Φ+> with V the anti-diagonal matrix of alternating signs,
    which sends |m> to (-1)^(j-m) |-m> in the basis m = j, ..., -j.

    Args:
        dim: the local dimension d.

    Returns:
        np.ndarray: the normalized singlet as a (d², 1) column vector.

    Examples:
        For d = 2 it is the usual two-qubit singlet, up to sign:

        >>> np.round(singlet(2).ravel() * np.sqrt(2), 12) + 0.0
        array([ 0.,  1., -1.,  0.])
    """
    v = np.fliplr(np.diag((-1.0) ** (np.arange(1, dim + 1) % 2)))
    return np.kron(np.identity(dim), v) @ max_entangled(dim)


def breuer(dim: int, lam: float) -> np.ndarray:
    """The Breuer state lam * P_0 + (1 - lam) * 2 P_S / (d (d + 1)) on C^d ⊗ C^d.

    Args:
        dim: the local dimension d. Must be even; the state is bound entangled
            only for d >= 4.
        lam: the weight of the singlet, in [0, 1]. The state is entangled for
            every lam > 0 and PPT exactly for lam <= 1 / (d + 2), hence bound
            entangled for 0 < lam <= 1 / (d + 2).

    Returns:
        np.ndarray: the d² x d² density matrix.

    Raises:
        ValueError: if dim is not a positive even integer, or lam is outside [0, 1].

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt
        >>> state = breuer(4, 0.1)
        >>> is_density(state)
        True

        The partial transpose is positive up to lam = 1 / (d + 2) = 1/6 at d = 4,
        and not beyond:

        >>> is_ppt(breuer(4, 1 / 6), dim=[4, 4]), is_ppt(breuer(4, 0.17), dim=[4, 4])
        (True, False)

        Breuer's witness W = -(d - 2) P_0 + 2 (P_2 + P_4 + ...) has expectation
        -lam (d - 2) on the state, negative for every lam > 0, which certifies
        the entanglement. With P_S the symmetric projector it equals
        2 (1 - P_S) - d P_0:

        >>> d, lam = 4, 0.1
        >>> swap = np.identity(d * d)[[(i % d) * d + i // d for i in range(d * d)]]
        >>> p_sym = (np.identity(d * d) + swap) / 2
        >>> p_0 = ketbra(singlet(d))
        >>> witness = 2 * (np.identity(d * d) - p_sym - p_0) - (d - 2) * p_0
        >>> bool(np.isclose(np.trace(witness @ breuer(d, lam)), -lam * (d - 2)))
        True
    """
    if dim <= 0 or dim % 2:
        raise ValueError(f"dim must be a positive even integer, got {dim}")
    if not 0 <= lam <= 1:
        raise ValueError(f"lam must lie in [0, 1], got {lam}")
    swap = np.identity(dim * dim)[[(i % dim) * dim + i // dim for i in range(dim * dim)]]
    p_sym = (np.identity(dim * dim) + swap) / 2
    return lam * ketbra(singlet(dim)) + (1 - lam) * 2 * p_sym / (dim * (dim + 1))
