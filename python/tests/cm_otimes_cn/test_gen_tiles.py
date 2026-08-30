"""Structural properties of the GenTiles2 UPB on C^m (x) C^n.

The state's validity, PPT-ness and entanglement are covered by the doctest on
`gen_tiles2`; this file covers the basis it is built from.

Note that orthonormality is necessary but not sufficient for unextendibility:
the basis is orthonormal for every (m, n) below, yet for m = 3 and n >= 5 the
resulting state is provably separable. See the `gen_tiles2` doctest.
"""

import numpy as np
import pytest

from bound_entangled.cm_otimes_cn.gen_tiles import gen_tiles2_basis


@pytest.mark.parametrize("m_n", [(3, 4), (3, 5), (4, 5), (4, 6), (3, 7)])
def test_gen_tiles2_basis_is_an_orthonormal_product_basis_of_the_right_size(m_n):
    m, n = m_n
    basis = gen_tiles2_basis(m_n)
    assert len(basis) == m * n - 2 * m + 1
    for v in basis:
        assert v.shape == (m * n, 1)
        np.testing.assert_allclose(np.linalg.norm(v), 1.0)
    for i in range(len(basis)):
        for j in range(i + 1, len(basis)):
            overlap = (basis[i].conj().T @ basis[j]).item()
            np.testing.assert_allclose(overlap, 0.0, atol=1e-10)
