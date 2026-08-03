/**
 * Input normalization shared by the utils. Every public function accepts the
 * loose `VectorLike` / `MatrixLike` shapes and immediately funnels them through
 * here, so the numeric code only ever sees plain nested arrays.
 */

import { add, complex, isComplex, isMatrix } from 'mathjs';
import type { Complex, Matrix } from 'mathjs';
import type { Dims, MatrixLike, Scalar, VectorLike } from '../types.js';

export function fail(message: string): never {
  // Prefixed so the origin of the error is unambiguous in a user's stack trace.
  throw new Error(`bound-entangled: ${message}`);
}

/**
 * The sum of a non-empty list of matrices. Most states in this library are a
 * weighted sum of rank-1 projectors, so this is the shape of nearly every
 * construction.
 */
export function sumMatrices(terms: readonly Matrix[]): Matrix {
  if (terms.length === 0) {
    fail('cannot sum an empty list of matrices');
  }
  let total = terms[0];
  for (let i = 1; i < terms.length; i++) {
    total = add(total, terms[i]);
  }
  return total;
}

/**
 * `exp(2πi · exponent / order)`, an `order`-th root of unity.
 *
 * Built straight from a cosine and a sine rather than by raising a complex
 * number to a power: reducing the exponent modulo `order` first keeps the
 * angle small and lands exactly on the quarter turns.
 */
export function rootOfUnity(exponent: number, order: number): Complex {
  const reduced = ((exponent % order) + order) % order;
  const angle = (2 * Math.PI * reduced) / order;
  return complex(Math.cos(angle), Math.sin(angle));
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

/**
 * The flat index of a composite basis state. A plain number is taken to be the
 * flat index already; a list gives one local index per subsystem.
 */
export function flatIndex(dims: Dims, index: number | readonly number[]): number {
  const total = totalDimension(dims);
  if (typeof index === 'number') {
    if (!Number.isInteger(index) || index < 0 || index >= total) {
      fail(`index ${index} is out of range for dimension ${total}`);
    }
    return index;
  }
  if (index.length !== dims.length) {
    fail(`expected ${dims.length} local index/indices, got ${index.length}`);
  }
  const stride = strides(dims);
  let flat = 0;
  for (let s = 0; s < dims.length; s++) {
    const local = index[s];
    if (!Number.isInteger(local) || local < 0 || local >= dims[s]) {
      fail(`index ${local} is out of range for subsystem ${s} of dimension ${dims[s]}`);
    }
    flat += local * stride[s];
  }
  return flat;
}
