import { describe, expect, it } from 'vitest';
import { complex } from 'mathjs';
import { ket, pauli, tensor } from '../../src/index.js';
import { expectMatrixClose, expectVectorClose } from '../helpers.js';

describe('tensor', () => {
  it('takes the Kronecker product of two vectors', () => {
    expectVectorClose(tensor([1, 2], [10, 20]), [10, 20, 20, 40]);
  });

  it('is associative across three or more factors', () => {
    expectVectorClose(tensor([1, 2], [3, 5], [7, 11]), tensor(tensor([1, 2], [3, 5]), [7, 11]));
    expectVectorClose(tensor([1, 2], [3, 5], [7, 11]), tensor([1, 2], tensor([3, 5], [7, 11])));
  });

  it('takes the Kronecker product of matrices', () => {
    // I2 (x) X, the block-diagonal matrix with X in each block.
    expectMatrixClose(tensor(pauli('I'), pauli('X')), [
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
    ]);
  });

  it('carries complex entries through', () => {
    expectVectorClose(tensor([complex(0, 1), 0], [1, 2]), [complex(0, 1), complex(0, 2), 0, 0]);
  });

  it('returns a single factor unchanged', () => {
    expectVectorClose(tensor([1, 2, 3]), [1, 2, 3]);
  });

  it('agrees with ket on product basis states', () => {
    expectVectorClose(tensor(ket(2, 1), ket(3, 0)), ket([2, 3], [1, 0]));
  });

  it('rejects an empty product', () => {
    expect(() => tensor()).toThrow(/at least one factor/);
  });
});
