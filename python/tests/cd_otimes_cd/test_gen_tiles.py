"""Structural properties of the GenTiles1 UPB on C^d (x) C^d.

The state's validity, PPT-ness and entanglement are covered by the doctest on
`gen_tiles1`; this file covers the basis it is built from.
"""

import numpy as np
import pytest

from bound_entangled.cd_otimes_cd.gen_tiles import gen_tiles1_basis


@pytest.mark.parametrize("d", [4, 6, 8])
def test_gen_tiles1_basis_is_an_orthonormal_product_basis_of_the_right_size(d):
    basis = gen_tiles1_basis(d)
    assert len(basis) == d * d - 2 * d + 1
    for v in basis:
        assert v.shape == (d * d, 1)
        np.testing.assert_allclose(np.linalg.norm(v), 1.0)
    for i in range(len(basis)):
        for j in range(i + 1, len(basis)):
            overlap = (basis[i].conj().T @ basis[j]).item()
            np.testing.assert_allclose(overlap, 0.0, atol=1e-10)
