import { describe, expect, it } from 'vitest';
import { permuteSystems, tensor } from '../../src/index.js';
import { expectMatrixClose } from '../helpers.js';

/** Distinguishable operators, so a misplaced subsystem cannot go unnoticed. */
const A = [
  [1, 2],
  [3, 4],
];
const B = [
  [10, 20],
  [30, 40],
];
const C = [
  [100, 200],
  [300, 400],
];
const B3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

/** The 1..d² counting matrix, matching the reference values taken from toqito. */
function counting(dimension: number): number[][] {
  return Array.from({ length: dimension }, (_, i) =>
    Array.from({ length: dimension }, (_, j) => dimension * i + j + 1),
  );
}

describe('permuteSystems', () => {
  it('matches toqito on its documented 2 (x) 2 example', () => {
    expectMatrixClose(permuteSystems(counting(4), [1, 0], [2, 2]), [
      [1, 3, 2, 4],
      [9, 11, 10, 12],
      [5, 7, 6, 8],
      [13, 15, 14, 16],
    ]);
  });

  it('turns A (x) B into B (x) A', () => {
    expectMatrixClose(permuteSystems(tensor(A, B), [1, 0], [2, 2]), tensor(B, A));
  });

  it('reads perm positionally: [1, 2, 0] gives B (x) C (x) A', () => {
    expectMatrixClose(permuteSystems(tensor(A, B, C), [1, 2, 0], [2, 2, 2]), tensor(B, C, A));
    expectMatrixClose(permuteSystems(tensor(A, B, C), [2, 0, 1], [2, 2, 2]), tensor(C, A, B));
  });

  it('handles unequal subsystem dimensions', () => {
    expectMatrixClose(permuteSystems(tensor(A, B3), [1, 0], [2, 3]), tensor(B3, A));
  });

  it('leaves the operator alone under the identity permutation', () => {
    expectMatrixClose(permuteSystems(tensor(A, B, C), [0, 1, 2], [2, 2, 2]), tensor(A, B, C));
  });

  it('undoes itself when the inverse permutation is applied', () => {
    const dims = [2, 2, 2];
    const once = permuteSystems(tensor(A, B, C), [1, 2, 0], dims);
    // [1, 2, 0] moves subsystem s to position perm.indexOf(s), so [2, 0, 1] undoes it.
    expectMatrixClose(permuteSystems(once, [2, 0, 1], dims), tensor(A, B, C));
  });

  it('swaps the middle qubits of a four-qubit operator (the pianni regrouping)', () => {
    const abcd = tensor(A, B, C, A);
    expectMatrixClose(permuteSystems(abcd, [0, 2, 1, 3], [2, 2, 2, 2]), tensor(A, C, B, A));
  });

  it('infers equal subsystem dimensions when dims is omitted', () => {
    expectMatrixClose(permuteSystems(tensor(A, B), [1, 0]), tensor(B, A));
    expectMatrixClose(permuteSystems(tensor(A, B, C), [1, 2, 0]), tensor(B, C, A));
  });

  it('rejects a perm that is not a permutation', () => {
    expect(() => permuteSystems(counting(4), [0, 0], [2, 2])).toThrow(/must be a permutation/);
    expect(() => permuteSystems(counting(4), [1, 2], [2, 2])).toThrow(/must be a permutation/);
  });

  it('rejects perm and dims of different lengths', () => {
    expect(() => permuteSystems(counting(8), [1, 0], [2, 2, 2])).toThrow(/perm has 2 entries/);
  });

  it('rejects dimensions that do not match the matrix', () => {
    expect(() => permuteSystems(counting(4), [1, 0], [2, 3])).toThrow(/does not match dims/);
  });

  it('rejects a non-square matrix', () => {
    expect(() => permuteSystems([[1, 2, 3, 4]], [1, 0], [2, 2])).toThrow(/square/);
  });

  it('rejects dimensions it cannot split equally', () => {
    expect(() => permuteSystems(counting(6), [1, 0])).toThrow(/pass dims explicitly/);
  });
});
