import { describe, expect, it } from 'vitest';
import { complex, matrix, transpose } from 'mathjs';
import { partialTranspose } from '../../src/index.js';
import { expectMatrixClose, zeros } from '../helpers.js';

/** An arbitrary 4x4 matrix with distinct entries, to expose index mistakes. */
function counting(dimension: number): number[][] {
  return Array.from({ length: dimension }, (_, i) =>
    Array.from({ length: dimension }, (_, j) => dimension * i + j + 1),
  );
}

describe('partialTranspose', () => {
  it('maps the Bell state onto half the swap operator', () => {
    // |Φ+><Φ+| has a partial transpose equal to SWAP/2, whose eigenvalue -1/2
    // is the textbook signature of an entangled two-qubit state.
    const bell = [
      [0.5, 0, 0, 0.5],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0.5, 0, 0, 0.5],
    ];
    const expected = [
      [0.5, 0, 0, 0],
      [0, 0, 0.5, 0],
      [0, 0.5, 0, 0],
      [0, 0, 0, 0.5],
    ];
    expectMatrixClose(partialTranspose(bell, [2, 2]), expected);
  });

  it('reduces to the full transpose when every subsystem is transposed', () => {
    const m = counting(6);
    expectMatrixClose(partialTranspose(m, [2, 3], [0, 1]), transpose(m));
  });

  it('is an involution', () => {
    const m = counting(6);
    expectMatrixClose(partialTranspose(partialTranspose(m, [2, 3], 0), [2, 3], 0), m);
    expectMatrixClose(partialTranspose(partialTranspose(m, [2, 3], 1), [2, 3], 1), m);
  });

  it('composes over subsystems', () => {
    const m = counting(8);
    const both = partialTranspose(m, [2, 2, 2], [0, 2]);
    const stepwise = partialTranspose(partialTranspose(m, [2, 2, 2], 0), [2, 2, 2], 2);
    expectMatrixClose(both, stepwise);
  });

  it('transposes without conjugating', () => {
    const m = [
      [1, complex(0, 1)],
      [complex(0, 2), 3],
    ];
    // dims [1, 2]: the only non-trivial subsystem is the second one, so this
    // is a plain transpose that must leave the imaginary parts unchanged.
    expectMatrixClose(partialTranspose(m, [1, 2], 1), [
      [1, complex(0, 2)],
      [complex(0, 1), 3],
    ]);
  });

  it('leaves a product operator factorized', () => {
    // (A ⊗ B)^{T_B} = A ⊗ B^T, checked on a 2x2 ⊗ 2x2 example.
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    const kron = (x: number[][], y: number[][]): number[][] => {
      const out = zeros(4);
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              out[2 * i + k][2 * j + l] = x[i][j] * y[k][l];
            }
          }
        }
      }
      return out;
    };
    expectMatrixClose(partialTranspose(kron(a, b), [2, 2], 1), kron(a, transpose(b)));
    expectMatrixClose(partialTranspose(kron(a, b), [2, 2], 0), kron(transpose(a), b));
  });

  it('accepts a mathjs matrix', () => {
    const m = counting(4);
    expectMatrixClose(partialTranspose(matrix(m), [2, 2]), partialTranspose(m, [2, 2]));
  });

  it('rejects dimensions that do not match the matrix', () => {
    expect(() => partialTranspose(counting(4), [3, 3])).toThrow(/does not match dims/);
  });

  it('rejects a subsystem index out of range', () => {
    expect(() => partialTranspose(counting(4), [2, 2], 2)).toThrow(/out of range/);
    expect(() => partialTranspose(counting(4), [2, 2], -1)).toThrow(/out of range/);
  });

  it('rejects a non-square matrix', () => {
    expect(() => partialTranspose([[1, 2, 3, 4]], [2, 2])).toThrow(/square/);
  });
});
