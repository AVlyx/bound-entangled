import { describe, expect, it } from 'vitest';
import { crossHatch } from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('crossHatch', () => {
  it('is a 9x9 bound entangled state', () => {
    const rho = crossHatch();
    expect(nested(rho).length).toBe(9);
    expectBoundEntangled(rho, [3, 3]);
  });
});
