r"""The Benatti–Floreanini–Piani state on $\mathbb{C}^4 \otimes \mathbb{C}^4$.

A bound entangled state on $\mathbb{C}^4 \otimes \mathbb{C}^4$, built as a
uniform mixture of six generalized Bell projectors: positive under partial
transpose, yet entangled. It comes from Benatti, Floreanini and Piani's study of
quantum dynamical semigroups that cannot be written as mixtures of decomposable
ones.

# Definition

Write $|\Psi_4^+\rangle = \tfrac12 \sum_{k=0}^{3} |kk\rangle$ for the maximally
entangled state of $\mathbb{C}^4 \otimes \mathbb{C}^4$. For Pauli indices
$i, j \in \{0, 1, 2, 3\}$ ($0 = \mathbb{1}$, $1 = X$, $2 = Y$, $3 = Z$), the
generalized Bell state

$$
|\Psi_{ij}\rangle = (\mathbb{1} \otimes \sigma_i \otimes \sigma_j)\,|\Psi_4^+\rangle
$$

applies $\sigma_i \otimes \sigma_j$ to the second $\mathbb{C}^4$ factor, viewed
as two qubits. Its projector $P_{ij} = |\Psi_{ij}\rangle\langle\Psi_{ij}|$ is
what `P_ij(i, j)` computes. The Piani state is the uniform mixture of six of
them (Eq. (29) of the paper; Eq. (S.124) of Imai et al., Appendix C5):

$$
\rho = \tfrac16\,\big(P_{02} + P_{11} + P_{23} + P_{31} + P_{32} + P_{33}\big),
$$

that is, of $\sigma_i \otimes \sigma_j$ equal to $\mathbb{1} \otimes Y$,
$X \otimes X$, $Y \otimes Z$, $Z \otimes X$, $Z \otimes Y$ and $Z \otimes Z$.

The mixture is positive under the $4 \otimes 4$ partial transpose as it stands —
no rearranging of the underlying qubits is needed — while remaining entangled,
which is what makes it bound entangled.

# References

- Fabio Benatti, Roberto Floreanini and Marco Piani, "Non-decomposable quantum
  dynamical semigroups and bound entangled states", *Open Syst. Inf. Dyn.*
  **11**, 325–338 (2004).
  [arXiv:quant-ph/0411095](https://arxiv.org/abs/quant-ph/0411095) ·
  [doi:10.1007/s11080-004-6622-6](https://doi.org/10.1007/s11080-004-6622-6)
- Satoya Imai, Nikolai Wyderka, Andreas Ketterer and Otfried Gühne, "Bound
  entanglement from randomized measurements", *Phys. Rev. Lett.* **126**,
  150501 (2021). [arXiv:2010.08372](https://arxiv.org/abs/2010.08372) ·
  [doi:10.1103/PhysRevLett.126.150501](https://doi.org/10.1103/PhysRevLett.126.150501)
"""

import numpy as np
from bound_entangled.utils import ketbra, max_entangled, pauli


def P_ij(i: int, j: int):
    """The projector onto the generalized Bell state |Psi_ij> = (1 (x) sigma_i (x) sigma_j)|Psi_4^+>.

    Args:
        i: index of the first Pauli matrix (0..3).
        j: index of the second Pauli matrix (0..3).

    Returns:
        np.ndarray: the rank-1 projector P_ij on C^4 (x) C^4.
    """
    sigma_ij = np.kron(np.identity(4), pauli([i, j]))
    ket_ij = sigma_ij @ max_entangled(4)
    return ketbra(ket_ij)


def piani():
    """The 4x4 bound entangled "Piani" state.

    Uniform mixture of the six projections P_ij for (i, j) in
    {(0,2), (1,1), (2,3), (3,1), (3,2), (3,3)}, indecomposable and PPT under
    the 4x4 bipartition.

    Returns:
        np.ndarray: the 16x16 bound entangled density matrix.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = piani()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[4, 4])
        True
        >>> sep, _ = is_separable(state, dim=[4, 4])
        >>> sep
        False
    """
    rho = np.zeros((16, 16), dtype=np.complex128)
    for i, j in [(0, 2), (1, 1), (2, 3), (3, 1), (3, 2), (3, 3)]:
        rho += P_ij(i, j)
    rho /= 6
    return rho
