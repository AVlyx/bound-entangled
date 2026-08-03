/**
 * Shared quantum-information assertion helpers for the test suite.
 *
 * These express the physical properties every state factory in the library is
 * supposed to satisfy, so individual tests read as statements about the
 * physics rather than about matrix internals.
 *
 * A valid density matrix is square, Hermitian, trace one, and positive
 * semidefinite. A *bound entangled* state additionally has a positive partial
 * transpose (PPT). Per the project's testing choice we assert PPT only (no
 * separate entanglement witness): this reliably catches normalization errors,
 * sign errors, broken shapes, and states drifting out of the PPT set.
 */

import { expect } from 'vitest';
import { isPPT, isPSD } from '../src/index.js';
import type { Dims, MatrixLike } from '../src/types.js';
import { imaginary, nested, real } from './helpers.js';

// Density matrices here come from exact algebra, so equalities are tight; the
// only slack needed is for the tiny negative eigenvalues (~1e-16) that boundary
// (rank-deficient / extremal) states pick up from floating point.
const EQ_TOL = 1e-8;

export function expectSquare(rho: MatrixLike): number {
  const rows = nested(rho);
  expect(rows[0].length, `not square: ${rows.length}x${rows[0].length}`).toBe(rows.length);
  return rows.length;
}

/**
 * Assert `rho` equals its own conjugate transpose.
 *
 * Scans for the worst-offending entry and makes a single assertion: one
 * `expect` per entry would be 131k calls on a 256x256 state, which costs
 * seconds of test time.
 */
export function expectHermitian(rho: MatrixLike, tol = EQ_TOL): void {
  const rows = nested(rho);
  let worst = 0;
  let where = '';
  for (let i = 0; i < rows.length; i++) {
    for (let j = i; j < rows.length; j++) {
      const deviation = Math.max(
        Math.abs(real(rows[i][j]) - real(rows[j][i])),
        Math.abs(imaginary(rows[i][j]) + imaginary(rows[j][i])),
      );
      if (deviation > worst) {
        worst = deviation;
        where = `(${i}, ${j})`;
      }
    }
  }
  expect(worst, `not Hermitian at ${where}`).toBeLessThan(tol);
}

export function expectTraceOne(rho: MatrixLike, tol = EQ_TOL): void {
  const rows = nested(rho);
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    total += real(rows[i][i]);
  }
  expect(total, 'trace is not one').toBeCloseTo(1, -Math.log10(tol));
}

export function expectPSD(rho: MatrixLike): void {
  expect(isPSD(rho), 'not positive semidefinite').toBe(true);
}

/** Assert `rho` is a valid density matrix (square, Hermitian, trace 1, PSD). */
export function expectDensityMatrix(rho: MatrixLike, dims?: Dims): void {
  const dimension = expectSquare(rho);
  if (dims !== undefined) {
    const total = dims.reduce((product, d) => product * d, 1);
    expect(dimension, `dimension ${dimension} does not match dims [${dims.join(', ')}]`).toBe(total);
  }
  expectHermitian(rho);
  expectTraceOne(rho);
  expectPSD(rho);
}

/** Assert `rho` has a positive partial transpose w.r.t. the splitting `dims`. */
export function expectPPT(rho: MatrixLike, dims: Dims): void {
  expect(isPPT(rho, dims), 'the partial transpose has a negative eigenvalue').toBe(true);
}

/** Assert `rho` is a valid density matrix *and* is PPT (the PPT-only BE check). */
export function expectBoundEntangled(rho: MatrixLike, dims: Dims): void {
  expectDensityMatrix(rho, dims);
  expectPPT(rho, dims);
}
