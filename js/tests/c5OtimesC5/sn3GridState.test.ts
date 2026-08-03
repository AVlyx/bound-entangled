import { describe, expect, it } from 'vitest';
import { sn3GridState } from '../../src/c5OtimesC5/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('sn3GridState', () => {
  it('is a 25x25 bound entangled state', () => {
    const rho = sn3GridState();
    expect(nested(rho).length).toBe(25);
    expectBoundEntangled(rho, [5, 5]);
  });
});
