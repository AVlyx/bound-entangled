"""https://arxiv.org/abs/quant-ph/9908070

D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
"Unextendible Product Bases, Uncompletable Product Bases and Bound
Entanglement", Commun. Math. Phys. 238, 379 (2003), Section IV A. A
six-parameter family of unextendible product bases on C^3 (x) C^3 that
contains the Pyramid and Tiles UPBs (`pyramid_upb`, `tiles_upb`) as special
cases.
"""

from math import cos, sin, sqrt

import numpy as np
from utils import upb


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
    """
    return upb(parametrized_basis(gamma_a, teta_a, phi_a, gamma_b, teta_b, phi_b))
