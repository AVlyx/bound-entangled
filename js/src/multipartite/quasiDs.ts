/**
 * https://www.nature.com/articles/ncomms6297
 *
 * J. Tura, R. Augusiak, P. Hyllus, M. Kuś, J. Samsonowicz, M. Lewenstein,
 * "Four-qubit entangled symmetric states with positive partial transpositions",
 * see also Nature Commun. 5, 6297 (2014). The quasi-Dicke states are
 * permutationally invariant states on an odd number `n` of qubits that are PPT
 * across every bipartition, and bound entangled for every valid parameter.
 */

import { combinations, matrix, multiply, transpose } from 'mathjs';
import type { Matrix } from 'mathjs';
import { fail } from '../utils/internal.js';

/** The sign parameter of the quasi-Dicke family. */
export type QuasiDsSign = 1 | -1;

export interface QuasiDsOptions {
  /** Number of qubits. Must be an odd integer `>= 3`. */
  n: number;
  /** Real parameter controlling the state's mixing. */
  z: number;
  /** Sign parameter, either `+1` or `-1`. */
  sigma: QuasiDsSign;
}

/**
 * Python-style indexing: a negative `i` counts back from the end of `a`.
 *
 * The recurrences below are ported verbatim from numpy code that mixes
 * negative and non-negative indices *in the same expression*, so translating
 * the indices by eye is not safe -- everything goes through these two.
 */
function at(a: readonly number[], i: number): number {
  return a[i < 0 ? a.length + i : i];
}

function setAt(a: number[], i: number, value: number): void {
  a[i < 0 ? a.length + i : i] = value;
}

/**
 * The coefficients `f_k(z)` of the recurrence
 * `f_{k+2}(z) = (2 + z) f_{k+1}(z) - f_k(z)`, with `f_0 = 1` and `f_1 = 1 + z`.
 *
 * The result is a length-`n` buffer holding the forward half `f_k` at index `k`
 * for `k` in `[0, K)` and the backward half `f_{-k}` at index `-k` (Python
 * indexing) for `k` in `[1, K + 1]`, where `K = floor(n / 2)`. The backward
 * pass legitimately rewrites index 1 for small `n`; the sequence is symmetric,
 * so it recomputes the value already there.
 */
function fkz(n: number, z: number): number[] {
  const K = Math.floor(n / 2);
  const ret = new Array<number>(n).fill(0);

  ret[0] = 1;
  ret[1] = 1 + z;

  for (let k = 2; k < K; k++) {
    ret[k] = (2 + z) * ret[k - 1] - ret[k - 2];
  }

  for (let k = 1; k <= K + 1; k++) {
    setAt(ret, -k, (2 + z) * at(ret, -k + 1) - at(ret, -k + 2));
  }

  return ret;
}

/**
 * The diagonal part `D(z)` of the state in the Dicke basis: entry `k` is
 * `binom(n, k) f_{K - k}(z)`, where `K - k` runs negative for `k > K` and is
 * resolved by the backward half of {@link fkz}.
 */
function dz(n: number, z: number): number[][] {
  const fkzArray = fkz(n, z);
  const K = Math.floor(n / 2);

  const ret = Array.from({ length: n + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let k = 0; k <= n; k++) {
    ret[k][k] = (combinations(n, k) as number) * at(fkzArray, K - k);
  }
  return ret;
}

/** The off-diagonal part: `sigma` in the two corners `(0, n)` and `(n, 0)`. */
function oSigma(n: number, sigma: QuasiDsSign): number[][] {
  const ret = Array.from({ length: n + 1 }, () => new Array<number>(n + 1).fill(0));
  ret[0][n] = sigma;
  ret[n][0] = sigma;
  return ret;
}

function validate({ n, z, sigma }: QuasiDsOptions): void {
  if (!Number.isInteger(n) || n < 1 || n % 2 !== 1) {
    fail(`the quasi-Dicke state needs a positive odd number of qubits, got ${n}`);
  }
  if (n < 3) {
    fail(`the quasi-Dicke state needs at least 3 qubits, got ${n}`);
  }
  if (sigma !== 1 && sigma !== -1) {
    fail(`sigma must be +1 or -1, got ${sigma as number}`);
  }
  if (!Number.isFinite(z)) {
    fail(`z must be a finite real number, got ${z}`);
  }
}

/**
 * The quasi-Dicke state written in the Dicke basis `{|D_k^n>}_{k=0..n}`.
 *
 * `(D(z) + O(sigma)) / (2 (4 + z)^K)` with `K = floor(n / 2)`: a diagonal
 * matrix plus the two `sigma` corners, normalized to unit trace.
 *
 * @param options - see {@link QuasiDsOptions}.
 * @returns the (n + 1) x (n + 1) density matrix in the Dicke basis.
 */
export function quasiDsDickeBasis(options: QuasiDsOptions): Matrix {
  validate(options);
  const { n, z, sigma } = options;
  const K = Math.floor(n / 2);

  const diagonal = dz(n, z);
  const corners = oSigma(n, sigma);
  const scale = 2 * (4 + z) ** K;

  const rho = diagonal.map((row, i) => row.map((value, j) => (value + corners[i][j]) / scale));
  return matrix(rho);
}

/**
 * The isometry `V` mapping the Dicke basis into the computational basis,
 *
 * ```text
 * V = sum_{i_1 ... i_n} binom(n, nu)^{-1/2} |i_1 ... i_n> <nu|
 * ```
 *
 * with `nu = nu(i_1 ... i_n)` the Hamming weight of the bit string. Qubit `k`
 * contributes `2^k` to the row index, i.e. the bit ordering is little-endian.
 *
 * @param n - number of qubits.
 * @returns the 2^n x (n + 1) isometry.
 */
export function dickeIso(n: number): Matrix {
  if (!Number.isInteger(n) || n < 1) {
    fail(`the Dicke isometry needs a positive number of qubits, got ${n}`);
  }
  const rows = 2 ** n;
  const weights = Array.from({ length: n + 1 }, (_, w) => 1 / Math.sqrt(combinations(n, w) as number));

  const v = Array.from({ length: rows }, () => new Array<number>(n + 1).fill(0));
  for (let r = 0; r < rows; r++) {
    let weight = 0;
    for (let bit = 0; bit < n; bit++) {
      if ((r >> bit) & 1) weight++;
    }
    v[r][weight] = weights[weight];
  }
  return matrix(v);
}

/**
 * The quasi-Dicke bound entangled state on `n` qubits.
 *
 * Built in the computational basis by conjugating the Dicke-basis density
 * matrix with the isometry `V` of {@link dickeIso}: `rho = V D V^T`. The state
 * is PPT across every bipartition and bound entangled for all valid parameters.
 *
 * @param options - see {@link QuasiDsOptions}.
 * @returns the 2^n x 2^n density matrix of the quasi-Dicke state.
 */
export function quasiDs(options: QuasiDsOptions): Matrix {
  validate(options);
  const v = dickeIso(options.n);
  return multiply(multiply(v, quasiDsDickeBasis(options)), transpose(v)) as Matrix;
}
