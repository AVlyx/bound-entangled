/**
 * https://arxiv.org/abs/quant-ph/9808030
 *
 * C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M.
 * Terhal, "Unextendible Product Bases and Bound Entanglement", Phys. Rev.
 * Lett. 82, 5385 (1999).
 */

import type { Matrix } from 'mathjs';
import { normalize, tensor, upb } from '../../utils/index.js';

/**
 * The five product vectors of the "Pyramid" UPB on C³ ⊗ C³.
 *
 * @returns the five normalized product vectors forming the UPB.
 */
export function pyramidBasis(): Matrix[] {
  const h = 0.5 * Math.sqrt(1 + Math.sqrt(5));
  const vectors: Matrix[] = [];
  for (let j = 0; j < 5; j++) {
    const a = normalize([
      Math.cos((2 * Math.PI * j) / 5),
      Math.sin((2 * Math.PI * j) / 5),
      h,
    ]);
    const b = normalize([
      Math.cos((4 * Math.PI * j) / 5),
      Math.sin((4 * Math.PI * j) / 5),
      h,
    ]);
    vectors.push(tensor(a, b));
  }
  return vectors;
}

/**
 * The bound entangled state built from the Pyramid UPB.
 *
 * @returns the bound entangled state on the orthogonal complement of the UPB.
 */
export function pyramidUpb(): Matrix {
  return upb(pyramidBasis());
}
