/**
 * https://arxiv.org/abs/quant-ph/9808030
 *
 * C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M.
 * Terhal, "Unextendible Product Bases and Bound Entanglement", Phys. Rev.
 * Lett. 82, 5385 (1999).
 */

import type { Matrix } from 'mathjs';
import { tile, upb } from '../../utils/index.js';

/**
 * The five product vectors of the "Tiles" UPB on C³ ⊗ C³.
 *
 * @returns the five normalized product vectors forming the UPB.
 */
export function tilesBasis(): Matrix[] {
  return [0, 1, 2, 3, 4].map(tile);
}

/**
 * The bound entangled state built from the Tiles UPB.
 *
 * @returns the bound entangled state on the orthogonal complement of the UPB.
 */
export function tilesUpb(): Matrix {
  return upb(tilesBasis());
}
