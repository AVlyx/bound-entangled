/**
 * Input normalization shared by the utils. Every public function accepts the
 * loose `VectorLike` / `MatrixLike` shapes and immediately funnels them through
 * here, so the numeric code only ever sees plain nested arrays.
 */

import { isComplex, isMatrix } from 'mathjs';
import type { Dims, MatrixLike, Scalar, VectorLike } from '../types.js';

export function fail(message: string): never {
  // Prefixed so the origin of the error is unambiguous in a user's stack trace.
  throw new Error(`bound-entangled: ${message}`);
}

/** The real part of a scalar, whether it is a plain number or a mathjs Complex. */
export function realPart(x: Scalar): number {
  if (typeof x === 'number') return x;
  if (isComplex(x)) return x.re;
  return fail(`expected a number or a mathjs Complex, got ${typeof x}`);
}

/** The imaginary part of a scalar (zero for a plain number). */
export function imagPart(x: Scalar): number {
  if (typeof x === 'number') return 0;
  if (isComplex(x)) return x.im;
  return fail(`expected a number or a mathjs Complex, got ${typeof x}`);
}

/**
 * Normalize a ket/bra into a flat array of scalars. Flat arrays, column
 * vectors, row vectors and mathjs matrices of any of those are all accepted.
 */
export function toVector(v: VectorLike): Scalar[] {
  const data: unknown = isMatrix(v) ? v.toArray() : v;
  if (!Array.isArray(data) || data.length === 0) {
    fail('expected a non-empty vector');
  }
  if (!data.some((entry) => Array.isArray(entry))) {
    return data as Scalar[];
  }
  const rows = data as unknown[][];
  if (rows.every((row) => Array.isArray(row) && row.length === 1)) {
    return rows.map((row) => row[0] as Scalar); // column vector
  }
  if (rows.length === 1 && Array.isArray(rows[0])) {
    return rows[0] as Scalar[]; // row vector
  }
  return fail(`expected a vector, got a ${rows.length}x${rows[0].length} matrix`);
}

/** Normalize a matrix into a rectangular nested array of scalars. */
export function toMatrixArray(m: MatrixLike): Scalar[][] {
  const data: unknown = isMatrix(m) ? m.toArray() : m;
  if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
    fail('expected a non-empty 2-D matrix');
  }
  const rows = data as Scalar[][];
  const columns = rows[0].length;
  for (const row of rows) {
    if (!Array.isArray(row) || row.length !== columns) {
      fail('expected a rectangular 2-D matrix (all rows must have the same length)');
    }
  }
  return rows;
}

/** Normalize a matrix and assert it is square, returning it with its dimension. */
export function toSquareMatrixArray(m: MatrixLike): { rows: Scalar[][]; dimension: number } {
  const rows = toMatrixArray(m);
  const columns = rows[0].length;
  if (rows.length !== columns) {
    fail(`expected a square matrix, got ${rows.length}x${columns}`);
  }
  return { rows, dimension: rows.length };
}

/** Validate subsystem dimensions and return the dimension of the full space. */
export function totalDimension(dims: Dims): number {
  if (dims.length === 0) {
    fail('expected at least one subsystem dimension');
  }
  let total = 1;
  for (const d of dims) {
    if (!Number.isInteger(d) || d < 1) {
      fail(`subsystem dimensions must be positive integers, got [${dims.join(', ')}]`);
    }
    total *= d;
  }
  return total;
}

/**
 * Row-major strides of a composite index: the flat index of the basis state
 * |i_0 ... i_{k-1}> is the dot product of the local indices with these.
 */
export function strides(dims: Dims): number[] {
  const result = new Array<number>(dims.length);
  let stride = 1;
  for (let s = dims.length - 1; s >= 0; s--) {
    result[s] = stride;
    stride *= dims[s];
  }
  return result;
}
