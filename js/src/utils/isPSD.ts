import { eigs, isMatrix } from 'mathjs';
import type { MatrixLike, Scalar } from '../types.js';
import { imagPart, realPart, toSquareMatrixArray } from './internal.js';

/**
 * Default slack for the eigenvalue and Hermiticity tests.
 *
 * The states in this library come from exact algebra, so the only slack needed
 * is for the tiny negative eigenvalues that boundary (rank-deficient, extremal)
 * states pick up from floating point.
 */
export const DEFAULT_TOLERANCE = 1e-8;

/**
 * Whether `m` is positive semidefinite, i.e. Hermitian with no negative
 * eigenvalue.
 *
 * A non-Hermitian matrix is reported as not PSD, since for complex matrices
 * <x|M|x> ≥ 0 for every |x> already forces M to be Hermitian.
 *
 * @param m - the square matrix to test.
 * @param tol - eigenvalues above `-tol` count as non-negative, and entries may
 *   break Hermiticity by up to `tol`.
 * @returns true if `m` is positive semidefinite to within `tol`.
 */
export function isPSD(m: MatrixLike, tol: number = DEFAULT_TOLERANCE): boolean {
  const { rows, dimension } = toSquareMatrixArray(m);

  // Split into the real symmetric and imaginary antisymmetric parts. This is
  // both the Hermiticity test and the input to the eigenvalue solver below:
  // averaging the two triangles is the usual symmetrization that keeps a
  // Hermitian-up-to-noise matrix from producing complex eigenvalues.
  const real: number[][] = [];
  const imaginary: number[][] = [];
  let isReal = true;
  for (let i = 0; i < dimension; i++) {
    real.push(new Array<number>(dimension));
    imaginary.push(new Array<number>(dimension));
  }
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      const upper = rows[i][j];
      const lower = rows[j][i];
      // Hermitian means M[i][j] === conj(M[j][i]).
      const reDiff = realPart(upper) - realPart(lower);
      const imSum = imagPart(upper) + imagPart(lower);
      if (Math.abs(reDiff) > tol || Math.abs(imSum) > tol) {
        return false;
      }
      real[i][j] = (realPart(upper) + realPart(lower)) / 2;
      imaginary[i][j] = (imagPart(upper) - imagPart(lower)) / 2;
      if (imaginary[i][j] !== 0) {
        isReal = false;
      }
    }
  }

  // A Hermitian H = A + iB is PSD exactly when the real symmetric matrix
  // [[A, -B], [B, A]] is, whose eigenvalues are those of H each twice. That
  // keeps the problem on mathjs' real symmetric eigensolver even for complex
  // states; a real matrix already is one, so skip the doubling.
  const symmetric = isReal ? real : realEmbedding(real, imaginary);

  const { values } = eigs(symmetric, { eigenvectors: false });
  const eigenvalues = (isMatrix(values) ? values.toArray() : values) as unknown as Scalar[];
  for (const value of eigenvalues) {
    // Defensive: the symmetric solver returns reals, but a stray imaginary part
    // would mean the matrix was not Hermitian after all.
    if (Math.abs(imagPart(value)) > tol || realPart(value) < -tol) {
      return false;
    }
  }
  return true;
}

/** The 2n x 2n real symmetric matrix [[A, -B], [B, A]] representing A + iB. */
function realEmbedding(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  const embedded: number[][] = [];
  for (let i = 0; i < 2 * n; i++) {
    embedded.push(new Array<number>(2 * n));
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      embedded[i][j] = a[i][j];
      embedded[i][n + j] = -b[i][j];
      embedded[n + i][j] = b[i][j];
      embedded[n + i][n + j] = a[i][j];
    }
  }
  return embedded;
}
