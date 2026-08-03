import { describe, expect, it } from 'vitest';
import { ketbra, normalize } from '../../src/index.js';
import { generalizedGridComponent, generalizedGridState } from '../../src/cmOtimesCn/index.js';
import { expectDensityMatrix } from '../qi.js';
import { expectMatrixClose, expectVectorClose } from '../helpers.js';

describe('generalizedGridComponent', () => {
  it('sums the basis states of the vertices it spans', () => {
    // |00> + |12> over a 2x3 grid, at flat indices 0 and 5. Unlike an ordinary
    // edge there is no relative minus sign and no normalization.
    expectVectorClose(
      generalizedGridComponent([2, 3], [
        [0, 0],
        [1, 2],
      ]),
      [1, 0, 0, 0, 0, 1],
    );
  });

  it('counts a repeated vertex twice', () => {
    expectVectorClose(
      generalizedGridComponent([2, 2], [
        [0, 1],
        [0, 1],
      ]),
      [0, 2, 0, 0],
    );
  });

  it('accepts a single-vertex hyperedge', () => {
    expectVectorClose(generalizedGridComponent([2, 2], [[1, 1]]), [0, 0, 0, 1]);
  });

  it('rejects vertices outside the grid', () => {
    expect(() => generalizedGridComponent([3, 3], [[3, 0]])).toThrow(/out of range/);
    expect(() => generalizedGridComponent([3, 3], [[0, 3]])).toThrow(/out of range/);
  });

  it('rejects an empty hyperedge', () => {
    expect(() => generalizedGridComponent([3, 3], [])).toThrow(/at least one vertex/);
  });
});

describe('generalizedGridState', () => {
  it('is a valid density matrix', () => {
    const rho = generalizedGridState({
      dims: [3, 3],
      hyperedges: [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [0, 1],
          [2, 2],
        ],
      ],
    });
    expectDensityMatrix(rho, [3, 3]);
  });

  it('is the normalized projector of a single hyperedge', () => {
    // Trace-normalizing |v><v| is the same as projecting onto the unit vector,
    // so one hyperedge gives exactly ketbra(normalize(component)).
    const hyperedge = [
      [0, 0],
      [1, 1],
    ] as const;
    const rho = generalizedGridState({ dims: [3, 3], hyperedges: [hyperedge] });
    expectMatrixClose(rho, ketbra(normalize(generalizedGridComponent([3, 3], hyperedge))));
  });

  it('rejects an empty hyperedge set', () => {
    expect(() => generalizedGridState({ dims: [3, 3], hyperedges: [] })).toThrow(
      /at least one hyperedge/,
    );
  });
});
