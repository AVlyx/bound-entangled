import { matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import { fail } from './internal.js';

export interface MaxEntangledOptions {
  /** Whether to scale to unit length. Defaults to true. */
  normalized?: boolean;
}

/**
 * The maximally entangled state of C^dim ⊗ C^dim, (1/√d) sum_i |ii>.
 *
 * For `dim = 2` this is the Bell state |Φ+>. Pass `{ normalized: false }` for
 * the bare sum_i |ii>, which is what several constructions in the literature
 * use as an unnormalized building block.
 *
 * @param dim - the local dimension d.
 * @param options - see {@link MaxEntangledOptions}.
 * @returns the state, as a flat vector of length d².
 */
export function maxEntangled(dim: number, options: MaxEntangledOptions = {}): Matrix {
  if (!Number.isInteger(dim) || dim < 1) {
    fail(`dimension must be a positive integer, got ${dim}`);
  }
  const { normalized = true } = options;
  const amplitude = normalized ? 1 / Math.sqrt(dim) : 1;
  const data = new Array<number>(dim * dim).fill(0);
  for (let i = 0; i < dim; i++) {
    data[i * dim + i] = amplitude;
  }
  return matrix(data);
}
