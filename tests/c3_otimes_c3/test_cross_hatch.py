from c3_otimes_c3.cross_hatch import cross_hatch

from qi import assert_bound_entangled


def test_cross_hatch_is_bound_entangled():
    rho = cross_hatch()
    assert rho.shape == (9, 9)
    assert_bound_entangled(rho, dim=[3, 3])
