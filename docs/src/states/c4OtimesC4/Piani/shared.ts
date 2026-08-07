/** Shared between the Definition and Example sections. */

/** A Pauli index: 0 = I, 1 = X, 2 = Y, 3 = Z. */
export type PauliDigit = 0 | 1 | 2 | 3;

/** The four Pauli operators, indexed 0 = I, 1 = X, 2 = Y, 3 = Z. */
export const PAULI_NAMES = ["I", "X", "Y", "Z"] as const;
