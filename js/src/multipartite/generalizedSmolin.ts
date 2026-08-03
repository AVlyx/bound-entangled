/**
 * https://arxiv.org/abs/quant-ph/0411142
 *
 * A. Kay, "Degree of quantum bound entanglement for a family of mixed states",
 * Phys. Rev. A 71, 032309 (2005). (See also Smolin: arXiv:quant-ph/0001001.)
 * Generalization of the Smolin state to 2n qubits: bound entangled for all
 * even n >= 2, constructed from tensor products of Pauli operators.
 */

import { divide, identity, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { pauli } from '../utils/index.js';
import type { PauliIndex } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

export interface GeneralizedSmolinOptions {
  /** Total number of qubits `2n`. Must be an even integer `>= 2`. */
  systems: number;
}

/**
 * The generalized Smolin (GSS) bound entangled state on `systems = 2n` qubits.
 *
 * ```text
 * rho = (I + (-1)^n * sum_{i in {X, Y, Z}} sigma_i^{⊗2n}) / 2^{2n}
 * ```
 *
 * `systems = 4` reproduces the original Smolin state on C⁴ ⊗ C⁴; for every
 * even `systems >= 4` the state is bound entangled.
 *
 * @param options - see {@link GeneralizedSmolinOptions}.
 * @returns the 2^systems x 2^systems density matrix of the GSS state.
 */
export function generalizedSmolin({ systems }: GeneralizedSmolinOptions): Matrix {
  if (!Number.isInteger(systems) || systems < 2 || systems % 2 !== 0) {
    fail(`the generalized Smolin state needs an even number of qubits >= 2, got ${systems}`);
  }
  const n = systems / 2;
  const sign = n % 2 === 0 ? 1 : -1;
  const dimension = 2 ** systems;

  const terms: Matrix[] = [identity(dimension) as Matrix];
  for (const i of [1, 2, 3] as const) {
    // sigma_i on every qubit: X^{⊗2n}, Y^{⊗2n}, Z^{⊗2n}.
    const word = new Array<PauliIndex>(systems).fill(i);
    terms.push(multiply(sign, pauli(word)) as Matrix);
  }
  return divide(sumMatrices(terms), dimension) as Matrix;
}
