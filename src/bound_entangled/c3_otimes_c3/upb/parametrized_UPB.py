r"""The six-parameter family of UPBs on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

A six-parameter family of unextendible product bases on
$\mathbb{C}^3 \otimes \mathbb{C}^3$ from DiVincenzo, Mor, Shor, Smolin and
Terhal, which contains the
[Tiles][bound_entangled.c3_otimes_c3.upb.tiles_UPB.tiles_upb] and
[Pyramid][bound_entangled.c3_otimes_c3.upb.pyramid_UPB.pyramid_upb] UPBs. The
paper shows it characterizes every UPB on $\mathbb{C}^3 \otimes \mathbb{C}^3$.
Each choice of the six angles gives five product vectors with the same
orthogonality structure, and the same construction of a bound entangled state on
their orthogonal complement.

# Definition

With angles $(\gamma_A, \theta_A, \varphi_A, \gamma_B, \theta_B, \varphi_B)$ and
normalizations $N_{A,B} = \sqrt{\cos^2\gamma_{A,B} + \sin^2\gamma_{A,B}\cos^2\theta_{A,B}}$,
the basis is $|\psi_i\rangle = |\alpha_i\rangle \otimes |\beta_i\rangle$ with
(Section IV A, Eq. (4.3))

$$
\begin{aligned}
|\alpha_0\rangle &= |0\rangle, &
|\beta_0\rangle &= |1\rangle, \\
|\alpha_1\rangle &= |1\rangle, &
|\beta_1\rangle &= \sin\gamma_B \sin\theta_B |0\rangle + \cos\gamma_B e^{i\varphi_B} |1\rangle - \sin\gamma_B \cos\theta_B |2\rangle, \\
|\alpha_2\rangle &= \cos\theta_A |0\rangle + \sin\theta_A |2\rangle, &
|\beta_2\rangle &= |0\rangle, \\
|\alpha_3\rangle &= \sin\gamma_A \sin\theta_A |0\rangle + \cos\gamma_A e^{i\varphi_A} |1\rangle - \sin\gamma_A \cos\theta_A |2\rangle, &
|\beta_3\rangle &= \cos\theta_B |0\rangle + \sin\theta_B |2\rangle, \\
|\alpha_4\rangle &= \tfrac{1}{N_A}\big(\sin\gamma_A \cos\theta_A e^{i\varphi_A} |1\rangle + \cos\gamma_A |2\rangle\big), &
|\beta_4\rangle &= \tfrac{1}{N_B}\big(\sin\gamma_B \cos\theta_B e^{i\varphi_B} |1\rangle + \cos\gamma_B |2\rangle\big).
\end{aligned}
$$

Every pair of the five $|\psi_i\rangle$ is orthogonal, on Alice's side or on
Bob's. For the set to be unextendible, $\cos$ and $\sin$ of each $\gamma$ and
$\theta$ must be non-zero. As for Tiles and Pyramid, the bound entangled state is
the uniform mixture over the 4-dimensional complement:

$$
\rho = \frac{1}{9 - 5}\Big(\mathbb{1} - \sum_{i=0}^{4} |\psi_i\rangle\langle\psi_i|\Big).
$$

At $\varphi_A = \varphi_B = 0$ and
$\theta_A = \theta_B = \gamma_A = \gamma_B = \arccos\big((\sqrt5 - 1)/2\big)$ this
is the Pyramid UPB; at $\varphi_A = \varphi_B = 0$ and
$\theta_A = \theta_B = \gamma_A = \gamma_B = 3\pi/4$ it is the Tiles UPB.

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

from math import cos, sin, sqrt

import numpy as np
from bound_entangled.utils import upb


def parametrized_basis(
    gamma_a: float,
    teta_a: float,
    phi_a: float,
    gamma_b: float,
    teta_b: float,
    phi_b: float,
) -> list[np.ndarray]:
    """The five product vectors of the six-parameter family of UPBs on C^3 (x) C^3.

    Reduces to the Pyramid UPB for phi_a = phi_b = 0 and teta_a = teta_b =
    gamma_a = gamma_b = arccos((sqrt(5) - 1) / 2), and to the Tiles UPB for
    phi_a = phi_b = 0 and teta_a = teta_b = gamma_a = gamma_b = 3*pi/4.

    Args:
        gamma_a: Alice's gamma angle. Requires cos(gamma_a) != 0 and
            sin(gamma_a) != 0 for the basis to be unextendible.
        teta_a: Alice's theta angle. Requires cos(teta_a) != 0 and
            sin(teta_a) != 0 for the basis to be unextendible.
        phi_a: Alice's phase angle.
        gamma_b: Bob's gamma angle, subject to the same restriction as gamma_a.
        teta_b: Bob's theta angle, subject to the same restriction as teta_a.
        phi_b: Bob's phase angle.

    Returns:
        list[np.ndarray]: the five normalized product vectors |a_i> (x) |b_i>
        forming the unextendible product basis, as column vectors.
    """
    N_a = sqrt(cos(gamma_a) ** 2 + sin(gamma_a) ** 2 * cos(teta_a) ** 2)
    N_b = sqrt(cos(gamma_b) ** 2 + sin(gamma_b) ** 2 * cos(teta_b) ** 2)

    a_0 = np.array(
        [
            1,
            0,
            0,
        ],
        dtype=np.complex128,
    )
    a_1 = np.array(
        [
            0,
            1,
            0,
        ],
        dtype=np.complex128,
    )
    a_2 = np.array(
        [
            cos(teta_a),
            0,
            sin(teta_a),
        ],
        dtype=np.complex128,
    )
    a_3 = np.array(
        [
            sin(gamma_a) * sin(teta_a),
            cos(gamma_a) * np.exp(1j * phi_a),
            -sin(gamma_a) * cos(teta_a),
        ],
        dtype=np.complex128,
    )
    a_4 = np.array(
        [
            0,
            sin(gamma_a) * cos(teta_a) * np.exp(1j * phi_a) / N_a,
            cos(gamma_a) / N_a,
        ],
        dtype=np.complex128,
    )

    b_0 = np.array(
        [
            0,
            1,
            0,
        ],
        dtype=np.complex128,
    )
    b_1 = np.array(
        [
            sin(gamma_b) * sin(teta_b),
            cos(gamma_b) * np.exp(1j * phi_b),
            -sin(gamma_b) * cos(teta_b),
        ],
        dtype=np.complex128,
    )
    b_2 = np.array(
        [
            1,
            0,
            0,
        ],
        dtype=np.complex128,
    )
    b_3 = np.array(
        [
            cos(teta_b),
            0,
            sin(teta_b),
        ],
        dtype=np.complex128,
    )
    b_4 = np.array(
        [
            0,
            sin(gamma_b) * cos(teta_b) * np.exp(1j * phi_b) / N_b,
            cos(gamma_b) / N_b,
        ],
        dtype=np.complex128,
    )

    alice = [a_0, a_1, a_2, a_3, a_4]
    bob = [b_0, b_1, b_2, b_3, b_4]
    return [np.kron(a, b).reshape(-1, 1) for a, b in zip(alice, bob)]


def parametrized_upb(
    gamma_a: float,
    teta_a: float,
    phi_a: float,
    gamma_b: float,
    teta_b: float,
    phi_b: float,
) -> np.ndarray:
    """The bound entangled state built from the six-parameter family of UPBs.

    Args:
        gamma_a: Alice's gamma angle. Requires cos(gamma_a) != 0 and
            sin(gamma_a) != 0 for the basis to be unextendible.
        teta_a: Alice's theta angle. Requires cos(teta_a) != 0 and
            sin(teta_a) != 0 for the basis to be unextendible.
        phi_a: Alice's phase angle.
        gamma_b: Bob's gamma angle, subject to the same restriction as gamma_a.
        teta_b: Bob's theta angle, subject to the same restriction as teta_a.
        phi_b: Bob's phase angle.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the parametrized unextendible product basis.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = parametrized_upb(0.7, 0.6, 0.3, 1.1, 0.5, 1.4)
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    return upb(parametrized_basis(gamma_a, teta_a, phi_a, gamma_b, teta_b, phi_b))
