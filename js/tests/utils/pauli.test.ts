import { describe, expect, it } from 'vitest';
import { complex, multiply } from 'mathjs';
import { pauli, tensor } from '../../src/index.js';
import { expectMatrixClose, nested } from '../helpers.js';

const IDENTITY_2 = [
  [1, 0],
  [0, 1],
];

describe('pauli', () => {
  it('gives the four matrices by name', () => {
    expectMatrixClose(pauli('I'), IDENTITY_2);
    expectMatrixClose(pauli('X'), [
      [0, 1],
      [1, 0],
    ]);
    expectMatrixClose(pauli('Y'), [
      [0, complex(0, -1)],
      [complex(0, 1), 0],
    ]);
    expectMatrixClose(pauli('Z'), [
      [1, 0],
      [0, -1],
    ]);
  });

  it('indexes them 0 = I, 1 = X, 2 = Y, 3 = Z', () => {
    expectMatrixClose(pauli(0), pauli('I'));
    expectMatrixClose(pauli(1), pauli('X'));
    expectMatrixClose(pauli(2), pauli('Y'));
    expectMatrixClose(pauli(3), pauli('Z'));
  });

  it('accepts lowercase names', () => {
    expectMatrixClose(pauli('y'), pauli('Y'));
  });

  it('squares to the identity', () => {
    for (const name of ['I', 'X', 'Y', 'Z'] as const) {
      const sigma = pauli(name);
      expectMatrixClose(multiply(sigma, sigma), IDENTITY_2);
    }
  });

  it('satisfies XY = iZ', () => {
    const expected = [
      [complex(0, 1), 0],
      [0, complex(0, -1)],
    ];
    expectMatrixClose(multiply(pauli('X'), pauli('Y')), expected);
  });

  it('tensors a list of indices', () => {
    const xx = pauli(['X', 'X']);
    expect(nested(xx).length).toBe(4);
    expectMatrixClose(xx, tensor(pauli('X'), pauli('X')));
    expectMatrixClose(pauli([1, 1]), xx);
  });

  it('tensors across more than two qubits', () => {
    const zzz = pauli([3, 3, 3]);
    expect(nested(zzz).length).toBe(8);
    expectMatrixClose(zzz, tensor(pauli('Z'), pauli('Z'), pauli('Z')));
  });

  it('rejects an unknown operator', () => {
    // @ts-expect-error 4 is not a Pauli index
    expect(() => pauli(4)).toThrow(/Pauli index/);
    // @ts-expect-error W is not a Pauli name
    expect(() => pauli('W')).toThrow(/Pauli name/);
    expect(() => pauli([])).toThrow(/at least one index/);
  });
});
