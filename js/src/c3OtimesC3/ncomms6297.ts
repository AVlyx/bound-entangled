/**
 * https://www.nature.com/articles/ncomms6297
 *
 * Rank-4 PPT entangled state on C³ ⊗ C³ constructed from an explicit spectral
 * decomposition (Nature Commun. 5, 6297 (2014)).
 */

import { multiply } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ketbra } from '../utils/index.js';
import { sumMatrices } from '../utils/internal.js';

/** The combination `sum_t coefficient_t |i_t j_t>` in C³ ⊗ C³, as a flat 9-vector. */
function combine(terms: readonly [number, number, number][]): number[] {
  const v = new Array<number>(9).fill(0);
  for (const [coefficient, i, j] of terms) {
    v[i * 3 + j] += coefficient;
  }
  return v;
}

/**
 * The ncomms6297 bound entangled state on C³ ⊗ C³.
 *
 * A rank-4 PPT entangled state built from four explicit eigenvectors with the
 * eigenvalues given in Nature Commun. 5, 6297 (2014).
 *
 * @returns the 9x9 density matrix of the bound entangled state.
 */
export function ncomms6297(): Matrix {
  const a = Math.sqrt(131 / 2);
  const root2 = 1 / Math.SQRT2;
  const root3 = 1 / Math.sqrt(3);

  const psi1 = combine([
    [root2, 0, 0],
    [root2, 1, 1],
  ]);
  const psi2 = combine([
    [a / 12, 0, 1],
    [a / 12, 1, 0],
    [1 / 60, 0, 2],
    [-3 / 10, 2, 1],
  ]);
  const psi3 = combine([
    [a / 12, 0, 0],
    [-a / 12, 1, 1],
    [1 / 60, 1, 2],
    [3 / 10, 2, 0],
  ]);
  const psi4 = combine([
    [-root3, 0, 1],
    [root3, 1, 0],
    [root3, 2, 2],
  ]);

  const eigenvalues = [3257 / 6884, 450 / 1721, 450 / 1721, 27 / 6884];
  const vectors = [psi1, psi2, psi3, psi4];
  return sumMatrices(vectors.map((psi, i) => multiply(eigenvalues[i], ketbra(psi)) as Matrix));
}
