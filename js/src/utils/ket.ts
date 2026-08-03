import { matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Dims } from '../types.js';
import { flatIndex, totalDimension } from './internal.js';

/**
 * A computational basis vector.
 *
 * With a single dimension this is the standard basis vector of C^dim:
 * `ket(3, 1)` is |1> = (0, 1, 0). With several, it is a product basis state of
 * the composite space, indexed subsystem by subsystem: `ket([3, 3], [1, 2])`
 * is |12> in C³ ⊗ C³. A plain number against composite dimensions is read as
 * the flat index, so `ket([3, 3], 5)` is the same vector.
 *
 * @param dims - the dimension, or the subsystem dimensions of a composite space.
 * @param index - the flat index, or one local index per subsystem.
 * @returns the basis vector, as a flat vector of length `prod(dims)`.
 */
export function ket(dims: number | Dims, index: number | readonly number[]): Matrix {
  const dimensions = typeof dims === 'number' ? [dims] : dims;
  const data = new Array<number>(totalDimension(dimensions)).fill(0);
  data[flatIndex(dimensions, index)] = 1;
  return matrix(data);
}
