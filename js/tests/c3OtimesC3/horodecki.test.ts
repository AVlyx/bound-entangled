import { describe, expect, it } from 'vitest';
import { horodecki } from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested, real } from '../helpers.js';

describe('horodecki (3x3)', () => {
  it.each([0.1, 0.3, 0.5, 0.7, 0.9])('is bound entangled at a = %f', (aParam) => {
    const rho = horodecki({ aParam });
    expect(nested(rho).length).toBe(9);
    expectBoundEntangled(rho, [3, 3]);
  });

  it('stays a valid PPT state at the separable endpoints', () => {
    // a = 0 and a = 1 are separable, but still PPT density matrices.
    expectBoundEntangled(horodecki({ aParam: 0 }), [3, 3]);
    expectBoundEntangled(horodecki({ aParam: 1 }), [3, 3]);
  });

  it('carries the |00> + |11> + |22> coherences', () => {
    // Without these off-diagonal entries the state would be separable; they
    // are present in toqito's code even though its docstring matrix omits them.
    const rows = nested(horodecki({ aParam: 0.5 }));
    const expected = 0.5 / (8 * 0.5 + 1);
    for (const [i, j] of [
      [0, 4],
      [0, 8],
      [4, 8],
    ] as const) {
      expect(real(rows[i][j]), `coherence (${i}, ${j})`).toBeCloseTo(expected, 12);
      expect(real(rows[j][i]), `coherence (${j}, ${i})`).toBeCloseTo(expected, 12);
    }
  });

  it('rejects a parameter outside [0, 1]', () => {
    expect(() => horodecki({ aParam: -0.1 })).toThrow(/\[0, 1\]/);
    expect(() => horodecki({ aParam: 1.1 })).toThrow(/\[0, 1\]/);
  });
});
