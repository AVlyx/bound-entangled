import pytest

from bound_entangled.c2_otimes_c4.horodecki import horodecki

from qi import assert_bound_entangled, assert_density_matrix


@pytest.mark.parametrize("a", [0.1, 0.5, 0.9])
def test_horodecki_is_bound_entangled(a):
    rho = horodecki(a)
    assert_bound_entangled(rho, dim=[2, 4])


def test_horodecki_shape():
    rho = horodecki(0.5)
    assert rho.shape == (8, 8)


@pytest.mark.parametrize("a", [0.0, 0.5, 1.0])
def test_horodecki_is_valid_density_matrix(a):
    rho = horodecki(a)
    assert_density_matrix(rho, dim=[2, 4])
