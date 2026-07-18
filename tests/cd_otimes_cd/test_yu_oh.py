import numpy as np
import pytest

from bound_entangled.cd_otimes_cd.yu_oh import yu_oh, psi_ij, is_valid_yu_oh_input

from qi import assert_bound_entangled


class TestIsValidYuOhInput:
    def test_valid_interior_point(self):
        assert is_valid_yu_oh_input(3, 0.5, 0.1) is True

    def test_rejected_when_outside_the_unit_disk(self):
        # x**2 + y**2 = 1.62 > 1
        assert is_valid_yu_oh_input(3, 0.9, 0.9) is False

    def test_rejected_when_delta_non_positive(self):
        # Inside the unit disk (0.72 <= 1) but delta = 0.28 - 0.36 < 0.
        assert is_valid_yu_oh_input(3, 0.6, 0.6) is False


class TestPsiIj:
    def test_antisymmetry(self):
        np.testing.assert_allclose(psi_ij(3, 0, 2), -psi_ij(3, 2, 0))

    def test_nonzero_entries(self):
        # |ij> - |ji> for d=3, (i, j) = (0, 2): +1 at 0*3+2, -1 at 2*3+0.
        v = psi_ij(3, 0, 2)
        expected = np.zeros(9)
        expected[2] = 1.0
        expected[6] = -1.0
        np.testing.assert_allclose(v, expected)


class TestYuOh:
    @pytest.mark.parametrize("d", [3, 4])
    def test_is_bound_entangled(self, d):
        rho = yu_oh(d, 0.5, 0.1)
        assert_bound_entangled(rho, dim=[d, d])

    def test_rejects_invalid_parameters(self):
        with pytest.raises(AssertionError):
            yu_oh(3, 0.9, 0.9)
