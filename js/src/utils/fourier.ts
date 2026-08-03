import { complex, matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../types.js';
import { fail } from './internal.js';

/**
 * The Fourier (DFT) matrix of dimension `dim`, the unitary implementing the
 * quantum Fourier transform: `W[j][k] = ω^(jk) / √d` with `ω = exp(2πi/d)`.
 *
 * @param dim - the size of the matrix.
 * @returns the dim x dim Fourier matrix.
 */
export function fourier(dim: number): Matrix {
  if (!Number.isInteger(dim) || dim < 1) {
    fail(`dimension must be a positive integer, got ${dim}`);
  }
  const scale = 1 / Math.sqrt(dim);
  const rows: Scalar[][] = [];
  for (let j = 0; j < dim; j++) {
    const row = new Array<Scalar>(dim);
    for (let k = 0; k < dim; k++) {
      // Reducing the exponent mod d keeps the angle small, which is both more
      // accurate and exact at the quarter turns.
      const angle = (2 * Math.PI * ((j * k) % dim)) / dim;
      row[k] = complex(Math.cos(angle) * scale, Math.sin(angle) * scale);
    }
    rows.push(row);
  }
  return matrix(rows);
}
