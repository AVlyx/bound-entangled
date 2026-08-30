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
    [5, 1, 1],
    [5, 1, -1],
    [7, 1, 1],
  ] as const)('is bound entangled for n=%i, z=%i, sigma=%i', (n, z, sigma) => {
    const rho = quasiDs({ n, z, sigma });
    expectBoundEntangled(rho, [2, 2 ** (n - 1)]);
  });

  it('matches the explicit five-qubit state', () => {
    // Row/column order is the computational basis |i_5 ... i_1> with qubit k
    // contributing 2^k, i.e. the Dicke weight of a row is its bit count. The
    // conjugation rho = V D V^T spreads each Dicke entry over its weight class:
    // rho[i][j] = D[w(i)][w(j)] / sqrt(binom(5, w(i)) binom(5, w(j))), so a
    // 32x32 literal would just be that formula written out. Spot-check instead,
    // one representative per weight class plus the two corners.
    const rho = nested(quasiDs({ n: 5, z: 1, sigma: 1 }));
    // D = diag(5, 10, 10, 10, 10, 5) / 50 with corners +1/50.
    expect(real(rho[0][0])).toBeCloseTo(0.1, 12); // weight 0, binom = 1
    expect(real(rho[31][31])).toBeCloseTo(0.1, 12); // weight 5, binom = 1
    expect(real(rho[1][1])).toBeCloseTo(0.04, 12); // weight 1, 0.2 / 5
    expect(real(rho[1][2])).toBeCloseTo(0.04, 12); // same weight class, off diagonal
    expect(real(rho[3][3])).toBeCloseTo(0.02, 12); // weight 2, 0.2 / 10
    expect(real(rho[7][7])).toBeCloseTo(0.02, 12); // weight 3, 0.2 / 10
    // The GHZ coherences, and nothing else off the weight-class blocks.
    expect(real(rho[0][31])).toBeCloseTo(0.02, 12);
    expect(real(rho[31][0])).toBeCloseTo(0.02, 12);
    expect(real(rho[0][1])).toBeCloseTo(0, 12);
    expect(real(rho[1][31])).toBeCloseTo(0, 12);
  });

  it('flips only the two corners when sigma flips', () => {
    const plus = nested(quasiDs({ n: 5, z: 1, sigma: 1 }));
    const minus = nested(quasiDs({ n: 5, z: 1, sigma: -1 }));
    expect(real(minus[0][31])).toBeCloseTo(-real(plus[0][31]), 12);
    expect(real(minus[31][0])).toBeCloseTo(-real(plus[31][0]), 12);
    expect(real(minus[0][0])).toBeCloseTo(real(plus[0][0]), 12);
  });

  it('rejects an even, non-integer or too small qubit count', () => {
    expect(() => quasiDs({ n: 4, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    expect(() => quasiDs({ n: 3.5, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    expect(() => quasiDs({ n: -3, z: 1, sigma: 1 })).toThrow(/positive odd number of qubits/);
    // n = 2K + 1 with K > 1: n = 3 is the K = 1 case Theorem 5.1 excludes.
    expect(() => quasiDs({ n: 1, z: 1, sigma: 1 })).toThrow(/at least 5 qubits/);
    expect(() => quasiDs({ n: 3, z: 1, sigma: 1 })).toThrow(/at least 5 qubits/);
  });

  it('rejects a sign other than +1 or -1', () => {
    expect(() => quasiDs({ n: 5, z: 1, sigma: 0 as 1 })).toThrow(/sigma must be/);
  });

  it('rejects z outside the open interval (0, inf)', () => {
    expect(() => quasiDs({ n: 5, z: 0, sigma: 1 })).toThrow(/z must be a finite real number > 0/);
    expect(() => quasiDs({ n: 5, z: -1, sigma: 1 })).toThrow(/z must be a finite real number > 0/);
    expect(() => quasiDs({ n: 5, z: Infinity, sigma: 1 })).toThrow(
      /z must be a finite real number > 0/,
    );
  });
});

describe('quasiDsDickeBasis', () => {
  it('is the explicit (n + 1) x (n + 1) matrix for n = 5, z = 1', () => {
    // f_k(1) = 5, 2, 1, 1, 2, 5 at k = K - j for K = 2 and j = 0..5, so
    // D(z) = diag(binom(5,j) f_{2-j}(1)) = diag(5, 10, 10, 10, 10, 5) with
    // corners +-1, all over 2 (4 + z)^K = 50.
    expectMatrixClose(quasiDsDickeBasis({ n: 5, z: 1, sigma: 1 }), [
      [0.1, 0, 0, 0, 0, 0.02],
      [0, 0.2, 0, 0, 0, 0],
      [0, 0, 0.2, 0, 0, 0],
      [0, 0, 0, 0.2, 0, 0],
      [0, 0, 0, 0, 0.2, 0],
      [0.02, 0, 0, 0, 0, 0.1],
    ]);
    expectMatrixClose(quasiDsDickeBasis({ n: 5, z: 1, sigma: -1 }), [
      [0.1, 0, 0, 0, 0, -0.02],
      [0, 0.2, 0, 0, 0, 0],
      [0, 0, 0.2, 0, 0, 0],
      [0, 0, 0, 0.2, 0, 0],
      [0, 0, 0, 0, 0.2, 0],
      [-0.02, 0, 0, 0, 0, 0.1],
    ]);
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
    for (const n of [5, 7, 9]) {
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
