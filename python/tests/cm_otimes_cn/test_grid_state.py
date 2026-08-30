"""Vertex indexing for grid states.

The states themselves are covered by the doctests on `grid_state` and
`generalized_grid_state`; this file covers the index arithmetic underneath,
where an off-by-one would silently produce a different (but still valid) state.
"""

import numpy as np

from bound_entangled.cm_otimes_cn.grid_state import ket, grid_component


def test_ket_places_a_one_at_the_row_major_index():
    np.testing.assert_allclose(ket((2, 3), (1, 2)), np.array([0, 0, 0, 0, 0, 1.0]))


def test_grid_component_is_normalized():
    gc = grid_component((2, 3), (0, 0), (1, 2))
    np.testing.assert_allclose(np.linalg.norm(gc), 1.0)
