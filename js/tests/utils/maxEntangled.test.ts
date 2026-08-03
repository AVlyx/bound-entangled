import { describe, expect, it } from 'vitest';
import { norm } from 'mathjs';
import { isPSD, ketbra, maxEntangled } from '../../src/index.js';
import { expectMatrixClose, expectVectorClose, flat, real } from '../helpers.js';

describe('maxEntangled', () => {
  it('gives the Bell state for d = 2', () => {
    const s = 1 / Math.sqrt(2);
    expectVectorClose(maxEntangled(2), [s, 0, 0, s]);
  });

  it('drops the normalization on request', () => {
    expectVectorClose(maxEntangled(2, { normalized: false }), [1, 0, 0, 1]);
    expectVectorClose(maxEntangled(3, { normalized: false }), [1, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

  it('is a unit vector of length d^2', () => {
    for (const d of [2, 3, 5]) {
      const state = maxEntangled(d);
      expect(flat(state).length).toBe(d * d);
      expect(norm(state) as number).toBeCloseTo(1, 12);
    }
  });

  it('puts equal weight on every |ii>', () => {
    const entries = flat(maxEntangled(3));
    for (let i = 0; i < 3; i++) {
      expect(real(entries[i * 3 + i])).toBeCloseTo(1 / Math.sqrt(3), 12);
    }
  });

  it('projects onto a valid maximally entangled density matrix', () => {
    const rho = ketbra(maxEntangled(2));
    expect(isPSD(rho)).toBe(true);
    expectMatrixClose(rho, [
      [0.5, 0, 0, 0.5],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0.5, 0, 0, 0.5],
    ]);
  });

  it('rejects a non-positive dimension', () => {
    expect(() => maxEntangled(0)).toThrow(/positive integer/);
    expect(() => maxEntangled(2.5)).toThrow(/positive integer/);
  });
});
