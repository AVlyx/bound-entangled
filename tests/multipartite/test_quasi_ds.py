import pytest

from bound_entangled.multipartite.quasi_ds import quasi_ds

from qi import assert_bound_entangled


@pytest.mark.parametrize("n,z,sigma", [
    (3, 1.0, 1),
    (3, 1.0, -1),
    (5, 1.0, 1),
])
def test_quasi_ds_is_bound_entangled(n, z, sigma):
    rho = quasi_ds(n, z, sigma)
    assert_bound_entangled(rho, dim=[2, 2 ** (n - 1)])
