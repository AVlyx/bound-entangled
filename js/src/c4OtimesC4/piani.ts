/**
 * https://arxiv.org/abs/quant-ph/0411095
 *
 * F. Benatti, R. Floreanini, M. Piani, "Non-decomposable quantum dynamical
 * semigroups and bound entangled states", Open Syst. Inf. Dyn. 11, 325 (2004).
 *
 * Also presented as "the 4x4 bound entangled Piani state" in
 * https://arxiv.org/abs/2010.08372 (Appendix C5).
 */

import { identity, multiply } from "mathjs";
import type { Matrix } from "mathjs";
import { ketbra, maxEntangled, pauli, permuteSystems, tensor } from "../utils/index.js";
import type { PauliIndex } from "../utils/index.js";
import { sumMatrices } from "../utils/internal.js";

/** The six Pauli index pairs whose generalized Bell projectors make up the state. */
const PAIRS: readonly (readonly [PauliIndex, PauliIndex])[] = [
  [0, 2],
  [1, 1],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
];

/**
 * The projector onto the generalized Bell state |Ψ_ij> = (1 ⊗ σ_i ⊗ σ_j)|Ψ_4^+>.
 *
 * @param i - index of the first Pauli matrix (0 = I, 1 = X, 2 = Y, 3 = Z).
 * @param j - index of the second Pauli matrix (0 = I, 1 = X, 2 = Y, 3 = Z).
 * @returns the rank-1 projector P_ij on C⁴ ⊗ C⁴, as a 16x16 matrix.
 */
export function projectorIj(i: PauliIndex, j: PauliIndex): Matrix {
  const sigmaIj = tensor(identity(4, "dense") as Matrix, pauli([i, j]));
  const ketIj = multiply(sigmaIj, maxEntangled(4));
  return ketbra(ketIj);
}

/**
 * The 4x4 bound entangled "Piani" state.
 *
 * Uniform mixture of the six projections P_ij for (i, j) in
 * {(0,2), (1,1), (2,3), (3,1), (3,2), (3,3)}, indecomposable and PPT under the
 * bipartition AA'|BB' after regrouping the four underlying qubits.
 *
 * @returns the 16x16 bound entangled density matrix.
 */
export function piani(): Matrix {
  return multiply(1 / 6, sumMatrices(PAIRS.map(([i, j]) => projectorIj(i, j)))) as Matrix;
}
