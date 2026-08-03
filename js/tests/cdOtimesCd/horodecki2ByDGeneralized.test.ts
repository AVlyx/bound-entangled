import { describe, expect, it } from 'vitest';
import { horodecki2ByDGeneralized } from '../../src/cdOtimesCd/index.js';
import { expectBoundEntangled } from '../qi.js';
import { nested } from '../helpers.js';

describe('horodecki2ByDGeneralized', () => {
  it.each([3, 4, 5])('has shape 2d x 2d for d = %i', (d) => {
    const rows = nested(horodecki2ByDGeneralized({ secondDimD: d, b: 0.5 }));
    expect(rows.length).toBe(2 * d);
    expect(rows[0].length).toBe(2 * d);
  });

  it.each([
    [3, 0.1],
    [3, 0.5],
    [4, 0.3],
    [4, 0.9],
    [5, 0.7],
  ])('is bound entangled on 2 x %i for b = %f', (d, b) => {
    expectBoundEntangled(horodecki2ByDGeneralized({ secondDimD: d, b }), [2, d]);
  });

  it('rejects a second dimension below 2', () => {
    expect(() => horodecki2ByDGeneralized({ secondDimD: 1, b: 0.5 })).toThrow(/integer >= 2/);
  });
});
