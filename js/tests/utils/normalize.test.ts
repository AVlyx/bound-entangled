import { describe, expect, it } from 'vitest';
import { complex, norm } from 'mathjs';
import { normalize, normalizeTrace } from '../../src/index.js';
import { expectMatrixClose, expectVectorClose, nested, real } from '../helpers.js';

describe('normalize', () => {
  it('scales a vector to unit length', () => {
    expectVectorClose(normalize([3, 4]), [0.6, 0.8]);
  });

  it('leaves a unit vector alone', () => {
    expectVectorClose(normalize([0, 1, 0]), [0, 1, 0]);
  });

  it('uses the Hermitian norm for complex vectors', () => {
    const v = normalize([complex(1, 1), complex(2, -2)]);
    expect(norm(v) as number).toBeCloseTo(1, 12);
  });

  it('accepts a column vector', () => {
    expectVectorClose(normalize([[3], [4]]), [0.6, 0.8]);
  });

  it('rejects the zero vector', () => {
    expect(() => normalize([0, 0, 0])).toThrow(/zero vector/);
  });
});

describe('normalizeTrace', () => {
  it('rescales to unit trace', () => {
    expectMatrixClose(
      normalizeTrace([
        [2, 0],
        [0, 2],
      ]),
      [
        [0.5, 0],
        [0, 0.5],
      ],
    );
  });

  it('leaves a density matrix alone', () => {
    const rho = [
      [0.25, 0],
      [0, 0.75],
    ];
    expectMatrixClose(normalizeTrace(rho), rho);
  });

  it('handles complex off-diagonal entries', () => {
    const rho = nested(
      normalizeTrace([
        [2, complex(0, 2)],
        [complex(0, -2), 2],
      ]),
    );
    expect(real(rho[0][0]) + real(rho[1][1])).toBeCloseTo(1, 12);
  });

  it('rejects a traceless matrix', () => {
    expect(() =>
      normalizeTrace([
        [1, 0],
        [0, -1],
      ]),
    ).toThrow(/traceless/);
  });

  it('rejects a non-square matrix', () => {
    expect(() => normalizeTrace([[1, 2]])).toThrow(/square/);
  });
});
