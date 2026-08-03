import type { Complex, Matrix } from 'mathjs';

/** A real or complex number, in either of the forms mathjs accepts. */
export type Scalar = number | Complex;

/**
 * A ket or bra. Accepted as a flat array `[a, b, c]`, a column `[[a], [b], [c]]`,
 * a row `[[a, b, c]]`, or a mathjs `Matrix` holding any of those.
 */
export type VectorLike = Scalar[] | Scalar[][] | Matrix;

/** A 2-D matrix, as a nested array or a mathjs `Matrix`. */
export type MatrixLike = Scalar[][] | Matrix;

/**
 * The subsystem dimensions of a composite Hilbert space, e.g. `[3, 3]` for
 * C³ ⊗ C³ and `[2, 2, 2, 2]` for four qubits. Their product is the dimension
 * of the full space.
 */
export type Dims = readonly number[];
