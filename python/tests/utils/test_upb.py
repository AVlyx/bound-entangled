"""The UPB mixture formula.

That the resulting state is valid, PPT, entangled, and annihilates its basis is
covered by the doctest on `upb`; this file pins the formula itself, free of any
physics.
"""

import numpy as np

from bound_entangled.utils import upb


def test_upb_formula_on_a_trivial_basis():
    # upb([v]) with a single computational basis vector must return
    # (I - |v><v|) / (D - 1) exactly, independent of any physics.
    v = np.zeros((4, 1))
    v[0, 0] = 1.0
    expected = (np.identity(4) - np.diag([1.0, 0.0, 0.0, 0.0])) / 3.0
    np.testing.assert_allclose(upb([v]), expected)
