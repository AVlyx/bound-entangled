import { describe, expect, it } from 'vitest';
import { genTiles2, genTiles2Basis } from '../../src/cmOtimesCn/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectOrthonormal } from '../helpers.js';

describe('genTiles2Basis', () => {
  it.each([
    [3, 4],
    [3, 5],
    [4, 5],
    [4, 6],
    [3, 7],
  ])('is an orthonormal product basis of the right size for %i x %i', (m, n) => {
    const basis = genTiles2Basis({ dims: [m, n] });
    expect(basis.length).toBe(m * n - 2 * m + 1);
    expectOrthonormal(basis, m * n);
  });

  it('rejects dimensions outside the theorem', () => {
    expect(() => genTiles2Basis({ dims: [3, 3] })).toThrow(/n > 3/); // m = n = 3 is excluded
    expect(() => genTiles2Basis({ dims: [2, 5] })).toThrow(/m >= 3/);
    expect(() => genTiles2Basis({ dims: [5, 4] })).toThrow(/n >= m/);
  });
});

describe('genTiles2', () => {
  it.each([
    [3, 4],
    [4, 5],
  ])('is bound entangled on %i x %i', (m, n) => {
    expectBoundEntangled(genTiles2({ dims: [m, n] }), [m, n]);
  });
});
