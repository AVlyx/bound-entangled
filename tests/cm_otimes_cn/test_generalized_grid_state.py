import numpy as np
import pytest

from cm_otimes_cn.generalized_grid_state import grid_component, generalized_grid_state
from cm_otimes_cn.grid_state import ket

from qi import assert_density_matrix


@pytest.mark.parametrize("ij", [(3, 0), (0, 3)])
def test_grid_component_raises_for_out_of_range_vertices(ij):
    with pytest.raises(IndexError):
        grid_component((3, 3), (0, 0), ij)


def test_generalized_grid_state_is_a_valid_density_matrix():
    rho = generalized_grid_state(
        (3, 3),
        [(0, 0), (1, 1)],
        [(0, 1), (2, 2)],
    )
    assert_density_matrix(rho, dim=[3, 3])
