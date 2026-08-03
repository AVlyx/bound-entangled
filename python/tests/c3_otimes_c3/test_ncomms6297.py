from bound_entangled.c3_otimes_c3.ncomms6297 import ncomms6297

from qi import assert_bound_entangled


def test_ncomms6297_is_bound_entangled():
    rho = ncomms6297()
    assert_bound_entangled(rho, dim=[3, 3])
