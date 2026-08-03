"""Shared quantum-information assertion helpers for the test suite.

These express the physical properties every state factory in the library is
supposed to satisfy, so individual tests read as statements about the physics
rather than about numpy internals.

A valid density matrix is square, Hermitian, trace one, and positive
semidefinite. A *bound entangled* state additionally has a positive partial
transpose (PPT). Per the project's testing choice we assert PPT only (no
separate entanglement witness): this reliably catches normalization errors,
sign errors, broken shapes, and states drifting out of the PPT set.
"""

import numpy as np
from toqito.state_props import is_ppt

# Density matrices here come from exact algebra, so equalities are tight; the
# only slack needed is for the tiny negative eigenvalues (~1e-16) that boundary
# (rank-deficient / extremal) states pick up from floating point.
_EQ_TOL = 1e-8
_PSD_TOL = 1e-9


def assert_hermitian(rho: np.ndarray, tol: float = _EQ_TOL) -> None:
    np.testing.assert_allclose(rho, rho.conj().T, atol=tol)


def assert_trace_one(rho: np.ndarray, tol: float = _EQ_TOL) -> None:
    np.testing.assert_allclose(np.trace(rho), 1.0, atol=tol)


def assert_psd(rho: np.ndarray, tol: float = _PSD_TOL) -> None:
    # Symmetrize first so a Hermitian-up-to-noise matrix yields real eigenvalues.
    eigvals = np.linalg.eigvalsh((rho + rho.conj().T) / 2)
    assert eigvals.min() >= -tol, f"not positive semidefinite: min eigenvalue {eigvals.min():.2e}"


def assert_density_matrix(rho: np.ndarray, dim=None) -> None:
    """Assert `rho` is a valid density matrix (square, Hermitian, trace 1, PSD)."""
    assert rho.ndim == 2 and rho.shape[0] == rho.shape[1], f"not square: shape {rho.shape}"
    if dim is not None:
        m, n = dim
        assert rho.shape[0] == m * n, f"shape {rho.shape} does not match dim {dim}"
    assert_hermitian(rho)
    assert_trace_one(rho)
    assert_psd(rho)


def assert_ppt(rho: np.ndarray, dim) -> None:
    """Assert `rho` has a positive partial transpose w.r.t. the bipartition `dim`."""
    assert is_ppt(rho, dim=list(dim)), "state is not PPT (partial transpose has a negative eigenvalue)"


def assert_bound_entangled(rho: np.ndarray, dim) -> None:
    """Assert `rho` is a valid density matrix *and* is PPT (the PPT-only BE check)."""
    assert_density_matrix(rho, dim)
    assert_ppt(rho, dim)
