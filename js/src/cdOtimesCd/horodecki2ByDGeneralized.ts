/**
 * https://arxiv.org/pdf/1203.3711
 *
 * A generalization of the C² ⊗ C⁴ Horodecki state to C² ⊗ C^d.
 */

import { add, divide, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ket, ketbra, tensor } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

export interface Horodecki2ByDOptions {
  /** The second dimension d; the full system is C² ⊗ C^d. Must be >= 2. */
  secondDimD: number;
  /** The free real parameter b. */
  b: number;
}

/** (|0 i> + |1 i+1>) / √2, one of the d - 1 vectors of the inseparable part. */
function psiI(d: number, i: number): Matrix {
  return divide(add(ket([2, d], [0, i]), ket([2, d], [1, i + 1])), Math.SQRT2) as Matrix;
}

/** The inseparable component: a mixture of the psi_i with the corner |1 0>. */
function rhoInsep(d: number): Matrix {
  const terms: Matrix[] = [];
  for (let i = 0; i < d - 1; i++) {
    terms.push(ketbra(psiI(d, i)));
  }
  const psis = multiply(2 / (2 * d - 1), sumMatrices(terms)) as Matrix;
  const corner = multiply(1 / (2 * d - 1), ketbra(ket([2, d], [1, 0]))) as Matrix;
  return add(psis, corner);
}

/** |0>/√2 ⊗ (√(1-b)|0> + √(1+b)|d-1>), the separable component's vector. */
function phiB(d: number, b: number): Matrix {
  const qubit = multiply(1 / Math.SQRT2, ket(2, 0)) as Matrix;
  const shield = add(
    multiply(Math.sqrt(1 - b), ket(d, 0)),
    multiply(Math.sqrt(1 + b), ket(d, d - 1)),
  ) as Matrix;
  return tensor(qubit, shield);
}

/**
 * The generalization of the C² ⊗ C⁴ Horodecki state to C² ⊗ C^d.
 *
 * For d = 4 this is the C² ⊗ C⁴ Horodecki state up to an anti-diagonal
 * transpose.
 *
 * @param options - see {@link Horodecki2ByDOptions}.
 * @returns the generalized Horodecki state, of dimension 2d.
 */
export function horodecki2ByDGeneralized({ secondDimD, b }: Horodecki2ByDOptions): Matrix {
  const d = secondDimD;
  if (!Number.isInteger(d) || d < 2) {
    fail(`the second dimension must be an integer >= 2, got ${d}`);
  }
  const weight = (2 * d - 1) * b;
  return divide(
    add(multiply(weight, rhoInsep(d)) as Matrix, ketbra(phiB(d, b))),
    weight + 1,
  ) as Matrix;
}
