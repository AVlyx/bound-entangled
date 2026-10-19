r"""The bound entangled state of the Tiles UPB on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

The Tiles UPB is one of the two original unextendible product bases of Bennett,
DiVincenzo, Mor, Shor, Smolin and Terhal: five orthonormal product vectors on
$\mathbb{C}^3 \otimes \mathbb{C}^3$, laid out like tiles on a $3 \times 3$ grid,
such that no product vector is orthogonal to all five. The bound entangled state
built from it is the normalized projector onto the orthogonal complement of the
basis.

# Definition

With $\{|0\rangle, |1\rangle, |2\rangle\}$ the computational basis of
$\mathbb{C}^3$, the five vectors are

$$
\begin{aligned}
|\psi_0\rangle &= \tfrac{1}{\sqrt 2}\,|0\rangle \otimes (|0\rangle - |1\rangle), &
|\psi_1\rangle &= \tfrac{1}{\sqrt 2}\,(|0\rangle - |1\rangle) \otimes |2\rangle, \\
|\psi_2\rangle &= \tfrac{1}{\sqrt 2}\,|2\rangle \otimes (|1\rangle - |2\rangle), &
|\psi_3\rangle &= \tfrac{1}{\sqrt 2}\,(|1\rangle - |2\rangle) \otimes |0\rangle, \\
|\psi_4\rangle &= \tfrac13\,(|0\rangle + |1\rangle + |2\rangle) \otimes (|0\rangle + |1\rangle + |2\rangle).
\end{aligned}
$$

They are pairwise orthogonal, so they span a 5-dimensional subspace of the
9-dimensional space and leave a 4-dimensional orthogonal complement. The bound
entangled state is the uniform mixture over that complement, built by the
shared [`upb`][bound_entangled.utils.upb.upb] construction:

$$
\rho = \frac{1}{9 - 5}\Big(\mathbb{1} - \sum_{i=0}^{4} |\psi_i\rangle\langle\psi_i|\Big).
$$

Each $|\psi_i\rangle\langle\psi_i|$ is a product-state projector, so $\rho$ is
invariant under partial transposition, hence PPT, while its range contains no
product vector, hence it is entangled.

# References

- Charles H. Bennett, David P. DiVincenzo, Tal Mor, Peter W. Shor, John A.
  Smolin and Barbara M. Terhal, "Unextendible product bases and bound
  entanglement", *Phys. Rev. Lett.* **82**, 5385–5388 (1999).
  [arXiv:quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) ·
  [doi:10.1103/PhysRevLett.82.5385](https://doi.org/10.1103/PhysRevLett.82.5385)
"""

import numpy as np
from toqito.states import tile
from bound_entangled.utils import upb


def tiles_upb() -> np.ndarray:
    """The bound entangled state built from the "Tiles" UPB on C^3 (x) C^3.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the Tiles unextendible product basis (`toqito.states.tile`).

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = tiles_upb()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    return upb([tile(i) for i in range(5)])
