"""https://arxiv.org/abs/quant-ph/0001001

J. A. Smolin, "Four-party unlockable bound entangled state",
Phys. Rev. A 63, 032306 (2001).
Bound entangled state on four qubits A|B|C|D: no two of the four parties can
ever be brought to share entanglement by LOCC, yet the moment any two of them
are allowed to act jointly they can Bell-measure their pair and broadcast two
classical bits, unlocking a Bell pair for the other two.
"""

import numpy as np
from bound_entangled.multipartite.generalized_smolin import generalized_smolin


def smolin() -> np.ndarray:
    """Construct the Smolin bound-entangled state on C^4 ⊗ C^4 (arXiv:quant-ph/0001001).

    The Smolin state is the equal mixture of the four two-qubit Bell states
    tensored with themselves::

        rho = (1/4) sum_{i=0}^{3} |phi_i><phi_i| ⊗ |phi_i><phi_i|

    It lives on a four-qubit system A⊗B⊗C⊗D.

    Returns
    -------
    np.ndarray
        16×16 density matrix representing the Smolin state

    Examples
    --------
    Bound entanglement here is a claim about the fully separated partition
    A|B|C|D, not about every bipartite cut.  The two kinds of cut establish
    different halves of that claim and both are needed.

    Across all three 2|2 cuts (AB|CD and its two relabellings) the state is
    separable.  Four-party LOCC is contained in each of those cuts' LOCC
    classes, so no two of A, B, C, D can ever end up entangled: a Bell pair
    between A and B, say, is entangled across AC|BD, and separability there
    forbids creating it.  The same argument, with a different 2|2 cut, rules
    out each of the six pairs.  This is what makes the entanglement bound.

    >>> from toqito.matrix_props import is_density
    >>> from toqito.state_props import is_separable
    >>> state = smolin()
    >>> is_density(state)
    True
    >>> sep, _ = is_separable(state, dim=[4, 4])
    >>> sep
    True

    Across a 1|3 cut (A|BCD) the state is NPT, hence entangled.  Far from
    contradicting the above, this is what establishes that there is any
    entanglement to bind: were the 1|3 cuts separable too, the state would be
    fully separable and undistillable for the trivial reason.

    >>> sep, _ = is_separable(state, dim=[2, 8])
    >>> sep
    False

    It is also what makes the state unlockable.  Every NPT state on 2 ⊗ 8 is
    distillable, so the entanglement becomes available as soon as B, C and D
    may act jointly — which four-party LOCC is precisely what forbids.

    The partial transpose over the 1|3 cut has eigenvalue +1/8 with
    multiplicity 12 and -1/8 with multiplicity 4.  Writing
    rho = (I + S_X + S_Y + S_Z) / 16 with S_i = sigma_i^(x)4, the S_i commute
    and S_X S_Y S_Z = (XYZ)^(x)4 = I, so the admissible sign triples are
    (+++), (+--), (-+-), (--+), each labelling a 4-dimensional joint
    eigenspace.  Transposing one qubit flips only S_Y, since Y^T = -Y, leaving
    eigenvalues (1 + s_X - s_Y + s_Z) / 16: that is +1/8 on three of the four
    sectors and -1/8 on (-+-).
    """
    return generalized_smolin(4)
