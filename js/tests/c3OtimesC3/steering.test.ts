import { describe, expect, it } from 'vitest';
import { steeringState } from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('steeringState', () => {
  it('is a 9x9 bound entangled state', () => {
    const rho = steeringState({ m1: 0.5, m2: 0.5 });
    expect(nested(rho).length).toBe(9);
    expectBoundEntangled(rho, [3, 3]);
  });

  it('stays bound entangled across the parameter range', () => {
    for (const [m1, m2] of [
      [0.3, 0.3],
      [0.5, 0.2],
      [0.1, 0.6],
    ]) {
      expectBoundEntangled(steeringState({ m1, m2 }), [3, 3]);
    }
  });
});
