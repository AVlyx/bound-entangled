/**
 * https://arxiv.org/abs/quant-ph/0001001
 *
 * J. A. Smolin, "Four-party unlockable bound entangled state",
 * Phys. Rev. A 63, 032306 (2001).
 * Bound entangled state on C⁴ ⊗ C⁴ (four qubits) that can be unlocked
 * by classical communication between any two of the four parties.
 */

import type { Matrix } from 'mathjs';
import { generalizedSmolin } from './generalizedSmolin.js';

/**
 * The Smolin bound entangled state on C⁴ ⊗ C⁴.
 *
 * The equal mixture of the four two-qubit Bell states tensored with themselves,
 *
 * ```text
 * rho = (1/4) sum_{i=0}^{3} |phi_i><phi_i| ⊗ |phi_i><phi_i|
 * ```
 *
 * living on a four-qubit system A ⊗ B ⊗ C ⊗ D. It is the `systems = 4` member
 * of the generalized Smolin family.
 *
 * @returns the 16x16 density matrix of the Smolin state.
 */
export function smolin(): Matrix {
  return generalizedSmolin({ systems: 4 });
}
