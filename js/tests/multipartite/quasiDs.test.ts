import { describe, expect, it } from 'vitest';
import { multiply, transpose } from 'mathjs';
import type { Matrix } from 'mathjs';
import { dickeIso, quasiDs, quasiDsDickeBasis } from '../../src/multipartite/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectMatrixClose, nested, real, zeros } from '../helpers.js';

/** The main diagonal of a matrix, as plain numbers. */
function diagonal(m: Matrix): number[] {
  const rows = nested(m);
  return rows.map((row, i) => real(row[i]));
}

describe('quasiDs', () => {
  it.each([
    [3, 1, 1],
    [3, 1, -1],
    [5, 1, 1],
  ] as const)('is bound entangled for n=%i, z=%i, sigma=%i', (n, z, sigma) => {
    const rho = quasiDs({ n, z, sigma });
    expectBoundEntangled(rho, [2, 2 ** (n - 1)]);
  });

  it('matches the explicit three-qubit state', () => {
    // Row/column order is the computational basis |i_3 i_2 i_1> with qubit k
    // contributing 2^k, i.e. the Dicke weight of a row is its bit count.
    const expected = zeros(8);
    const set = (i: number, j: number, value: number) => {
      expected[i][j] = value;
    };
    set(0, 0, 0.2);
    set(0, 7, 0.1);
    set(7, 0, 0.1);
    set(7, 7, 0.2);
    for (const i of [1, 2, 4]) for (const j of [1, 2, 4]) set(i, j, 0.1);
    for (const i of [3, 5, 6]) for (const j of [3, 5, 6]) set(i, j, 0.1);

    expectMatrixClose(quasiDs({ n: 3, z: 1, sigma: 1 }), expected);
  });

  it('flips only the two corners when sigma flips', () => {
    const plus = nested(quasiDs({ n: 3, z: 1, sigma: 1 }));
    const minus = nested(quasiDs({ n: 3, z: 1, sigma: -1 }));
    expect(real(minus[0][7])).toBeCloseTo(-real(plus[0][7]), 12);
    expect(real(minus[7][0])).toBeCloseTo(-real(plus[7][0]), 12);
    expect(real(minus[0][0])).toBeCloseTo(real(plus[0][0]), 12);
  });

  it('rejects an even, non-integer or too small qubit count', () => {
    expect(() => quasiDs({ n: 4, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    expect(() => quasiDs({ n: 3.5, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    expect(() => quasiDs({ n: -3, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    expect(() => quasiDs({ n: 1, z: 1, sigma: 1 })).toThrow(/at least 3 qubits/);
  });

  it('rejects a sign other than +1 or -1', () => {
    expect(() => quasiDs({ n: 3, z: 1, sigma: 0 as 1 })).toThrow(/sigma must be/);
  });
});

describe('quasiDsDickeBasis', () => {
  it('is the explicit (n + 1) x (n + 1) matrix for n = 3, z = 1', () => {
    // D(z) = diag(binom(3,k) f_{1-k}(1)) = diag(2, 3, 3, 2), corners +-1,
    // all over 2 (4 + z)^K = 10.
    expectMatrixClose(quasiDsDickeBasis({ n: 3, z: 1, sigma: 1 }), [
      [0.2, 0, 0, 0.1],
      [0, 0.3, 0, 0],
      [0, 0, 0.3, 0],
      [0.1, 0, 0, 0.2],
    ]);
    expectMatrixClose(quasiDsDickeBasis({ n: 3, z: 1, sigma: -1 }), [
      [0.2, 0, 0, -0.1],
      [0, 0.3, 0, 0],
      [0, 0, 0.3, 0],
      [-0.1, 0, 0, 0.2],
    ]);
  });

  it('reproduces binom(n, k) f_{K-k}(z) on the diagonal for n = 5', () => {
    // f_k(1) = 1, 2, 5, 2, 1 and K = 2, so the unscaled diagonal is
    // [1*5, 5*2, 10*1, 10*1, 5*2, 1*5]; the scale is 2 (4 + 1)^2 = 50.
    const scaled = diagonal(quasiDsDickeBasis({ n: 5, z: 1, sigma: 1 })).map((x) => x * 50);
    expect(scaled.map((x) => Math.round(x * 1e9) / 1e9)).toEqual([5, 10, 10, 10, 10, 5]);
  });

  it('reproduces binom(n, k) f_{K-k}(z) on the diagonal for n = 9', () => {
    // The backward half of the f_k recurrence is what makes the negative
    // indices K - k (here down to -5) resolve; n = 9 exercises all of them.
    const scaled = diagonal(quasiDsDickeBasis({ n: 9, z: 1, sigma: 1 })).map((x) => x * 2 * 5 ** 4);
    expect(scaled.map((x) => Math.round(x * 1e6) / 1e6)).toEqual([
      34, 117, 180, 168, 126, 126, 168, 180, 117, 34,
    ]);
  });

  it('has unit trace', () => {
    for (const n of [3, 5, 7, 9]) {
      const trace = diagonal(quasiDsDickeBasis({ n, z: 1, sigma: 1 })).reduce((a, b) => a + b, 0);
      expect(trace, `trace for n = ${n}`).toBeCloseTo(1, 10);
    }
  });
});

describe('dickeIso', () => {
  it('is the explicit 2^n x (n + 1) isometry for n = 3', () => {
    const third = 1 / Math.sqrt(3);
    expectMatrixClose(dickeIso(3), [
      [1, 0, 0, 0],
      [0, third, 0, 0],
      [0, third, 0, 0],
      [0, 0, third, 0],
      [0, third, 0, 0],
      [0, 0, third, 0],
      [0, 0, third, 0],
      [0, 0, 0, 1],
    ]);
  });

  it('has orthonormal columns', () => {
    for (const n of [1, 2, 3, 5]) {
      const v = dickeIso(n);
      const identityLike = zeros(n + 1).map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
      expectMatrixClose(multiply(transpose(v), v) as Matrix, identityLike);
    }
  });

  it('rejects a non-positive qubit count', () => {
    expect(() => dickeIso(0)).toThrow(/positive number of qubits/);
  });
});
