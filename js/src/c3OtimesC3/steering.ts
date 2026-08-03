/**
 * https://arxiv.org/abs/1405.0262
 *
 * T. Moroder, O. Gittsovich, M. Huber, O. Gühne, "Steering Bound Entangled
 * States: A Counterexample to the Stronger Peres Conjecture", Phys. Rev. Lett.
 * 113, 050404 (2014).
 */

import { add, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ketbra } from '../utils/index.js';

export interface SteeringStateOptions {
  /** First free real parameter. */
  m1: number;
  /** Second free real parameter, with `m1² + m2² <= 1`. */
  m2: number;
}

/**
 * A 3x3 bound entangled state that is steerable.
 *
 * Counterexample to the (stronger) Peres conjecture that bound entangled
 * states cannot be used to demonstrate EPR steering.
 *
 * @param options - see {@link SteeringStateOptions}.
 * @returns the steerable bound entangled state on C³ ⊗ C³.
 */
export function steeringState({ m1, m2 }: SteeringStateOptions): Matrix {
  const m3 = Math.sqrt((1 - m1 ** 2 - m2 ** 2) / 2);
  const third = 1 / Math.sqrt(3);
  const half = 1 / Math.SQRT2;

  const psi1 = new Array<number>(9).fill(0);
  const psi2 = new Array<number>(9).fill(0);
  const psi3 = new Array<number>(9).fill(0);
  const psiT3 = new Array<number>(9).fill(0);

  psi1[1 * 3 + 2] = half;
  psi1[2 * 3 + 1] = half;

  psi2[0] = third;
  psi2[1 * 3 + 1] = third;
  psi2[2 * 3 + 2] = -third;

  psi3[1] = m1;
  psi3[1 * 3] = m2;
  psi3[1 * 3 + 1] = m3;
  psi3[2 * 3 + 2] = m3;

  psiT3[2] = m1;
  psiT3[2 * 3] = -m2;
  psiT3[2 * 3 + 1] = m3;
  psiT3[1 * 3 + 2] = -m3;

  const denominator = 4 - 2 * m1 ** 2 + m1 * m2 - 2 * m2 ** 2;
  const lambda1 = 1 - (2 + 3 * m1 * m2) / denominator;
  const lambda3 = 1 / denominator;
  const lambda2 = 1 - lambda1 - 2 * lambda3;

  return add(
    add(multiply(lambda1, ketbra(psi1)), multiply(lambda2, ketbra(psi2))),
    multiply(lambda3, add(ketbra(psi3), ketbra(psiT3))),
  );
}
