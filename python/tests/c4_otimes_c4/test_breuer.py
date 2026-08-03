import numpy as np
import pytest

from bound_entangled.c4_otimes_c4.breuer import breuer

from qi import assert_bound_entangled, assert_density_matrix


def test_breuer_is_bound_entangled():
    rho = breuer(0.1)
    assert rho.shape == (16, 16)
    assert_bound_entangled(rho, dim=[4, 4])


@pytest.mark.parametrize("lam", [0.01, 0.5, 1.0])
def test_breuer_is_valid_density_matrix(lam):
    rho = breuer(lam)
    assert_density_matrix(rho, dim=[4, 4])


def test_breuer_lam_zero_is_valid_density_matrix():
    rho = breuer(0.0)
    assert_density_matrix(rho, dim=[4, 4])


def test_breuer_is_hermitian():
    rho = breuer(0.3)
    np.testing.assert_allclose(rho, rho.conj().T, atol=1e-12)


def test_breuer_invalid_lam_raises():
    with pytest.raises((ValueError, Exception)):
        breuer(1.5)
