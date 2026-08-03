import { matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Dims, MatrixLike, Scalar } from '../types.js';
import { fail, strides, toSquareMatrixArray, totalDimension } from './internal.js';

/**
 * The partial transpose of `rho` over the chosen subsystems.
 *
 * Writing the matrix elements in the product basis as
 * <i_0 ... i_{k-1}| rho |j_0 ... j_{k-1}>, the partial transpose over a set S
 * of subsystems swaps i_s and j_s for every s in S and leaves the other
 * indices untouched. A state is PPT ("positive partial transpose") when the
 * result is still positive semidefinite; see {@link isPPT}.
 *
 * @param rho - the operator to partially transpose, of dimension `prod(dims)`.
 * @param dims - the subsystem dimensions, e.g. `[3, 3]` for C³ ⊗ C³.
 * @param sys - the subsystem(s) to transpose, **zero-indexed**. Defaults to `1`,
 *   the second subsystem. For a bipartite state, transposing either subsystem
 *   gives matrices with the same spectrum, so the choice rarely matters.
 * @returns the partially transposed operator.
 */
export function partialTranspose(rho: MatrixLike, dims: Dims, sys: number | number[] = 1): Matrix {
  const { rows, dimension } = toSquareMatrixArray(rho);
  const total = totalDimension(dims);
  if (dimension !== total) {
    fail(`matrix of dimension ${dimension} does not match dims [${dims.join(', ')}] (product ${total})`);
  }

  const requested = typeof sys === 'number' ? [sys] : sys;
  for (const s of requested) {
    if (!Number.isInteger(s) || s < 0 || s >= dims.length) {
      fail(`subsystem ${s} is out of range for ${dims.length} subsystem(s) (indices are zero-based)`);
    }
  }
  const transposed = [...new Set(requested)];
  const stride = strides(dims);

  const out: Scalar[][] = [];
  for (let i = 0; i < dimension; i++) {
    const row = new Array<Scalar>(dimension);
    for (let j = 0; j < dimension; j++) {
      // Swap the local indices of the transposed subsystems, then read the
      // source element off the original matrix.
      let sourceRow = i;
      let sourceColumn = j;
      for (const s of transposed) {
        const local = dims[s];
        const iLocal = Math.floor(i / stride[s]) % local;
        const jLocal = Math.floor(j / stride[s]) % local;
        sourceRow += (jLocal - iLocal) * stride[s];
        sourceColumn += (iLocal - jLocal) * stride[s];
      }
      row[j] = rows[sourceRow][sourceColumn];
    }
    out.push(row);
  }
  return matrix(out);
}
