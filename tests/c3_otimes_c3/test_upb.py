import numpy as np

from c3_otimes_c3.upb.pyramid_UPB import pyramid_basis, pyramid_upb
from c3_otimes_c3.upb.tiles_UPB import tiles_upb
from c3_otimes_c3.upb.parametrized_UPB import parametrized_basis, parametrized_upb

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


def test_parametrized_basis_has_five_normalized_distinct_vectors():
    basis = parametrized_basis(0.7, 0.6, 0.3, 1.1, 0.5, 1.4)
    assert len(basis) == 5
    for v in basis:
        assert v.shape == (9, 1)
        np.testing.assert_allclose(np.linalg.norm(v), 1.0)
    for i in range(len(basis)):
        for j in range(i + 1, len(basis)):
            assert not np.allclose(basis[i], basis[j])


def test_parametrized_upb_is_bound_entangled():
    assert_bound_entangled(parametrized_upb(0.7, 0.6, 0.3, 1.1, 0.5, 1.4), dim=[3, 3])


def test_parametrized_basis_has_the_upb_orthogonality_graph():
    # Every UPB on 3 (x) 3 has the same orthogonality graph (Fig. 4 of the
    # paper): consecutive states (i, i+1 mod 5) are orthogonal via one party
    # and states two apart (i, i+2 mod 5) are orthogonal via the other,
    # covering all 10 pairs and forcing unextendibility.
    basis = parametrized_basis(0.7, 0.6, 0.3, 1.1, 0.5, 1.4)
    for i in range(5):
        for j in range(i + 1, 5):
            overlap = (basis[i].conj().T @ basis[j]).item()
            np.testing.assert_allclose(overlap, 0.0, atol=1e-10)
