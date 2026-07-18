import numpy as np
import pytest
from toqito.state_props import is_ppt

from bound_entangled.cm_otimes_cn.random_not_bound_entangled import (
    random_NPT,
    random_PPT,
    random_PPT_close_to_the_PPT_edge,
)

from qi import assert_density_matrix


# These factories reject-sample until the desired property holds, so the
# assertions below are true by construction for any RNG state; the seed only
# keeps runtime and any failure output reproducible.
@pytest.fixture(autouse=True)
def _seed():
    np.random.seed(1234)


def test_random_PPT_is_a_ppt_density_matrix():
    rho = random_PPT((2, 2))
    assert_density_matrix(rho, dim=[2, 2])
    assert is_ppt(rho, dim=[2, 2])


def test_random_NPT_is_a_valid_state_that_is_not_ppt():
    rho = random_NPT((2, 2))
    assert_density_matrix(rho, dim=[2, 2])
    assert not is_ppt(rho, dim=[2, 2])


def test_random_PPT_close_to_the_edge_stays_ppt():
    rho = random_PPT_close_to_the_PPT_edge((2, 3), 20)
    assert_density_matrix(rho, dim=[2, 3])
    assert is_ppt(rho, dim=[2, 3])
