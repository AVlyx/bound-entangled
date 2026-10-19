r"""The bound entangled state of the Pyramid UPB on $\mathbb{C}^3 \otimes \mathbb{C}^3$.

The Pyramid UPB is the second unextendible product basis on
$\mathbb{C}^3 \otimes \mathbb{C}^3$ from Bennett, DiVincenzo, Mor, Shor, Smolin
and Terhal, built from vectors pointing at the apex of a regular pentagonal
pyramid rather than from the grid the
[Tiles][bound_entangled.c3_otimes_c3.upb.tiles_UPB.tiles_upb] basis uses. As
with Tiles, the bound entangled state built from it is the normalized projector
onto its orthogonal complement.

# Definition

For $j = 0, \dots, 4$ and $h = \tfrac12 \sqrt{1 + \sqrt 5}$, the height at which
non-adjacent vectors are orthogonal, let

$$
\vec v_j = N \left(\cos\tfrac{2\pi j}{5},\ \sin\tfrac{2\pi j}{5},\ h\right),
$$

normalized by $N$. The basis is (Eq. (2) of the paper)

$$
|\psi_j\rangle = |\vec v_j\rangle \otimes |\vec v_{2j \bmod 5}\rangle, \qquad j = 0, \dots, 4.
$$

States whose indices differ by 2 are orthogonal on Alice's side, those whose
indices differ by 1 on Bob's side. As for every UPB in this library, the bound
entangled state is the uniform mixture over the 4-dimensional complement:

$$
\rho = \frac{1}{9 - 5}\Big(\mathbb{1} - \sum_{j=0}^{4} |\psi_j\rangle\langle\psi_j|\Big).
$$

# References

- Charles H. Bennett, David P. DiVincenzo, Tal Mor, Peter W. Shor, John A.
  Smolin and Barbara M. Terhal, "Unextendible product bases and bound
  entanglement", *Phys. Rev. Lett.* **82**, 5385–5388 (1999).
  [arXiv:quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) ·
  [doi:10.1103/PhysRevLett.82.5385](https://doi.org/10.1103/PhysRevLett.82.5385)
"""

import numpy as np
from bound_entangled.utils import upb


def pyramid_basis() -> list[np.ndarray]:
    """The five product vectors of the "Pyramid" UPB on C^3 (x) C^3.

    Returns:
        list[np.ndarray]: the five normalized product vectors forming the
        Pyramid unextendible product basis, as column vectors.
    """
    h = 0.5 * np.sqrt(1 + np.sqrt(5))
    vecs = []
    for j in range(5):
        a = np.array([np.cos(2 * np.pi * j / 5), np.sin(2 * np.pi * j / 5), h])
        b = np.array([np.cos(4 * np.pi * j / 5), np.sin(4 * np.pi * j / 5), h])
        a /= np.linalg.norm(a)
        b /= np.linalg.norm(b)
        vecs.append(np.kron(a, b).reshape(-1, 1))
    return vecs


def pyramid_upb() -> np.ndarray:
    """The bound entangled state built from the Pyramid UPB.

    Returns:
        np.ndarray: the bound entangled state on the orthogonal complement of
        the Pyramid UPB.

    Examples:
        >>> from toqito.matrix_props import is_density
        >>> from toqito.state_props import is_ppt, is_separable
        >>> state = pyramid_upb()
        >>> is_density(state)
        True
        >>> is_ppt(state, dim=[3, 3])
        True
        >>> sep, _ = is_separable(state, dim=[3, 3])
        >>> sep
        False
    """
    return upb(pyramid_basis())
