/**
 * Shared test helpers: entrywise comparison of matrices, plus the handful of
 * textbook states the utils are checked against.
 */

import { expect } from 'vitest';
import { isComplex, isMatrix, multiply, norm } from 'mathjs';
import type { MatrixLike, Scalar, VectorLike } from '../src/types.js';

export function nested(m: MatrixLike): Scalar[][] {
  return (isMatrix(m) ? m.toArray() : m) as Scalar[][];
}

/** A vector as a flat array, whatever shape it arrived in. */
export function flat(v: VectorLike): Scalar[] {
  const data = (isMatrix(v) ? v.toArray() : v) as Scalar[] | Scalar[][];
  if (!Array.isArray(data[0])) {
    return data as Scalar[];
  }
  const rows = data as Scalar[][];
  return rows.length === 1 ? rows[0] : rows.map((row) => row[0]);
}

export function real(x: Scalar): number {
  return isComplex(x) ? x.re : x;
}

export function imaginary(x: Scalar): number {
  return isComplex(x) ? x.im : 0;
}

/**
 * Assert two matrices agree entrywise, real and imaginary parts alike.
 *
 * Deliberately makes a single assertion on the worst entry rather than one per
 * entry: a 256x256 comparison would otherwise be 131k `expect` calls, which
 * costs seconds. The message names the offending entry.
 */
export function expectMatrixClose(actual: MatrixLike, expected: MatrixLike, precision = 10): void {
  const a = nested(actual);
  const b = nested(expected);
  expect(a.length, 'row count differs').toBe(b.length);
  const tolerance = 0.5 * 10 ** -precision;
  let worst = 0;
  let where = '';
  for (let i = 0; i < a.length; i++) {
    expect(a[i].length, `row ${i} length differs`).toBe(b[i].length);
    for (let j = 0; j < a[i].length; j++) {
      const deviation = Math.max(
        Math.abs(real(a[i][j]) - real(b[i][j])),
        Math.abs(imaginary(a[i][j]) - imaginary(b[i][j])),
      );
      if (deviation > worst) {
        worst = deviation;
        where = `(${i}, ${j}): ${String(a[i][j])} vs ${String(b[i][j])}`;
      }
    }
  }
  expect(worst, `matrices differ at ${where}`).toBeLessThan(tolerance);
}

/** Assert two vectors agree entrywise, whatever shape they arrived in. */
export function expectVectorClose(actual: VectorLike, expected: VectorLike, precision = 10): void {
  expectMatrixClose([flat(actual)], [flat(expected)], precision);
}

/**
 * The Hermitian inner product <a|b>.
 *
 * mathjs already conjugates the first argument when multiplying two vectors,
 * so conjugating here as well would silently compute sum(a_i b_i) instead.
 */
export function innerProduct(a: VectorLike, b: VectorLike): Scalar {
  const x = flat(a);
  const y = flat(b);
  expect(x.length).toBe(y.length);
  return multiply(x, y) as Scalar;
}

/** Assert a list of vectors is an orthonormal basis of the expected dimension. */
export function expectOrthonormal(basis: readonly VectorLike[], dimension: number): void {
  for (const v of basis) {
    expect(flat(v).length, 'wrong vector length').toBe(dimension);
    expect(norm(flat(v) as Scalar[]) as number, 'vector is not normalized').toBeCloseTo(1, 10);
  }
  for (let i = 0; i < basis.length; i++) {
    for (let j = i + 1; j < basis.length; j++) {
      const overlap = innerProduct(basis[i], basis[j]);
      expect(real(overlap), `vectors ${i} and ${j} are not orthogonal`).toBeCloseTo(0, 10);
      expect(imaginary(overlap), `vectors ${i} and ${j} are not orthogonal`).toBeCloseTo(0, 10);
    }
  }
}

/** The n x n zero matrix, as a nested array. */
export function zeros(rows: number, columns = rows): number[][] {
  return Array.from({ length: rows }, () => new Array<number>(columns).fill(0));
}

/**
 * The "Tiles" unextendible product basis on C³ ⊗ C³, with the flat index of
 * |a>|b> being 3a + b.
 *
 * Reference: Bennett et al., https://arxiv.org/abs/quant-ph/9808030
 */
export function tilesBasis(): number[][] {
  const s = 1 / Math.sqrt(2);
  const t = 1 / 3;
  const vector = (entries: Record<number, number>): number[] =>
    Array.from({ length: 9 }, (_, i) => entries[i] ?? 0);
  return [
    vector({ 0: s, 1: -s }), // |0>(|0> - |1>)/sqrt(2)
    vector({ 7: s, 8: -s }), // |2>(|1> - |2>)/sqrt(2)
    vector({ 2: s, 5: -s }), // (|0> - |1>)|2>/sqrt(2)
    vector({ 3: s, 6: -s }), // (|1> - |2>)|0>/sqrt(2)
    new Array<number>(9).fill(t), // (|0>+|1>+|2>)(|0>+|1>+|2>)/3
  ];
}

/**
 * The Werner-like mixture p |Φ+><Φ+| + (1 - p) I/4 of two qubits, which is PPT
 * exactly for p <= 1/3.
 */
export function isotropicTwoQubit(p: number): number[][] {
  const rho = zeros(4);
  const bell = [
    [0.5, 0, 0, 0.5],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0.5, 0, 0, 0.5],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      rho[i][j] = p * bell[i][j] + (i === j ? (1 - p) / 4 : 0);
    }
  }
  return rho;
}
