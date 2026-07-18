import numpy as np

from bound_entangled.utils import upb
from bound_entangled.c3_otimes_c3.upb.pyramid_UPB import pyramid_basis

from qi import assert_bound_entangled


def test_upb_formula_on_a_trivial_basis():
    # upb([v]) with a single computational basis vector must return
    # (I - |v><v|) / (D - 1) exactly, independent of any physics.
    v = np.zeros((4, 1))
    v[0, 0] = 1.0
    expected = (np.identity(4) - np.diag([1.0, 0.0, 0.0, 0.0])) / 3.0
    np.testing.assert_allclose(upb([v]), expected)


def test_upb_from_pyramid_basis_is_bound_entangled():
    rho = upb(pyramid_basis())
    assert_bound_entangled(rho, dim=[3, 3])


def test_upb_basis_vectors_lie_in_the_kernel():
    # The UPB state projects onto the orthogonal complement of the basis, so
    # every basis vector is annihilated by it.
    basis = pyramid_basis()
    rho = upb(basis)
    for v in basis:
        np.testing.assert_allclose(rho @ v, np.zeros_like(v), atol=1e-10)
