import { describe, expect, it } from 'vitest';
import { horodecki } from '../../src/c2OtimesC4/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('horodecki (2x4)', () => {
  it.each([0.1, 0.3, 0.5, 0.7, 0.9])('is bound entangled at a = %f', (aParam) => {
    const rho = horodecki({ aParam });
    expect(nested(rho).length).toBe(8);
    expectBoundEntangled(rho, [2, 4]);
  });

  it('stays a valid PPT state at the separable endpoints', () => {
    expectBoundEntangled(horodecki({ aParam: 0 }), [2, 4]);
    expectBoundEntangled(horodecki({ aParam: 1 }), [2, 4]);
  });

  it('rejects a parameter outside [0, 1]', () => {
    expect(() => horodecki({ aParam: -0.1 })).toThrow(/\[0, 1\]/);
    expect(() => horodecki({ aParam: 1.1 })).toThrow(/\[0, 1\]/);
  });
});
