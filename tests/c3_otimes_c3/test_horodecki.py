from bound_entangled.c3_otimes_c3.horodecki import horodecki

from qi import assert_bound_entangled


def test_horodecki_is_bound_entangled():
    rho = horodecki(0.5)
    assert_bound_entangled(rho, dim=[3, 3])
