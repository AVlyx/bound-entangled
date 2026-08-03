import { describe, expect, it } from 'vitest';
import { ket, tensor } from '../../src/index.js';
import { expectVectorClose } from '../helpers.js';

describe('ket', () => {
  it('gives the standard basis vector of a single space', () => {
    expectVectorClose(ket(3, 1), [0, 1, 0]);
    expectVectorClose(ket(3, 2), [0, 0, 1]);
  });

  it('indexes a composite space subsystem by subsystem', () => {
    // |12> in C3 (x) C3 sits at flat index 1 * 3 + 2 = 5.
    const expected = new Array<number>(9).fill(0);
    expected[5] = 1;
    expectVectorClose(ket([3, 3], [1, 2]), expected);
  });

  it('reads a bare number as the flat index', () => {
    expectVectorClose(ket([3, 3], 5), ket([3, 3], [1, 2]));
    expectVectorClose(ket([3, 3], 5), ket(9, 5));
  });

  it('handles unequal subsystem dimensions', () => {
    // |10> in C2 (x) C4 sits at flat index 1 * 4 + 0 = 4.
    const expected = new Array<number>(8).fill(0);
    expected[4] = 1;
    expectVectorClose(ket([2, 4], [1, 0]), expected);
  });

  it('agrees with the tensor product of its factors', () => {
    expectVectorClose(ket([3, 3], [1, 2]), tensor(ket(3, 1), ket(3, 2)));
    expectVectorClose(ket([2, 2, 2], [1, 0, 1]), tensor(ket(2, 1), ket(2, 0), ket(2, 1)));
  });

  it('rejects an index outside the space', () => {
    expect(() => ket(3, 3)).toThrow(/out of range/);
    expect(() => ket(3, -1)).toThrow(/out of range/);
    expect(() => ket([3, 3], [3, 0])).toThrow(/subsystem 0/);
    expect(() => ket([3, 3], 9)).toThrow(/out of range/);
  });

  it('rejects the wrong number of local indices', () => {
    expect(() => ket([3, 3], [1])).toThrow(/expected 2 local/);
  });
});
