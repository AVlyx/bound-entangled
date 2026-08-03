/**
 * https://arxiv.org/abs/1509.08991
 *
 * S. Yu, C. H. Oh, "A family of nonlocal bound entangled states", Phys. Rev. A
 * 95, 032111 (2017).
 */

import { multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ketbra, maxEntangled } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

export interface YuOhOptions {
  /** The local dimension d, at least 3. */
  fullDim: number;
  /** First free parameter. */
  x: number;
  /** Second free parameter. */
  y: number;
}

/**
 * The (unnormalized) antisymmetric vector |ij> - |ji> of C^d ⊗ C^d.
 *
 * @param d - the local dimension.
 * @param i - the first index.
 * @param j - the second index.
 * @returns the vector |ij> - |ji>.
 */
export function psiIj(d: number, i: number, j: number): number[] {
  const v = new Array<number>(d * d).fill(0);
  v[i * d + j] = 1;
  v[j * d + i] = -1;
  return v;
}

/**
 * The family of vectors {theta_p} used to build phi_k, by induction on the
 * dimension.
 *
 * @param d - the local dimension.
 * @returns the theta_p vectors in C^d.
 */
export function thetaDGen(d: number): number[][] {
  let thetas: number[][] = [
    [0, 1, ...new Array<number>(d - 2).fill(0)],
    [0, -1, ...new Array<number>(d - 2).fill(0)],
  ];
  for (let di = 3; di <= d; di++) {
    const last = new Array<number>(d).fill(0);
    last[di - 1] = 1;
    const scale = Math.sqrt(di * (di - 2));
    thetas = [
      ...thetas.map((theta) => theta.map((value, i) => (scale * value - last[i]) / (di - 1))),
      last,
    ];
  }
  return thetas;
}

/**
 * The helper vector phi_k of C^d ⊗ C^d, a weighted sum of the theta_p ⊗ theta_p.
 *
 * @param d - the local dimension.
 * @param k - the index, 1 <= k < d.
 * @returns the vector phi_k.
 */
export function phiK(d: number, k: number): number[] {
  const result = new Array<number>(d * d).fill(0);
  for (const theta of thetaDGen(d)) {
    const weight = theta[k];
    if (weight === 0) {
      continue;
    }
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        result[i * d + j] += theta[i] * theta[j] * weight;
      }
    }
  }
  const scale = (d - 1) ** 1.5 / (d * Math.sqrt(d - 2));
  return result.map((value) => value * scale);
}

/**
 * The helper vector psi_k of C^d ⊗ C^d.
 *
 * @param d - the local dimension.
 * @param k - the index, 1 <= k < d.
 * @param x - the first free parameter.
 * @param y - the second free parameter.
 * @param z - `sqrt(1 - x² - y²)`.
 * @returns the vector psi_k.
 */
export function psiK(d: number, k: number, x: number, y: number, z: number): number[] {
  const phi = phiK(d, k);
  const result = new Array<number>(d * d).fill(0);
  result[k] = x;
  result[k * d] = y;
  for (let i = 0; i < result.length; i++) {
    result[i] += z * phi[i];
  }
  return result;
}

/**
 * Whether `(x, y)` lie in the valid parameter domain for {@link yuOh}.
 *
 * @param options - see {@link YuOhOptions}.
 * @returns true if `x² + y² <= 1` and the resulting delta is positive.
 */
export function isValidYuOhInput({ fullDim, x, y }: YuOhOptions): boolean {
  if (x ** 2 + y ** 2 > 1) {
    return false;
  }
  const z2 = 1 - x ** 2 - y ** 2;
  return z2 / (fullDim - 2) - x * y > 0;
}

/**
 * The Yu-Oh nonlocal bound entangled state, for local dimension d >= 3.
 *
 * A family of PPT entangled states in C^d ⊗ C^d, parametrized by `(x, y)`,
 * that violate a Bell inequality — hence nonlocal despite being bound
 * entangled. See {@link isValidYuOhInput} for the valid domain.
 *
 * @param options - see {@link YuOhOptions}.
 * @returns the Yu-Oh bound entangled state.
 */
export function yuOh(options: YuOhOptions): Matrix {
  const { fullDim: d, x, y } = options;
  if (!Number.isInteger(d) || d < 3) {
    fail(`the local dimension must be an integer >= 3, got ${d}`);
  }
  if (!isValidYuOhInput(options)) {
    fail(`(x, y) = (${x}, ${y}) is outside the valid Yu-Oh domain for d = ${d}`);
  }

  const z = Math.sqrt(1 - x ** 2 - y ** 2);
  const delta = z ** 2 / (d - 2) - x * y;
  const r = d * x * y + (d - 1) * (d - 2) * delta + d - 1;

  const maximallyEntangled = multiply(
    (x * y) / r,
    ketbra(maxEntangled(d, { normalized: false })),
  ) as Matrix;

  const antisymmetric: Matrix[] = [];
  for (let j = 1; j < d - 1; j++) {
    for (let i = j + 1; i < d; i++) {
      antisymmetric.push(ketbra(psiIj(d, i, j)));
    }
  }

  const psiKTerms: Matrix[] = [];
  for (let k = 1; k < d; k++) {
    psiKTerms.push(ketbra(psiK(d, k, x, y, z)));
  }

  return sumMatrices([
    maximallyEntangled,
    multiply(delta / r, sumMatrices(antisymmetric)) as Matrix,
    multiply(1 / r, sumMatrices(psiKTerms)) as Matrix,
  ]);
}
