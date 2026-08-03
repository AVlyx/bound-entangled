/**
 * https://arxiv.org/abs/quant-ph/9908070
 *
 * D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
 * "Unextendible Product Bases, Uncompletable Product Bases and Bound
 * Entanglement", Commun. Math. Phys. 238, 379 (2003), Section IV A. A
 * six-parameter family of unextendible product bases on C³ ⊗ C³ that contains
 * the Pyramid and Tiles UPBs as special cases.
 */

import { complex, multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../../types.js';
import { tensor, upb } from '../../utils/index.js';

export interface ParametrizedUpbOptions {
  /** Alice's gamma angle. Needs `cos(gammaA) != 0` and `sin(gammaA) != 0`. */
  gammaA: number;
  /** Alice's theta angle. Needs `cos(thetaA) != 0` and `sin(thetaA) != 0`. */
  thetaA: number;
  /** Alice's phase angle. */
  phiA: number;
  /** Bob's gamma angle, subject to the same restriction as `gammaA`. */
  gammaB: number;
  /** Bob's theta angle, subject to the same restriction as `thetaA`. */
  thetaB: number;
  /** Bob's phase angle. */
  phiB: number;
}

/** `exp(i·phi)`, the phase the two parties' fourth and fifth vectors carry. */
function phase(phi: number): Scalar {
  return complex(Math.cos(phi), Math.sin(phi));
}

/** One party's five vectors in C³, from that party's three angles. */
function partyVectors(gamma: number, theta: number, phi: number): Scalar[][] {
  const normalization = Math.sqrt(Math.cos(gamma) ** 2 + Math.sin(gamma) ** 2 * Math.cos(theta) ** 2);
  return [
    [1, 0, 0],
    [0, 1, 0],
    [Math.cos(theta), 0, Math.sin(theta)],
    [
      Math.sin(gamma) * Math.sin(theta),
      multiply(Math.cos(gamma), phase(phi)) as Scalar,
      -Math.sin(gamma) * Math.cos(theta),
    ],
    [
      0,
      multiply((Math.sin(gamma) * Math.cos(theta)) / normalization, phase(phi)) as Scalar,
      Math.cos(gamma) / normalization,
    ],
  ];
}

/**
 * The five product vectors of the six-parameter family of UPBs on C³ ⊗ C³.
 *
 * Reduces to the Pyramid UPB for `phiA = phiB = 0` and
 * `thetaA = thetaB = gammaA = gammaB = arccos((√5 - 1)/2)`, and to the Tiles
 * UPB for `phiA = phiB = 0` and `thetaA = thetaB = gammaA = gammaB = 3π/4`.
 *
 * @param options - see {@link ParametrizedUpbOptions}.
 * @returns the five normalized product vectors |a_i> ⊗ |b_i> forming the UPB.
 */
export function parametrizedBasis({
  gammaA,
  thetaA,
  phiA,
  gammaB,
  thetaB,
  phiB,
}: ParametrizedUpbOptions): Matrix[] {
  const alice = partyVectors(gammaA, thetaA, phiA);
  const bob = partyVectors(gammaB, thetaB, phiB);
  // Bob's vectors pair with Alice's in a different order, which is what makes
  // the basis unextendible.
  const bobOrder = [1, 3, 0, 2, 4];
  return alice.map((a, i) => tensor(a, bob[bobOrder[i]]));
}

/**
 * The bound entangled state built from the six-parameter family of UPBs.
 *
 * @param options - see {@link ParametrizedUpbOptions}.
 * @returns the bound entangled state on the orthogonal complement of the UPB.
 */
export function parametrizedUpb(options: ParametrizedUpbOptions): Matrix {
  return upb(parametrizedBasis(options));
}
