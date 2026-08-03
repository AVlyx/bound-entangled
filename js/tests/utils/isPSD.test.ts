import { describe, expect, it } from 'vitest';
import { complex, identity, matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import { isPSD, ketbra } from '../../src/index.js';
import { zeros } from '../helpers.js';

describe('isPSD', () => {
  it('accepts the identity and the zero matrix', () => {
    expect(isPSD(identity(4, 'dense') as Matrix)).toBe(true);
    expect(isPSD(zeros(4))).toBe(true);
  });

  it('reads the sign of the eigenvalues of a diagonal matrix', () => {
    expect(isPSD([
      [2, 0],
      [0, 0.5],
    ])).toBe(true);
    expect(isPSD([
      [1, 0],
      [0, -1],
    ])).toBe(false);
  });

  it('tolerates the round-off negative eigenvalues of a boundary state', () => {
    expect(isPSD([
      [1, 0],
      [0, -1e-14],
    ])).toBe(true);
    expect(isPSD([
      [1, 0],
      [0, -1e-3],
    ])).toBe(false);
  });

  it('handles complex Hermitian matrices', () => {
    // [[1, i], [-i, 1]] has eigenvalues 0 and 2; doubling the off-diagonal
    // pushes the smaller one to -1.
    expect(isPSD([
      [1, complex(0, 1)],
      [complex(0, -1), 1],
    ])).toBe(true);
    expect(isPSD([
      [1, complex(0, 2)],
      [complex(0, -2), 1],
    ])).toBe(false);
  });

  it('rejects a non-Hermitian matrix', () => {
    expect(isPSD([
      [1, 1],
      [0, 1],
    ])).toBe(false);
    expect(isPSD([
      [1, complex(0, 1)],
      [complex(0, 1), 1],
    ])).toBe(false);
  });

  it('accepts a rank-1 projector', () => {
    const n = Math.sqrt(6);
    expect(isPSD(ketbra([complex(1 / n, 1 / n), 0, 2 / n]))).toBe(true);
  });

  it('accepts a mathjs matrix', () => {
    expect(isPSD(matrix([
      [2, 0],
      [0, 0.5],
    ]))).toBe(true);
  });

  it('rejects a non-square matrix', () => {
    expect(() => isPSD([[1, 0]])).toThrow(/square/);
  });
});
