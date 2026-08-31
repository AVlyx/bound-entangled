/**
 * https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101
 *
 * ρ_F2 from Phys. Rev. Research 3, 023101 (2021) — the "second family" of PPT
 * singlets, reverse-engineered from G. Tóth, T. Vértesi, "Quantum States with a
 * Positive Partial Transpose are Useful for Metrology", Phys. Rev. Lett. 120,
 * 020506 (2018). Port of `BES_metro.m` from the QUBIT4MATLAB package.
 */

import { multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ket, ketbra, permuteSystems, tensor } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

export interface OrthogonalSingletOptions {
  /**
   * The shield subsystem dimension d. Must be 3 or a power of two, so that the
   * total local dimension 2d is one of 4, 6, 8, 16, ...
   */
  shieldDim: number;
}

/** The product basis state |i j k l> of C² ⊗ C² ⊗ C^d ⊗ C^d. */
function basis(d: number, i: number, j: number, k: number, l: number): Matrix {
  return ket([2, 2, d, d], [i, j, k, l]);
}

/**
 * The orthogonal matrices Q^k of Appendix G, as `Q[k][row][column]`.
 *
 * For d = 3 these are the reflections/rotations of Eq. G3; for d = 2^n they are
 * the 2^n tensor products of the Pauli X and the identity, one per bit pattern.
 */
function buildQMatrices(d: number): number[][][] {
  if (d === 3) {
    return [0, 1, 2].map((k) => {
      const phi = (2 * Math.PI * (k + 1)) / 3;
      const c = Math.cos(phi);
      const s = Math.sin(phi);
      return [
        [c, s, 0],
        [s, -c, 0],
        [0, 0, 1],
      ];
    });
  }

  if (d >= 2 && (d & (d - 1)) === 0) {
    const n = Math.round(Math.log2(d));
    const x = [
      [0, 1],
      [1, 0],
    ];
    const identity = [
      [1, 0],
      [0, 1],
    ];
    const matrices: number[][][] = [];
    for (let k = 0; k < d; k++) {
      const bits = k.toString(2).padStart(n, '0');
      let product = bits[0] === '1' ? x : identity;
      for (const bit of bits.slice(1)) {
        const factor = bit === '1' ? x : identity;
        const size = product.length;
        const next: number[][] = [];
        for (let row = 0; row < size * 2; row++) {
          next.push(new Array<number>(size * 2).fill(0));
          for (let column = 0; column < size * 2; column++) {
            next[row][column] =
              product[Math.floor(row / 2)][Math.floor(column / 2)] * factor[row % 2][column % 2];
          }
        }
        product = next;
      }
      matrices.push(product);
    }
    return matrices;
  }

  return fail(`the shield dimension must be 3 or a power of two, got ${d}`);
}

/**
 * The |s_k> vectors on A'B' that pair with |01>_AB.
 *
 * For d = 3 the paper hard-codes them (Eqs. G4-G5, the symmetric partners of
 * the |t_k>); for d = 2^n they are the |t_k> themselves (Eq. G16).
 */
function buildSkVectors(q: number[][][], d: number): Matrix[] {
  if (d === 3) {
    const e = (i: number): Matrix => ket(d, i);
    return [
      multiply(1 / Math.SQRT2, sumMatrices([tensor(e(0), e(0)), tensor(e(1), e(1))])) as Matrix,
      multiply(
        1 / Math.SQRT2,
        sumMatrices([tensor(e(0), e(1)), multiply(-1, tensor(e(1), e(0))) as Matrix]),
      ) as Matrix,
      tensor(e(2), e(2)),
    ];
  }

  const vectors: Matrix[] = [];
  for (let k = 0; k < d; k++) {
    const terms: Matrix[] = [];
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        if (q[k][i][j] !== 0) {
          terms.push(multiply(q[k][i][j], ket([d, d], [i, j])) as Matrix);
        }
      }
    }
    vectors.push(multiply(1 / Math.sqrt(d), sumMatrices(terms)) as Matrix);
  }
  return vectors;
}

/**
 * The ρ_F2 (second-family) PPT singlet on C^2d ⊗ C^2d.
 *
 * Reverse-engineered from Tóth & Vértesi and presented as ρ_F2 in Phys. Rev.
 * Research 3, 023101 (2021). Bound entangled for every valid `shieldDim`. The
 * construction is built up in ABA'B' ordering (two-qubit pair AB, shield pair
 * A'B'), then permuted to AA'BB' before being returned, so the
 * Alice = (A, A') | Bob = (B, B') cut can be tested directly on the result.
 *
 * @param options - see {@link OrthogonalSingletOptions}.
 * @returns the (4d²) x (4d²) density matrix of the ρ_F2 singlet, in AA'BB'
 * ordering.
 */
export function orthogonalSinglet({ shieldDim }: OrthogonalSingletOptions): Matrix {
  const d = shieldDim;
  if (!Number.isInteger(d) || d < 2) {
    fail(`the shield dimension must be an integer >= 2, got ${d}`);
  }

  const p1 = Math.sqrt(d) / (1 + Math.sqrt(d));
  const p2 = 1 - p1;

  const q = buildQMatrices(d);
  const skVectors = buildSkVectors(q, d);

  // sum1: the |00 ij> component paired, through Q^j, with the |11 jk> ones.
  const sum1Terms: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      const terms: Matrix[] = [multiply(1 / Math.SQRT2, basis(d, 0, 0, i, j)) as Matrix];
      for (let k = 0; k < d; k++) {
        if (q[j][i][k] !== 0) {
          terms.push(multiply(q[j][i][k] / Math.SQRT2, basis(d, 1, 1, j, k)) as Matrix);
        }
      }
      sum1Terms.push(ketbra(sumMatrices(terms)));
    }
  }

  // sum2: |01>_AB tensored with each of the |s_k>.
  const ab01 = ket([2, 2], [0, 1]);
  const sum2Terms = skVectors.map((sk) => ketbra(tensor(ab01, sk)));

  // sum3: the |10 ii> populations.
  const sum3Terms: Matrix[] = [];
  for (let i = 0; i < d; i++) {
    sum3Terms.push(ketbra(basis(d, 1, 0, i, i)));
  }

  const rho = sumMatrices([
    multiply(p1 / d ** 2, sumMatrices(sum1Terms)) as Matrix,
    multiply(p2 / (2 * d), sumMatrices(sum2Terms)) as Matrix,
    multiply(p2 / (2 * d), sumMatrices(sum3Terms)) as Matrix,
  ]);
  return permuteSystems(rho, [0, 2, 1, 3], [2, 2, d, d]);
}
