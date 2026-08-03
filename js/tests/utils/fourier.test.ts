import { describe, expect, it } from 'vitest';
import { complex, conj, multiply, transpose } from 'mathjs';
import { fourier } from '../../src/index.js';
import { expectMatrixClose, nested, real } from '../helpers.js';

/** The n x n identity, as a nested array. */
function identityArray(n: number): number[][] {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
}

describe('fourier', () => {
  it('is the Hadamard-like matrix for d = 2', () => {
    const s = 1 / Math.sqrt(2);
    expectMatrixClose(fourier(2), [
      [s, s],
      [s, -s],
    ]);
  });

  it('has a constant first row and column', () => {
    const w = nested(fourier(5));
    for (let k = 0; k < 5; k++) {
      expect(real(w[0][k])).toBeCloseTo(1 / Math.sqrt(5), 12);
      expect(real(w[k][0])).toBeCloseTo(1 / Math.sqrt(5), 12);
    }
  });

  it('is unitary', () => {
    for (const d of [2, 3, 4, 5]) {
      const w = fourier(d);
      const wDagger = conj(transpose(w));
      expectMatrixClose(multiply(wDagger, w), identityArray(d));
    }
  });

  it('matches omega^(jk)/sqrt(d) for d = 4', () => {
    // omega = i, so the (1, 1) entry is i/2 and the (1, 2) entry is -1/2.
    const w = nested(fourier(4));
    expectMatrixClose([[w[1][1], w[1][2], w[1][3]]], [[complex(0, 0.5), -0.5, complex(0, -0.5)]]);
  });

  it('rejects a non-positive dimension', () => {
    expect(() => fourier(0)).toThrow(/positive integer/);
  });
});
