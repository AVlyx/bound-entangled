r"""The generalized Smolin states on $(\mathbb{C}^2)^{\otimes 2n}$.

Augusiak and Horodecki's generalization of the
[Smolin][bound_entangled.multipartite.smolin.smolin] state to an even number
$2n$ of qubits, built from the fully aligned Pauli strings $X^{\otimes 2n}$,
$Y^{\otimes 2n}$ and $Z^{\otimes 2n}$. It reduces to the original Smolin state
at $2n = 4$, and is bound entangled with respect to the fully separated
partition of its qubits for every even $2n \ge 4$.

# Definition

For $2n$ qubits the generalized Smolin state is (Observation 1 of the paper)

$$
\rho_{2n} = \frac{1}{2^{2n}}\Big(\mathbb{1}^{\otimes 2n} + (-1)^n \sum_{i \in \{X, Y, Z\}} \sigma_i^{\otimes 2n}\Big),
$$

where $\sigma_i^{\otimes 2n}$ applies $\sigma_i$ to every qubit. The sign is
forced, not a convention: the three Pauli strings commute and multiply to
$(XYZ)^{\otimes 2n} = (-1)^n\,\mathbb{1}$, so their joint eigenvalues
$(s_X, s_Y, s_Z)$ are the sign triples with product $(-1)^n$, and only the
coefficient $(-1)^n$ keeps every eigenvalue
$\big(1 + (-1)^n (s_X + s_Y + s_Z)\big)/2^{2n}$ non-negative.

As for the Smolin state, the parity of the cut decides the answer: across every
cut with evenly many qubits on each side the state is separable, and across the
odd cuts it is NPT.

# References

- Remigiusz Augusiak and Paweł Horodecki, "Generalized Smolin states and their
  properties", *Phys. Rev. A* **73**, 012318 (2006).
  [arXiv:quant-ph/0411142](https://arxiv.org/abs/quant-ph/0411142) ·
  [doi:10.1103/PhysRevA.73.012318](https://doi.org/10.1103/PhysRevA.73.012318)
- John A. Smolin, "Four-party unlockable bound entangled state", *Phys. Rev.
  A* **63**, 032306 (2001).
  [arXiv:quant-ph/0001001](https://arxiv.org/abs/quant-ph/0001001) ·
  [doi:10.1103/PhysRevA.63.032306](https://doi.org/10.1103/PhysRevA.63.032306)
"""

import numpy as np
from bound_entangled.utils import pauli


def generalized_smolin(systems: int) -> np.ndarray:
    """Construct the generalized Smolin (GSS) bound-entangled state (arXiv:quant-ph/0411142).

    For an even number of qubits ``systems = 2n``, the state is::

        rho = (I + (-1)^n * sum_{i in {X,Y,Z}} sigma_i^{⊗2n}) / 2^{2n}

    The sign is forced rather than conventional.  The three Pauli strings
    commute (X and Y anticommute on each of an even number of qubits) and
    satisfy sigma_X^{⊗2n} sigma_Y^{⊗2n} sigma_Z^{⊗2n} = (XYZ)^{⊗2n} = i^{2n} I
    = (-1)^n I, so their joint eigenvalues (s_X, s_Y, s_Z) range over the sign
    triples of product (-1)^n.  Only (-1)^n as the coefficient keeps every
    eigenvalue (1 + (-1)^n (s_X + s_Y + s_Z)) / 2^{2n} non-negative; the other
    sign gives a matrix with negative eigenvalues.

    ``systems=4`` (n=2) reproduces the original Smolin state on C^4 ⊗ C^4, and
    for every even ``systems >= 4`` the state is bound entangled with respect
    to the fully separated partition of its qubits.  ``systems=2`` is accepted
    but degenerate: it returns the singlet, which is pure and distillable.

    Parameters
    ----------
    systems:
        Total number of qubits.  Must be a positive even integer.

    Returns
    -------
    np.ndarray
        ``2^systems × 2^systems`` density matrix of the GSS state.

    Raises
    ------
    AssertionError
        If ``systems`` is not a positive even integer.

    Examples
    --------
    As for `smolin`, which cut you take decides the answer — and it is the
    parity of the cut that decides it.  Shown here for ``systems=6``.

    Across a 2|4 cut, with evenly many qubits on each side, the state is PPT
    and separable.  The same holds for every even split at any size — 2|6 and
    the balanced 4|4 for ``systems=8``, and so on — and it is what binds the
    entanglement, exactly as the 2|2 cuts do for `smolin`:

    >>> from toqito.matrix_props import is_density
    >>> from toqito.state_props import is_separable
    >>> state = generalized_smolin(6)
    >>> is_density(state)
    True
    >>> sep, _ = is_separable(state, dim=[4, 16])
    >>> sep
    True

    The odd splits, 1|5 and the balanced 3|3, are both NPT and so entangled
    across those cuts: this is a genuinely multipartite state, not a bipartite
    bound entangled one.  Note that entanglement is all NPT buys here.  It
    implies distillability across the 1|5 cut, where one side is a single qubit
    and every NPT state on 2 ⊗ N is distillable, but not across 3|3.
    """
    assert systems > 0 and systems % 2 == 0
    n = systems // 2
    result = np.identity(2**systems, dtype=np.complex128)
    sign = (-1) ** n
    for i in range(1, 4):
        result += sign * pauli([i] * systems)
    return result / 2**systems
