import numpy as np

from c3_otimes_c3.upb.pyramid_UPB import pyramid_basis, pyramid_upb
from c3_otimes_c3.upb.tiles_UPB import tiles_upb

from qi import assert_bound_entangled


def test_pyramid_basis_has_five_normalized_distinct_vectors():
    basis = pyramid_basis()
    assert len(basis) == 5
    for v in basis:
        assert v.shape == (9, 1)
        np.testing.assert_allclose(np.linalg.norm(v), 1.0)
    # Pairwise distinct.
    for i in range(len(basis)):
        for j in range(i + 1, len(basis)):
            assert not np.allclose(basis[i], basis[j])


def test_pyramid_upb_is_bound_entangled():
    assert_bound_entangled(pyramid_upb(), dim=[3, 3])


def test_tiles_upb_is_bound_entangled():
    assert_bound_entangled(tiles_upb(), dim=[3, 3])
