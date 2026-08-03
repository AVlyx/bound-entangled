import { kron, matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { MatrixLike, VectorLike } from '../types.js';
import { fail } from './internal.js';

/**
 * The Kronecker product of any number of factors, |a> ⊗ |b> ⊗ ... for vectors
 * and A ⊗ B ⊗ ... for matrices.
 *
 * Factors should be of one kind or the other: tensoring vectors gives a
 * vector, tensoring matrices gives a matrix.
 *
 * @param factors - the vectors or matrices to tensor together, in order.
 * @returns their Kronecker product.
 */
export function tensor(...factors: readonly (VectorLike | MatrixLike)[]): Matrix {
  if (factors.length === 0) {
    fail('tensor requires at least one factor');
  }
  let product = factors[0];
  for (let i = 1; i < factors.length; i++) {
    product = kron(product, factors[i]) as MatrixLike;
  }
  return matrix(product);
}
