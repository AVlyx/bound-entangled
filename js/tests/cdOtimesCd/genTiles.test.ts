import { describe, expect, it } from 'vitest';
import { genTiles1, genTiles1Basis } from '../../src/cdOtimesCd/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectOrthonormal } from '../helpers.js';

describe('genTiles1Basis', () => {
  it.each([4, 6, 8])(
    'is an orthonormal product basis of the right size for d = %i',
    (d) => {
      const basis = genTiles1Basis({ fullDim: d });
      expect(basis.length).toBe(d * d - 2 * d + 1);
      expectOrthonormal(basis, d * d);
    },
  );

  it('rejects odd dimensions and dimensions below 4', () => {
    expect(() => genTiles1Basis({ fullDim: 3 })).toThrow(/even dimension >= 4/);
    expect(() => genTiles1Basis({ fullDim: 5 })).toThrow(/even dimension >= 4/);
    expect(() => genTiles1Basis({ fullDim: 2 })).toThrow(/even dimension >= 4/);
  });
});

describe('genTiles1', () => {
  it.each([4, 6])('is bound entangled on C^d ⊗ C^d for d = %i', (d) => {
    expectBoundEntangled(genTiles1({ fullDim: d }), [d, d]);
  });
});
