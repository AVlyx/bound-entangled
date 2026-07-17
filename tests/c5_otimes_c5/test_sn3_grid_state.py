import pytest

from c5_otimes_c5.sn3_grid_state import sn3_grid_state

from qi import assert_bound_entangled


def test_sn3_grid_state_is_bound_entangled():
    rho = sn3_grid_state()
    assert rho.shape == (25, 25)
    assert_bound_entangled(rho, dim=[5, 5])
