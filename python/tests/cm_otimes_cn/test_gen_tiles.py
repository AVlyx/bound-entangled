import numpy as np
import pytest

from bound_entangled.cm_otimes_cn.gen_tiles import gen_tiles2_basis, gen_tiles2

from qi import assert_bound_entangled


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


def test_gen_tiles2_basis_rejects_invalid_dimensions():
    with pytest.raises(ValueError):
        gen_tiles2_basis((3, 3))  # m = n = 3 is explicitly excluded
    with pytest.raises(ValueError):
        gen_tiles2_basis((2, 5))  # m < 3
    with pytest.raises(ValueError):
        gen_tiles2_basis((5, 4))  # n < m


@pytest.mark.parametrize("m_n", [(3, 4), (4, 5)])
def test_gen_tiles2_is_bound_entangled(m_n):
    assert_bound_entangled(gen_tiles2(m_n), dim=list(m_n))
