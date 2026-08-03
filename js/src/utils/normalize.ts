import { divide, matrix, norm, trace } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { MatrixLike, Scalar, VectorLike } from '../types.js';
import { fail, imagPart, realPart, toSquareMatrixArray, toVector } from './internal.js';

/**
 * The unit vector |v> / || |v> ||, in the Euclidean (2-)norm.
 *
 * @param v - the vector to scale.
 * @returns the normalized vector.
 */
export function normalize(v: VectorLike): Matrix {
  const vector = matrix(toVector(v));
  const length = norm(vector) as number;
  if (length === 0) {
    fail('cannot normalize the zero vector');
  }
  return divide(vector, length) as Matrix;
}

/**
 * The matrix rescaled to unit trace, turning a positive operator into a
 * density matrix.
 *
 * @param rho - the square matrix to scale.
 * @returns `rho / tr(rho)`.
 */
export function normalizeTrace(rho: MatrixLike): Matrix {
  const { rows } = toSquareMatrixArray(rho);
  const operator = matrix(rows);
  const total = trace(operator) as Scalar;
  if (realPart(total) === 0 && imagPart(total) === 0) {
    fail('cannot normalize a traceless matrix');
  }
  return divide(operator, total) as Matrix;
}
