import pytest
import numpy as np
from toqito.perms import permute_systems

from bound_entangled.cd_otimes_cd import orthogonal_singlet, badziag_private_singlet

from qi import assert_bound_entangled, assert_density_matrix


def _permute_to_alice_bob(rho: np.ndarray, shield_dim: int) -> np.ndarray:
    """Reorder ABA'B' → AA'BB' so that is_ppt sees the correct Alice|Bob cut.

    Both states are built in ABA'B' ordering (two-qubit pair A,B of dim 2 each;
    shield pair A',B' of dim shield_dim each).  The physical PPT bipartition is
    Alice=(A,A') vs Bob=(B,B'), which requires the matrix in AA'BB' ordering.
    """
    d = shield_dim
    # Systems in ABA'B': 1=A(2), 2=B(2), 3=A'(d), 4=B'(d)
    # Permute to [A, A', B, B'] = [1, 3, 2, 4]
    return permute_systems(rho, [0, 2, 1, 3], dim=[2, 2, d, d])


class TestBadziagPrivateSinglet:
    @pytest.mark.parametrize("d", [2, 3])
    def test_is_bound_entangled(self, d):
        rho = badziag_private_singlet(d)
        rho_perm = _permute_to_alice_bob(rho, d)
        assert_bound_entangled(rho_perm, dim=[2 * d, 2 * d])

    @pytest.mark.parametrize("d", [2, 3])
    def test_shape(self, d):
        rho = badziag_private_singlet(d)
        assert rho.shape == (4 * d * d, 4 * d * d)

    @pytest.mark.parametrize("d", [2, 3])
    def test_is_valid_density_matrix(self, d):
        rho = badziag_private_singlet(d)
        assert_density_matrix(rho, dim=[2 * d, 2 * d])


class TestOrthogonalSinglet:
    @pytest.mark.parametrize("d", [2, 3])
    def test_is_bound_entangled(self, d):
        rho = orthogonal_singlet(d)
        rho_perm = _permute_to_alice_bob(rho, d)
        assert_bound_entangled(rho_perm, dim=[2 * d, 2 * d])

    @pytest.mark.parametrize("d", [2, 3])
    def test_shape(self, d):
        rho = orthogonal_singlet(d)
        assert rho.shape == (4 * d * d, 4 * d * d)

    @pytest.mark.parametrize("d", [2, 3])
    def test_is_valid_density_matrix(self, d):
        rho = orthogonal_singlet(d)
        assert_density_matrix(rho, dim=[2 * d, 2 * d])

    def test_rejects_invalid_shield_dim(self):
        with pytest.raises(ValueError):
            orthogonal_singlet(5)
