/**
 * https://arxiv.org/abs/quant-ph/9908070
 *
 * D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
 * "Unextendible Product Bases, Uncompletable Product Bases and Bound
 * Entanglement", Commun. Math. Phys. 238, 379 (2003), Section V B, Theorem 6.
 * A "tile" construction generalizing the Tiles UPB to arbitrary m ⊗ n
 * dimension.
 */

import { add } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../types.js';
import { normalize, tensor, upb } from '../utils/index.js';
import { fail, rootOfUnity } from '../utils/internal.js';

export interface GenTiles2Options {
  /**
   * The dimensions `[m, n]` of the C^m ⊗ C^n system. Requires `n > 3`,
   * `m >= 3` and `n >= m`. Note that m = n = 3 does not yield a UPB, which is
   * why `n > 3` is required.
   */
  dims: readonly [number, number];
}

/**
 * The product vectors of the GenTiles2 UPB on C^m ⊗ C^n.
 *
 * Built from m "short" tile states (Eq. 5.9), m(n - 3) "long" tile states
 * (Eq. 5.10), and a "stopper" state (Eq. 5.11), for a total of mn - 2m + 1.
 *
 * @param options - see {@link GenTiles2Options}.
 * @returns the normalized product vectors forming the UPB.
 */
export function genTiles2Basis({ dims }: GenTiles2Options): Matrix[] {
  const [m, n] = dims;
  if (!(n > 3 && m >= 3 && n >= m)) {
    fail(`GenTiles2 requires n > 3, m >= 3 and n >= m, got [${m}, ${n}]`);
  }

  const basis: Matrix[] = [];

  // |S_j> = (|j> - |j+1 mod m>)/sqrt(2) (x) |j>
  for (let j = 0; j < m; j++) {
    const ketA = new Array<number>(m).fill(0);
    ketA[j] += 1;
    ketA[(j + 1) % m] -= 1;
    const ketB = new Array<number>(n).fill(0);
    ketB[j] = 1;
    basis.push(tensor(normalize(ketA), ketB));
  }

  // |L_jk> = |j> (x) (sum_{i<m-2} w^(ik) |i+j+1 mod m> + sum_{i>=m-2} w^(ik) |i+2>)
  for (let j = 0; j < m; j++) {
    const ketA = new Array<number>(m).fill(0);
    ketA[j] = 1;
    for (let k = 1; k < n - 2; k++) {
      const ketB = new Array<Scalar>(n).fill(0);
      for (let i = 0; i < m - 2; i++) {
        const index = (i + j + 1) % m;
        ketB[index] = add(ketB[index], rootOfUnity(i * k, n - 2)) as Scalar;
      }
      for (let i = m - 2; i < n - 2; i++) {
        ketB[i + 2] = add(ketB[i + 2], rootOfUnity(i * k, n - 2)) as Scalar;
      }
      basis.push(tensor(ketA, normalize(ketB)));
    }
  }

  // |F> = (sum_i sum_j |i> (x) |j>) / sqrt(mn)
  basis.push(normalize(new Array<number>(m * n).fill(1)));

  return basis;
}

/**
 * The bound entangled state built from the GenTiles2 UPB on C^m ⊗ C^n.
 *
 * @param options - see {@link GenTiles2Options}.
 * @returns the bound entangled state on the orthogonal complement of the UPB.
 */
export function genTiles2(options: GenTiles2Options): Matrix {
  return upb(genTiles2Basis(options));
}
