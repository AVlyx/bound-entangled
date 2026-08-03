import { divide, identity, subtract } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { VectorLike } from '../types.js';
import { fail, toVector } from './internal.js';
import { ketbra } from './ketbra.js';

/**
 * Bound entangled state built from an unextendible product basis (UPB).
 *
 * The uniform mixture over the orthogonal complement of a UPB is PPT (each
 * |v_i><v_i| being a product-state projector, partial transposition leaves it
 * unchanged) yet has no product vector in its range, hence is entangled: a
 * bound entangled state.
 *
 * Reference: C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A.
 * Smolin, B. M. Terhal, "Unextendible Product Bases and Bound Entanglement",
 * Phys. Rev. Lett. 82, 5385 (1999), https://arxiv.org/abs/quant-ph/9808030
 *
 * @param basis - the (orthonormal) product vectors forming the UPB.
 * @returns the corresponding bound entangled density matrix.
 */
export function upb(basis: readonly VectorLike[]): Matrix {
  if (basis.length === 0) {
    fail('a UPB must contain at least one vector');
  }
  const vectors = basis.map(toVector);
  const dTotal = vectors[0].length;
  for (const v of vectors) {
    if (v.length !== dTotal) {
      fail(`all UPB vectors must have the same length, got ${dTotal} and ${v.length}`);
    }
  }
  if (vectors.length >= dTotal) {
    fail(`a UPB of ${vectors.length} vectors cannot span a ${dTotal}-dimensional space`);
  }

  let rho = identity(dTotal, 'dense') as Matrix;
  for (const v of vectors) {
    rho = subtract(rho, ketbra(v));
  }
  return divide(rho, dTotal - vectors.length) as Matrix;
}
