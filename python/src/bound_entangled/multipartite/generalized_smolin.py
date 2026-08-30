"""https://arxiv.org/abs/quant-ph/0411142

A. Kay, "Degree of quantum bound entanglement for a family of mixed states",
Phys. Rev. A 71, 032309 (2005). (See also Smolin: arXiv:quant-ph/0001001.)
Generalization of the Smolin state to an even number of qubits: bound entangled
for every ``systems >= 4``, constructed from tensor products of Pauli
operators.
"""

from toqito.matrices import pauli
import numpy as np


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
