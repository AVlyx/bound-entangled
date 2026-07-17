import numpy as np

from c4_otimes_c4.pianni import P_ij, pianni

from qi import assert_bound_entangled


def test_P_ij_is_a_rank_one_projector():
    p = P_ij(1, 1)
    assert p.shape == (16, 16)
    np.testing.assert_allclose(p, p.conj().T)  # Hermitian
    np.testing.assert_allclose(np.trace(p), 1.0)  # rank-1 projector onto a unit vector
    np.testing.assert_allclose(p @ p, p)  # idempotent


def test_pianni_is_bound_entangled():
    rho = pianni()
    assert rho.shape == (16, 16)
    assert_bound_entangled(rho, dim=[4, 4])
