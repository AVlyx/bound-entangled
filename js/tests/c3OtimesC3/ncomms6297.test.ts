import { describe, expect, it } from 'vitest';
import { ncomms6297 } from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('ncomms6297', () => {
  it('is a 9x9 bound entangled state', () => {
    const rho = ncomms6297();
    expect(nested(rho).length).toBe(9);
    expectBoundEntangled(rho, [3, 3]);
  });
});
