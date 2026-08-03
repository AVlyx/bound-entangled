/**
 * https://arxiv.org/abs/quant-ph/9908070
 *
 * D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
 * "Unextendible Product Bases, Uncompletable Product Bases and Bound
 * Entanglement", Commun. Math. Phys. 238, 379 (2003), Section V B, Theorem 5.
 * A "tile" construction generalizing the Tiles UPB to arbitrary even
 * dimension.
 */

import { add } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../types.js';
import { ket, normalize, tensor, upb } from '../utils/index.js';
import { fail, rootOfUnity } from '../utils/internal.js';

export interface GenTiles1Options {
  /** The local dimension of both parties. Must be even and >= 4. */
  fullDim: number;
}

/**
 * The half-filled vector sum_j ω^(jm) |j + shift mod d>, where ω = exp(4πi/d).
 *
 * ω^(jm) = exp(2πi · 2jm / d), so the exponent is doubled against the d-th
 * roots of unity.
 */
function omegaKet(d: number, m: number, shift: number): Matrix {
  const data = new Array<Scalar>(d).fill(0);
  for (let j = 0; j < d / 2; j++) {
    const index = (j + shift) % d;
    data[index] = add(data[index], rootOfUnity(2 * j * m, d)) as Scalar;
  }
  return normalize(data);
}

/**
 * The product vectors of the GenTiles1 UPB on C^d ⊗ C^d.
 *
 * Built from d/2 - 1 "vertical" and d/2 - 1 "horizontal" families of tile
 * states (Eqs. 5.4-5.5) plus a "stopper" state (Eq. 5.6), for a total of
 * d² - 2d + 1 states.
 *
 * @param options - see {@link GenTiles1Options}.
 * @returns the normalized product vectors forming the UPB.
 */
export function genTiles1Basis({ fullDim }: GenTiles1Options): Matrix[] {
  const d = fullDim;
  if (!Number.isInteger(d) || d < 4 || d % 2 !== 0) {
    fail(`GenTiles1 requires an even dimension >= 4, got ${d}`);
  }

  const basis: Matrix[] = [];

  // |V_mk> = |k> (x) |omega_{m, k+1}>
  for (let m = 1; m < d / 2; m++) {
    for (let k = 0; k < d; k++) {
      basis.push(tensor(ket(d, k), omegaKet(d, m, k + 1)));
    }
  }

  // |H_mk> = |omega_{m, k}> (x) |k>
  for (let m = 1; m < d / 2; m++) {
    for (let k = 0; k < d; k++) {
      basis.push(tensor(omegaKet(d, m, k), ket(d, k)));
    }
  }

  // |F> = (sum_i sum_j |i> (x) |j>) / d
  basis.push(normalize(new Array<number>(d * d).fill(1)));

  return basis;
}

/**
 * The bound entangled state built from the GenTiles1 UPB on C^d ⊗ C^d.
 *
 * @param options - see {@link GenTiles1Options}.
 * @returns the bound entangled state on the orthogonal complement of the UPB.
 */
export function genTiles1(options: GenTiles1Options): Matrix {
  return upb(genTiles1Basis(options));
}
