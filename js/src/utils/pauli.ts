import { complex, matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import type { Scalar } from '../types.js';
import { fail } from './internal.js';
import { tensor } from './tensor.js';

/**
 * Which Pauli operator to build, either by name or by the conventional index
 * `0 = I, 1 = X, 2 = Y, 3 = Z`.
 */
export type PauliIndex = 0 | 1 | 2 | 3 | 'I' | 'X' | 'Y' | 'Z' | 'i' | 'x' | 'y' | 'z';

const PAULI: Record<'I' | 'X' | 'Y' | 'Z', Scalar[][]> = {
  I: [
    [1, 0],
    [0, 1],
  ],
  X: [
    [0, 1],
    [1, 0],
  ],
  Y: [
    [0, complex(0, -1)],
    [complex(0, 1), 0],
  ],
  Z: [
    [1, 0],
    [0, -1],
  ],
};

const BY_INDEX = ['I', 'X', 'Y', 'Z'] as const;

/** A fresh copy, so a caller mutating the result cannot corrupt the table. */
function single(index: PauliIndex): Scalar[][] {
  if (typeof index === 'number') {
    if (!Number.isInteger(index) || index < 0 || index > 3) {
      fail(`Pauli index must be 0 (I), 1 (X), 2 (Y) or 3 (Z), got ${index}`);
    }
    return PAULI[BY_INDEX[index]].map((row) => [...row]);
  }
  const name = index.toUpperCase();
  if (name !== 'I' && name !== 'X' && name !== 'Y' && name !== 'Z') {
    fail(`Pauli name must be I, X, Y or Z, got "${index}"`);
  }
  return PAULI[name].map((row) => [...row]);
}

/**
 * A Pauli operator, or a tensor product of them.
 *
 * `pauli('X')` and `pauli(1)` both give the 2x2 matrix X; a list gives the
 * Kronecker product of the named operators, so `pauli(['X', 'X', 'X'])` is
 * X ⊗ X ⊗ X on three qubits.
 *
 * @param index - the operator to build, or one index per qubit.
 * @returns the 2^n x 2^n Pauli operator.
 */
export function pauli(index: PauliIndex | readonly PauliIndex[]): Matrix {
  if (!Array.isArray(index)) {
    return matrix(single(index as PauliIndex));
  }
  const indices = index as readonly PauliIndex[];
  if (indices.length === 0) {
    fail('pauli requires at least one index');
  }
  return tensor(...indices.map(single));
}
