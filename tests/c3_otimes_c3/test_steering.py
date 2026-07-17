from c3_otimes_c3.steering import steering_state

from qi import assert_bound_entangled


def test_steering_state_is_bound_entangled():
    rho = steering_state(0.5, 0.5)
    assert rho.shape == (9, 9)
    assert_bound_entangled(rho, dim=[3, 3])
