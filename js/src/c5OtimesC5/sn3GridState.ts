/**
 * https://arxiv.org/abs/2402.12966
 *
 * R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum
 * bound entangled states", Result 1 / Appendix B: the smallest known Schmidt
 * number 3 (hence "SN3") PPT bound entangled state, in local dimension 5x5.
 */

import type { Matrix } from 'mathjs';
import { generalizedGridState } from '../cmOtimesCn/index.js';

/**
 * The smallest known Schmidt number 3 PPT bound entangled state, on C⁵ ⊗ C⁵.
 *
 * @returns the Schmidt number 3 generalized grid state rho_5,5.
 */
export function sn3GridState(): Matrix {
  return generalizedGridState({
    dims: [5, 5],
    hyperedges: [
      // loops
      [[0, 0]],
      [[1, 0]],
      [[0, 1]],
      [[4, 1]],
      [[1, 4]],
      // double loops
      [[3, 2]],
      [[2, 3]],
      [[3, 2]],
      [[2, 3]],
      // edges
      [
        [1, 2],
        [3, 4],
      ],
      [
        [2, 1],
        [4, 3],
      ],
      [
        [2, 2],
        [3, 3],
      ],
      // hyperedge
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ],
  });
}
