/**
 * https://arxiv.org/abs/quant-ph/9703004
 *
 * P. Horodecki, "Separability criterion and inseparable mixed states with
 * positive partial transposition", Phys. Lett. A 232, 333 (1997), Section 4.1.
 * One of the first known families of bound entangled states: PPT for every
 * `aParam` in [0, 1], separable only at the endpoints 0 and 1.
 *
 * See also D. Chruściński, A. Kossakowski, "Circulant states with positive
 * partial transpose", https://arxiv.org/abs/1108.2233, Eq. (1).
 */

import { matrix, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { fail } from '../utils/internal.js';

export interface HorodeckiOptions {
  /** The free real parameter, in [0, 1]. */
  aParam: number;
}

/**
 * The 3x3 Horodecki state.
 *
 * @param options - see {@link HorodeckiOptions}.
 * @returns the 9x9 Horodecki density matrix.
 */
export function horodecki({ aParam: a }: HorodeckiOptions): Matrix {
  if (!(a >= 0 && a <= 1)) {
    fail(`aParam must lie in [0, 1], got ${a}`);
  }
  const b = (1 + a) / 2;
  const c = Math.sqrt(1 - a ** 2) / 2;

  return multiply(
    1 / (8 * a + 1),
    matrix([
      [a, 0, 0, 0, a, 0, 0, 0, a],
      [0, a, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, a, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, a, 0, 0, 0, 0, 0],
      [a, 0, 0, 0, a, 0, 0, 0, a],
      [0, 0, 0, 0, 0, a, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, b, 0, c],
      [0, 0, 0, 0, 0, 0, 0, a, 0],
      [a, 0, 0, 0, a, 0, c, 0, b],
    ]),
  ) as Matrix;
}
