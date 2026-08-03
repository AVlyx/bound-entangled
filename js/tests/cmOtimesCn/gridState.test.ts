import { describe, expect, it } from 'vitest';
import { norm } from 'mathjs';
import { isPPT, ketbra } from '../../src/index.js';
import { gridComponent, gridState } from '../../src/cmOtimesCn/index.js';
import { expectBoundEntangled, expectDensityMatrix } from '../qi.js';
import { expectMatrixClose, expectVectorClose } from '../helpers.js';

describe('gridComponent', () => {
  it('is the normalized difference of the two vertices', () => {
    const s = 1 / Math.SQRT2;
    // |00> - |12> over a 2x3 grid, at flat indices 0 and 5.
    expectVectorClose(gridComponent([2, 3], [0, 0], [1, 2]), [s, 0, 0, 0, 0, -s]);
  });

  it('is normalized', () => {
    expect(norm(gridComponent([2, 3], [0, 0], [1, 2])) as number).toBeCloseTo(1, 12);
  });

  it('rejects vertices outside the grid', () => {
    expect(() => gridComponent([2, 3], [0, 0], [2, 0])).toThrow(/out of range/);
    expect(() => gridComponent([2, 3], [0, 0], [0, 3])).toThrow(/out of range/);
  });
});

describe('gridState', () => {
  it('is PPT on a small path', () => {
    const rho = gridState({
      dims: [2, 3],
      edges: [
        [
          [0, 0],
          [0, 1],
        ],
        [
          [0, 1],
          [0, 2],
        ],
        [
          [0, 0],
          [1, 0],
        ],
      ],
    });
    expectBoundEntangled(rho, [2, 3]);
  });

  it('reduces to the projector of a single edge', () => {
    const rho = gridState({
      dims: [2, 2],
      edges: [
        [
          [0, 0],
          [1, 1],
        ],
      ],
    });
    expectDensityMatrix(rho, [2, 2]);
    // (|00> - |11>)/sqrt(2) is a Bell state, so the mixture over one edge is
    // that rank-1 projector -- entangled, and therefore NPT.
    expectMatrixClose(rho, ketbra(gridComponent([2, 2], [0, 0], [1, 1])));
    expect(isPPT(rho, [2, 2])).toBe(false);
  });

  it('rejects an empty edge set', () => {
    expect(() => gridState({ dims: [3, 3], edges: [] })).toThrow(/at least one edge/);
  });
});
