/**
 * https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101
 *
 * P. Bądziąg, K. Horodecki, M. Horodecki, J. Jenkins, "Bound entanglement is
 * not sufficient for private key distillation"-style PPT singlets, presented
 * as ρ_F1 in Phys. Rev. Research 3, 023101 (2021).
 */

import { conj, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../types.js';
import { fourier, ket, ketbra } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

export interface BadziagPrivateSingletOptions {
  /**
   * The shield subsystem dimension d, at least 2. The state lives on
   * C² ⊗ C² ⊗ C^d ⊗ C^d in ABA'B' ordering, i.e. C^2d ⊗ C^2d across the
   * Alice|Bob cut once the systems are reordered to AA'BB'.
   */
  shieldDim: number;
}

/** The product basis state |i j k l> of C² ⊗ C² ⊗ C^d ⊗ C^d. */
function basis(d: number, i: number, j: number, k: number, l: number): Matrix {
  return ket([2, 2, d, d], [i, j, k, l]);
}

/**
 * The Bądziąg et al. private-singlet bound entangled state on C^2d ⊗ C^2d.
 *
 * A PPT singlet built from a shield pair A'B' of local dimension d and a
 * two-qubit pair AB, mixed with weights `p1 = √d / (1 + √d)` and `p2 = 1 - p1`.
 * The state is bound entangled for every `shieldDim >= 2`. The returned matrix
 * is in ABA'B' ordering, so testing the Alice|Bob cut requires permuting the
 * systems to AA'BB' first.
 *
 * @param options - see {@link BadziagPrivateSingletOptions}.
 * @returns the (4d²) x (4d²) density matrix of the private singlet.
 */
export function badziagPrivateSinglet({ shieldDim }: BadziagPrivateSingletOptions): Matrix {
  const d = shieldDim;
  if (!Number.isInteger(d) || d < 2) {
    fail(`the shield dimension must be an integer >= 2, got ${d}`);
  }

  const p1 = Math.sqrt(d) / (1 + Math.sqrt(d));
  const p2 = 1 - p1;
  const u = fourier(d);

  // The diagonal |00 ij> and |11 ij> populations of the p1 branch.
  const diagonal00And11: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      diagonal00And11.push(ketbra(basis(d, 0, 0, i, j)));
      diagonal00And11.push(ketbra(basis(d, 1, 1, i, j)));
    }
  }

  // The |00 ij><11 ji| coherences of the p1 branch, weighted by the Fourier
  // matrix, plus their Hermitian conjugates.
  const coherence00To11: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      const uij = u.get([i, j]) as Scalar;
      coherence00To11.push(
        multiply(uij, ketbra(basis(d, 0, 0, i, j), basis(d, 1, 1, j, i))) as Matrix,
      );
      coherence00To11.push(
        multiply(conj(uij), ketbra(basis(d, 1, 1, j, i), basis(d, 0, 0, i, j))) as Matrix,
      );
    }
  }

  // The diagonal |01 ii> and |10 ii> populations of the p2 branch.
  const diagonal01And10: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    diagonal01And10.push(ketbra(basis(d, 0, 1, i, i)));
    diagonal01And10.push(ketbra(basis(d, 1, 0, i, i)));
  }

  // The |01 ii><10 jj| coherences of the p2 branch and their conjugates.
  const coherence01To10: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      const uij = u.get([i, j]) as Scalar;
      coherence01To10.push(
        multiply(uij, ketbra(basis(d, 0, 1, i, i), basis(d, 1, 0, j, j))) as Matrix,
      );
      coherence01To10.push(
        multiply(conj(uij), ketbra(basis(d, 1, 0, j, j), basis(d, 0, 1, i, i))) as Matrix,
      );
    }
  }

  return sumMatrices([
    multiply(p1 / (2 * d ** 2), sumMatrices(diagonal00And11)) as Matrix,
    multiply(p1 / (2 * d * Math.sqrt(d)), sumMatrices(coherence00To11)) as Matrix,
    multiply(p2 / (2 * d), sumMatrices(diagonal01And10)) as Matrix,
    multiply(p2 / (2 * d), sumMatrices(coherence01To10)) as Matrix,
  ]);
}
