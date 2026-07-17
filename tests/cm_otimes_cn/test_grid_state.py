import numpy as np
import pytest

from cm_otimes_cn.grid_state import ket, grid_component, grid_state

from qi import assert_bound_entangled


def test_ket_places_a_one_at_the_row_major_index():
    np.testing.assert_allclose(ket((2, 3), (1, 2)), np.array([0, 0, 0, 0, 0, 1.0]))


@pytest.mark.parametrize("ij", [(2, 0), (0, 3), (5, 5)])
def test_ket_raises_for_out_of_range_vertices(ij):
    with pytest.raises(IndexError):
        ket((2, 3), ij)


def test_grid_component_is_normalized():
    gc = grid_component((2, 3), (0, 0), (1, 2))
    np.testing.assert_allclose(np.linalg.norm(gc), 1.0)


def test_grid_state_on_a_small_path_is_valid_and_ppt():
    # A 2x3 grid state over three edges; the resulting mixture is PPT.
    rho = grid_state(
        (2, 3),
        ((0, 0), (0, 1)),
        ((0, 1), (0, 2)),
        ((0, 0), (1, 0)),
    )
    assert_bound_entangled(rho, dim=[2, 3])
