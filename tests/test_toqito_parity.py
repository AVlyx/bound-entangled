"""The package no longer depends on toqito at runtime: these tests pin every piece
that used to come from toqito, entrywise, against toqito itself."""

import numpy as np
import pytest
import toqito.matrices
import toqito.matrix_ops
import toqito.perms
import toqito.state_props
import toqito.states

from bound_entangled import utils
from bound_entangled.c2_otimes_c4 import horodecki as horodecki_2_4
from bound_entangled.c3_otimes_c3 import chessboard, horodecki as horodecki_3_3
from bound_entangled.c3_otimes_c3.upb.tiles_UPB import tiles_basis
from bound_entangled.cd_otimes_cd import breuer

RNG = np.random.default_rng(2026)


@pytest.mark.parametrize("dim", [1, 2, 3, 5])
def test_max_entangled(dim):
    assert np.allclose(utils.max_entangled(dim), toqito.states.max_entangled(dim))


@pytest.mark.parametrize("ind", [0, 1, 2, 3, [1, 2], [3, 0, 2, 1]])
def test_pauli(ind):
    assert np.allclose(utils.pauli(ind), toqito.matrices.pauli(ind))


@pytest.mark.parametrize("dim", [1, 2, 3, 6])
def test_fourier(dim):
    assert np.allclose(utils.fourier(dim), toqito.matrices.fourier(dim))


def test_tensor():
    factors = [RNG.normal(size=2), RNG.normal(size=(3, 3)), RNG.normal(size=4)]
    assert np.allclose(utils.tensor(*factors), toqito.matrix_ops.tensor(*factors))


@pytest.mark.parametrize("perm", [[0, 1, 2], [1, 2, 0], [2, 0, 1], [0, 2, 1], [2, 1, 0]])
def test_permute_systems(perm):
    dim = [2, 3, 4]
    mat = RNG.normal(size=(24, 24)) + 1j * RNG.normal(size=(24, 24))
    assert np.allclose(utils.permute_systems(mat, perm, dim), toqito.perms.permute_systems(mat, perm, dim))


@pytest.mark.parametrize("dim", [[2, 2], [2, 3], [3, 4]])
def test_partial_transpose_and_is_ppt(dim):
    n = dim[0] * dim[1]
    mat = RNG.normal(size=(n, n))
    assert np.allclose(utils.partial_transpose(mat, dim), toqito.matrix_ops.partial_transpose(mat, [1], dim))
    for _ in range(50):
        rho = utils.random_density_matrix(n)
        assert utils.is_ppt(rho, dim) == toqito.state_props.is_ppt(rho, dim=dim)


@pytest.mark.parametrize("a", [0.0, 0.2, 0.5, 0.9, 1.0])
def test_horodecki(a):
    assert np.allclose(horodecki_2_4(a), toqito.states.horodecki(a, dim=[2, 4]))
    assert np.allclose(horodecki_3_3(a), toqito.states.horodecki(a, dim=[3, 3]))


def test_chessboard():
    a, b, c, d, m, n = RNG.normal(size=6)
    # explicit s and t give toqito's state exactly
    assert np.allclose(chessboard(a, b, c, d, m, n, 0.3, -0.7), toqito.states.chessboard([a, b, c, d, m, n], 0.3, -0.7))
    # the default s is Bruss-Peres' a*c/n, where toqito's is c/n
    assert np.allclose(chessboard(a, b, c, d, m, n), toqito.states.chessboard([a, b, c, d, m, n], a * c / n))


def test_tiles_basis():
    assert all(np.allclose(v, toqito.states.tile(i)) for i, v in enumerate(tiles_basis()))


@pytest.mark.parametrize("dim", [2, 4, 6])
@pytest.mark.parametrize("lam", [0.0, 0.1, 1 / 6, 0.5, 1.0])
def test_breuer(dim, lam):
    assert np.allclose(breuer(dim, lam), toqito.states.breuer(dim, lam))


@pytest.mark.parametrize("dim", [4, 6, 8])
def test_breuer_ppt_threshold(dim):
    """PPT exactly up to lam = 1 / (d + 2), Breuer's own condition."""
    threshold = 1 / (dim + 2)
    assert utils.is_ppt(breuer(dim, threshold), [dim, dim])
    assert not utils.is_ppt(breuer(dim, threshold + 1e-3), [dim, dim])
