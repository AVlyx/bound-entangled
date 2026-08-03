import { matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Dims, MatrixLike, Scalar } from '../types.js';
import { fail, toSquareMatrixArray, totalDimension } from './internal.js';

/**
 * Where each basis state of the original ordering ends up once the subsystems
 * are reordered: `ret[i]` is the flat index that the original flat index `i`
 * is carried to.
 */
function permuteSubsystemsIndexes(perm: readonly number[], dims: Dims): number[] {
  // Position i of the new ordering holds original subsystem perm[i], so the
  // stride of that subsystem becomes the row-major stride of position i.
  const permStepSizes: number[] = new Array(dims.length);
  permStepSizes[perm[perm.length - 1]] = 1;
  for (let i = dims.length - 2; i >= 0; i--) {
    permStepSizes[perm[i]] = permStepSizes[perm[i + 1]] * dims[perm[i + 1]];
  }

  const ret: number[] = [];
  const rec = (sys: number, permIndex: number) => {
    if (sys >= perm.length) {
      ret.push(permIndex);
      return;
    }
    for (let i = 0; i < dims[sys]; i++) {
      rec(sys + 1, permIndex + i * permStepSizes[sys]);
    }
  };
  rec(0, 0);
  return ret;
}

/** The equal subsystem dimensions implied by a total dimension, or an error. */
function equalDims(dimension: number, numSystems: number): number[] {
  const local = Math.round(dimension ** (1 / numSystems));
  if (local ** numSystems !== dimension) {
    fail(`cannot split dimension ${dimension} into ${numSystems} equal subsystems; pass dims explicitly`);
  }
  return new Array<number>(numSystems).fill(local);
}

/**
 * Reorder the subsystems of an operator.
 *
 * `perm` is read positionally and **zero-indexed**: position `i` of the new
 * ordering holds the original subsystem `perm[i]`. So on C^A ⊗ C^B ⊗ C^C,
 * `perm = [1, 2, 0]` returns the operator regarded as living on
 * C^B ⊗ C^C ⊗ C^A, matching toqito's `permute_systems`.
 *
 * @param rho - the operator to reorder, of dimension `prod(dims)`.
 * @param perm - a permutation of `0 .. dims.length - 1`.
 * @param dims - the subsystem dimensions. Defaults to equal dimensions.
 * @returns the reordered operator.
 */
export function permuteSystems(rho: MatrixLike, perm: readonly number[], dims?: Dims): Matrix {
  const { rows, dimension } = toSquareMatrixArray(rho);
  const subsystemDims = dims ?? equalDims(dimension, perm.length);

  if (perm.length !== subsystemDims.length) {
    fail(`perm has ${perm.length} entries but dims has ${subsystemDims.length}`);
  }
  const seen = [...perm].sort((a, b) => a - b);
  if (seen.some((value, index) => value !== index)) {
    fail(`perm must be a permutation of 0..${perm.length - 1}, got [${perm.join(', ')}]`);
  }
  const total = totalDimension(subsystemDims);
  if (dimension !== total) {
    fail(`matrix of dimension ${dimension} does not match dims [${subsystemDims.join(', ')}] (product ${total})`);
  }

  // Permuting the subsystems conjugates by the permutation operator P, so both
  // indices of every entry move the same way: out[P(i)][P(j)] = rho[i][j].
  const target = permuteSubsystemsIndexes(perm, subsystemDims);
  const out: Scalar[][] = Array.from({ length: dimension }, () => new Array<Scalar>(dimension));
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      out[target[i]][target[j]] = rows[i][j];
    }
  }
  return matrix(out);
}
