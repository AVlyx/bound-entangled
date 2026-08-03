import numpy as np
import pytest

from bound_entangled.multipartite.smolin import smolin

from qi import assert_bound_entangled


def test_smolin_default_is_bound_entangled():
    rho = smolin()
    assert rho.shape == (16, 16)
    assert_bound_entangled(rho, dim=[4, 4])
