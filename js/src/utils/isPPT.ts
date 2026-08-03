import type { Dims, MatrixLike } from '../types.js';
import { DEFAULT_TOLERANCE, isPSD } from './isPSD.js';
import { partialTranspose } from './partialTranspose.js';

/**
 * Whether `rho` has a positive partial transpose across the given splitting.
 *
 * The Peres–Horodecki criterion: every separable state is PPT, so an NPT state
 * is certainly entangled. In 2 ⊗ 2 and 2 ⊗ 3 the converse holds too, but from
 * 3 ⊗ 3 and 2 ⊗ 4 on there are PPT states that are nevertheless entangled —
 * the bound entangled states this library collects.
 *
 * @param rho - the density matrix to test, of dimension `prod(dims)`.
 * @param dims - the subsystem dimensions, e.g. `[3, 3]` for C³ ⊗ C³.
 * @param sys - the subsystem(s) to transpose, **zero-indexed**. Defaults to `1`.
 * @param tol - eigenvalues above `-tol` count as non-negative.
 * @returns true if the partial transpose is positive semidefinite.
 */
export function isPPT(
  rho: MatrixLike,
  dims: Dims,
  sys: number | number[] = 1,
  tol: number = DEFAULT_TOLERANCE,
): boolean {
  return isPSD(partialTranspose(rho, dims, sys), tol);
}
