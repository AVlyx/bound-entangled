import { describe, expect, it } from 'vitest';
import { complex, matrix, multiply } from 'mathjs';
import { ketbra } from '../../src/index.js';
import { expectMatrixClose, imaginary, nested, real } from '../helpers.js';

describe('ketbra', () => {
  it('matches the outer product', () => {
    const a = [1, 2, 3];
    const b = [4, 5];
    const expected = a.map((x) => b.map((y) => x * y));
    expectMatrixClose(ketbra(a, b), expected);
  });

  it('has shape (len(a), len(b))', () => {
    const rows = nested(ketbra([0, 0, 0], [0, 0, 0, 0, 0]));
    expect(rows.length).toBe(3);
    expect(rows[0].length).toBe(5);
  });

  it('conjugates the bra', () => {
    // Entry (i, j) is a[i] * conj(b[j]), so with a = [1+i, 2] and b = [i, 1-i]
    // the bra contributes conj(b) = [-i, 1+i].
    const a = [complex(1, 1), 2];
    const b = [complex(0, 1), complex(1, -1)];
    const expected = [
      [complex(1, -1), complex(0, 2)],
      [complex(0, -2), complex(2, 2)],
    ];
    expectMatrixClose(ketbra(a, b), expected);
  });

  it('defaults the bra to the ket', () => {
    const a = [complex(1, 1), 0, 2];
    expectMatrixClose(ketbra(a), ketbra(a, a));
  });

  it('gives a Hermitian rank-1 projector for a normalized vector', () => {
    // (|0>(1+i) + 2|2>) / sqrt(6)
    const n = Math.sqrt(6);
    const v = [complex(1 / n, 1 / n), 0, 2 / n];
    const p = ketbra(v);
    const entries = nested(p);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        expect(real(entries[i][j])).toBeCloseTo(real(entries[j][i]), 10);
        expect(imaginary(entries[i][j])).toBeCloseTo(-imaginary(entries[j][i]), 10);
      }
    }
    // Idempotent, since v is normalized.
    expectMatrixClose(multiply(p, p), p);
  });

  it('accepts flat arrays, column vectors and mathjs matrices alike', () => {
    const flat = [1, 2, 3];
    const column = [[1], [2], [3]];
    expectMatrixClose(ketbra(column), ketbra(flat));
    expectMatrixClose(ketbra(matrix(flat)), ketbra(flat));
    expectMatrixClose(ketbra(matrix(column)), ketbra(flat));
  });
});
