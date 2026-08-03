/**
 * Shared test helpers: entrywise comparison of matrices, plus the handful of
 * textbook states the utils are checked against.
 */

import { expect } from 'vitest';
import { isComplex, isMatrix } from 'mathjs';
import type { MatrixLike, Scalar } from '../src/types.js';

export function nested(m: MatrixLike): Scalar[][] {
  return (isMatrix(m) ? m.toArray() : m) as Scalar[][];
}

export function real(x: Scalar): number {
  return isComplex(x) ? x.re : x;
}

export function imaginary(x: Scalar): number {
  return isComplex(x) ? x.im : 0;
}

/** Assert two matrices agree entrywise, real and imaginary parts alike. */
export function expectMatrixClose(actual: MatrixLike, expected: MatrixLike, precision = 10): void {
  const a = nested(actual);
  const b = nested(expected);
  expect(a.length).toBe(b.length);
  for (let i = 0; i < a.length; i++) {
    expect(a[i].length).toBe(b[i].length);
    for (let j = 0; j < a[i].length; j++) {
      expect(real(a[i][j])).toBeCloseTo(real(b[i][j]), precision);
      expect(imaginary(a[i][j])).toBeCloseTo(imaginary(b[i][j]), precision);
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
