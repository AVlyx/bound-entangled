/**
 * https://arxiv.org/abs/1705.09261
 *
 * J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid
 * states", Phys. Rev. A 97, 062340 (2018).
 */

import type { Matrix } from 'mathjs';
import { gridState } from '../cmOtimesCn/index.js';

/**
 * The 3x3 "cross-hatch" grid state.
 *
 * A bound entangled example of a quantum grid state, detected by the CCNR
 * (realignment) criterion.
 *
 * @returns the cross-hatch grid state on C³ ⊗ C³.
 */
export function crossHatch(): Matrix {
  return gridState({
    dims: [3, 3],
    edges: [
      [
        [0, 0],
        [1, 2],
      ],
      [
        [1, 0],
        [2, 2],
      ],
      [
        [0, 1],
        [2, 0],
      ],
      [
        [0, 2],
        [2, 1],
      ],
    ],
  });
}
