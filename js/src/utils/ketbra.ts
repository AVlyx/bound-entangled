import { conj, matrix, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { VectorLike } from '../types.js';
import { toVector } from './internal.js';

/**
 * The outer product |a><b|.
 *
 * @param a - the "ket" vector.
 * @param b - the "bra" vector (its complex conjugate is used). Defaults to `a`.
 * @returns the rank-1 operator |a><b|.
 */
export function ketbra(a: VectorLike, b: VectorLike = a): Matrix {
  const ket = matrix(toVector(a).map((entry) => [entry])); // column, n x 1
  const bra = conj(matrix([toVector(b)])); // conjugated row, 1 x m
  return multiply(ket, bra);
}
