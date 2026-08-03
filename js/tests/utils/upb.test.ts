import { describe, expect, it } from 'vitest';
import { multiply, trace } from 'mathjs';
import { isPPT, isPSD, upb } from '../../src/index.js';
import { expectMatrixClose, nested, real, tilesBasis, zeros } from '../helpers.js';

describe('upb', () => {
  it('applies the formula (I - sum |v><v|) / (D - n)', () => {
    // A single computational basis vector in D = 4 must give
    // (I - diag(1, 0, 0, 0)) / 3, independent of any physics.
    const v = [[1], [0], [0], [0]];
    const expected = zeros(4);
    for (let i = 1; i < 4; i++) {
      expected[i][i] = 1 / 3;
    }
    expectMatrixClose(upb([v]), expected);
  });

  it('builds a bound entangled state from the Tiles UPB', () => {
    const rho = upb(tilesBasis());
    expect(real(trace(rho) as number)).toBeCloseTo(1, 10);
    expect(isPSD(rho)).toBe(true);
    expect(isPPT(rho, [3, 3])).toBe(true);
  });

  it('annihilates every vector of the basis', () => {
    // The state projects onto the orthogonal complement of the UPB, so each
    // basis vector lies in its kernel.
    const basis = tilesBasis();
    const rho = upb(basis);
    for (const v of basis) {
      const image = nested(multiply(rho, v.map((entry) => [entry])));
      for (const row of image) {
        expect(real(row[0])).toBeCloseTo(0, 10);
      }
    }
  });

  it('rejects a basis that cannot leave a complement', () => {
    const basis = [
      [1, 0],
      [0, 1],
    ];
    expect(() => upb(basis)).toThrow(/cannot span/);
  });

  it('rejects vectors of mismatched length', () => {
    expect(() => upb([[1, 0, 0], [0, 1]])).toThrow(/same length/);
  });
});
