import { describe, expect, it } from 'vitest';
import { norm } from 'mathjs';
import { tile, upb } from '../../src/index.js';
import { expectMatrixClose, expectOrthonormal, expectVectorClose, flat, tilesBasis } from '../helpers.js';

describe('tile', () => {
  it('builds the five explicit tile states', () => {
    const s = 1 / Math.SQRT2;
    const t = 1 / 3;
    // Flat index of |a>|b> is 3a + b.
    expectVectorClose(tile(0), [s, -s, 0, 0, 0, 0, 0, 0, 0]); // |0>(|0> - |1>)
    expectVectorClose(tile(1), [0, 0, s, 0, 0, -s, 0, 0, 0]); // (|0> - |1>)|2>
    expectVectorClose(tile(2), [0, 0, 0, 0, 0, 0, 0, s, -s]); // |2>(|1> - |2>)
    expectVectorClose(tile(3), [0, 0, 0, s, 0, 0, -s, 0, 0]); // (|1> - |2>)|0>
    expectVectorClose(tile(4), new Array<number>(9).fill(t));
  });

  it('is an orthonormal set of five vectors in C9', () => {
    const basis = [0, 1, 2, 3, 4].map(tile);
    for (const v of basis) {
      expect(flat(v).length).toBe(9);
      expect(norm(v) as number).toBeCloseTo(1, 12);
    }
    expectOrthonormal(basis, 9);
  });

  it('spans the same subspace as the independently written test fixture', () => {
    // The fixture lists the same five vectors in a different order, so the
    // projector onto their complement must come out identical either way.
    expectMatrixClose(upb([0, 1, 2, 3, 4].map(tile)), upb(tilesBasis()));
  });

  it('rejects an index outside 0..4', () => {
    expect(() => tile(5)).toThrow(/tile index/);
    expect(() => tile(-1)).toThrow(/tile index/);
  });
});
