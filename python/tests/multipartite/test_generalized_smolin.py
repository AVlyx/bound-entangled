import numpy as np
import pytest

from bound_entangled.multipartite.generalized_smolin import generalized_smolin
from bound_entangled.multipartite.smolin import smolin

from qi import assert_bound_entangled, assert_density_matrix


@pytest.mark.parametrize("systems", [4, 6, 8])
def test_generalized_smolin_is_valid_density_matrix(systems):
    rho = generalized_smolin(systems)
    dim = 2**systems
    assert rho.shape == (dim, dim)
    assert_density_matrix(rho)


def test_generalized_smolin_6_is_ppt_across_2_4_split():
    # The 6-qubit GSS state is PPT across the 2-qubit | 4-qubit cut (dim [4,16])
    # but not across the equal 3|3 split — it is a genuinely multipartite state.
    from qi import assert_ppt

    rho = generalized_smolin(6)
    assert_ppt(rho, dim=[4, 16])


@pytest.mark.parametrize("systems", [4, 6])
def test_generalized_smolin_is_hermitian(systems):
    rho = generalized_smolin(systems)
    np.testing.assert_allclose(rho, rho.conj().T, atol=1e-12)
