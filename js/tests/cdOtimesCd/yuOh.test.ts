import { describe, expect, it } from 'vitest';
import { isValidYuOhInput, phiK, psiIj, psiK, thetaDGen, yuOh } from '../../src/cdOtimesCd/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectVectorClose, innerProduct, real } from '../helpers.js';

describe('isValidYuOhInput', () => {
  it('accepts an interior point', () => {
    expect(isValidYuOhInput({ fullDim: 3, x: 0.5, y: 0.1 })).toBe(true);
  });

  it('rejects points outside the unit disk', () => {
    // x² + y² = 1.62 > 1
    expect(isValidYuOhInput({ fullDim: 3, x: 0.9, y: 0.9 })).toBe(false);
  });

  it('rejects points where delta is not positive', () => {
    // Inside the unit disk (0.72 <= 1) but delta = 0.28 - 0.36 < 0.
    expect(isValidYuOhInput({ fullDim: 3, x: 0.6, y: 0.6 })).toBe(false);
  });
});

describe('psiIj', () => {
  it('is the antisymmetric vector |ij> - |ji>', () => {
    expectVectorClose(psiIj(3, 0, 2), [0, 0, 1, 0, 0, 0, -1, 0, 0]);
  });

  it('is antisymmetric in its two indices', () => {
    const swapped = psiIj(3, 2, 0).map((value) => -value);
    expectVectorClose(psiIj(3, 0, 2), swapped);
  });
});

describe('thetaDGen', () => {
  it.each([3, 4, 5])('returns d unit vectors summing to zero for d = %i', (d) => {
    const thetas = thetaDGen(d);
    expect(thetas.length).toBe(d);
    for (const theta of thetas) {
      expect(theta.length).toBe(d);
      expect(real(innerProduct(theta, theta))).toBeCloseTo(1, 10);
    }
    // The theta_p form a simplex: they sum to the zero vector.
    const total = new Array<number>(d).fill(0);
    for (const theta of thetas) {
      for (let i = 0; i < d; i++) {
        total[i] += theta[i];
      }
    }
    expectVectorClose(total, new Array<number>(d).fill(0));
  });
});

describe('phiK and psiK', () => {
  it.each([3, 4])('produce vectors of C^d ⊗ C^d for d = %i', (d) => {
    for (let k = 1; k < d; k++) {
      expect(phiK(d, k).length).toBe(d * d);
      expect(psiK(d, k, 0.5, 0.1, Math.sqrt(1 - 0.25 - 0.01)).length).toBe(d * d);
    }
  });

  it('is the x, y part of psiK when z = 0', () => {
    const expected = new Array<number>(9).fill(0);
    expected[1] = 0.5;
    expected[3] = 0.1;
    expectVectorClose(psiK(3, 1, 0.5, 0.1, 0), expected);
  });

  it('phiK is symmetric under the swap of the two factors', () => {
    const d = 4;
    for (let k = 1; k < d; k++) {
      const phi = phiK(d, k);
      for (let i = 0; i < d; i++) {
        for (let j = 0; j < d; j++) {
          expect(phi[i * d + j]).toBeCloseTo(phi[j * d + i], 12);
        }
      }
    }
  });
});

describe('yuOh', () => {
  it.each([3, 4])('is bound entangled on C^d ⊗ C^d for d = %i', (d) => {
    expectBoundEntangled(yuOh({ fullDim: d, x: 0.5, y: 0.1 }), [d, d]);
  });

  it('rejects parameters outside the valid domain', () => {
    expect(() => yuOh({ fullDim: 3, x: 0.9, y: 0.9 })).toThrow(/outside the valid Yu-Oh domain/);
    expect(() => yuOh({ fullDim: 3, x: 0.6, y: 0.6 })).toThrow(/outside the valid Yu-Oh domain/);
  });

  it('rejects local dimensions below 3', () => {
    expect(() => yuOh({ fullDim: 2, x: 0.5, y: 0.1 })).toThrow(/integer >= 3/);
  });
});
