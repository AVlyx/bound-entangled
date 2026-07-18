import numpy as np
import pytest

from cd_otimes_cd.gen_tiles import gen_tiles1_basis, gen_tiles1

from qi import assert_bound_entangled


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


def test_gen_tiles1_basis_rejects_invalid_d():
    with pytest.raises(ValueError):
        gen_tiles1_basis(3)
    with pytest.raises(ValueError):
        gen_tiles1_basis(5)


@pytest.mark.parametrize("d", [4, 6])
def test_gen_tiles1_is_bound_entangled(d):
    assert_bound_entangled(gen_tiles1(d), dim=[d, d])
