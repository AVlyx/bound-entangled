import { describe, expect, it } from 'vitest';
import { add, divide, identity, subtract } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ketbra, pauli, tensor } from '../../src/index.js';
import { generalizedSmolin } from '../../src/multipartite/index.js';
import { expectDensityMatrix, expectHermitian, expectPPT, expectTraceOne } from '../qi.js';
import { expectMatrixClose, nested } from '../helpers.js';

/** The sum of a non-empty list of matrices. */
function total(terms: readonly Matrix[]): Matrix {
  return terms.reduce((sum, term) => add(sum, term));
}

describe('generalizedSmolin', () => {
  it.each([4, 6])('is a valid density matrix on %i qubits', (systems) => {
    const rho = generalizedSmolin({ systems });
    const dimension = 2 ** systems;
    expect(nested(rho).length).toBe(dimension);
    expectDensityMatrix(rho);
  });

  it('still has the right shape, trace and symmetry on 8 qubits', () => {
    // The Python suite runs the full density-matrix check at 8 qubits too, but
    // that is a 256x256 positivity test and isPSD goes through mathjs' Jacobi
    // eigensolver, which is far slower than LAPACK. Assert everything except
    // positivity here, and leave the eigenvalues to the 4- and 6-qubit cases.
    const rho = generalizedSmolin({ systems: 8 });
    expect(nested(rho).length).toBe(256);
    expectHermitian(rho);
    expectTraceOne(rho);
  });

  it.each([4, 6])('is Hermitian on %i qubits', (systems) => {
    expectHermitian(generalizedSmolin({ systems }));
  });

  it('is PPT across the 2|4 cut on 6 qubits', () => {
    // The 6-qubit GSS state is PPT across the 2-qubit | 4-qubit cut (dim [4, 16])
    // but not across the equal 3|3 split -- it is a genuinely multipartite state.
    expectPPT(generalizedSmolin({ systems: 6 }), [4, 16]);
  });

  it('is (I + XXXX + YYYY + ZZZZ) / 16 on 4 qubits', () => {
    // n = 2, so (-1)^n = +1.
    const expected = divide(
      total([identity(16) as Matrix, pauli([1, 1, 1, 1]), pauli([2, 2, 2, 2]), pauli([3, 3, 3, 3])]),
      16,
    ) as Matrix;
    expectMatrixClose(generalizedSmolin({ systems: 4 }), expected);
  });

  it('carries the (-1)^n sign on 6 qubits', () => {
    // n = 3, so the Pauli words enter with a minus sign.
    const words: Matrix[] = [
      pauli([1, 1, 1, 1, 1, 1]),
      pauli([2, 2, 2, 2, 2, 2]),
      pauli([3, 3, 3, 3, 3, 3]),
    ];
    const expected = divide(subtract(identity(64) as Matrix, total(words)), 64) as Matrix;
    expectMatrixClose(generalizedSmolin({ systems: 6 }), expected);
  });

  it('reduces to the singlet projector on 2 qubits', () => {
    // n = 1, so the sign is -1 and rho = (I - XX - YY - ZZ)/4 = |psi-><psi-|.
    const singlet = [0, 1 / Math.SQRT2, -1 / Math.SQRT2, 0];
    expectMatrixClose(generalizedSmolin({ systems: 2 }), ketbra(singlet));
  });

  it('equals the equal mixture of Bell pairs tensored with themselves', () => {
    // rho = (1/4) sum_i |phi_i><phi_i| ⊗ |phi_i><phi_i| on (A⊗B) ⊗ (C⊗D).
    const s = 1 / Math.SQRT2;
    const bell = [
      [s, 0, 0, s],
      [s, 0, 0, -s],
      [0, s, s, 0],
      [0, s, -s, 0],
    ];
    const mixture = divide(
      total(bell.map((phi) => tensor(ketbra(phi), ketbra(phi)))),
      4,
    ) as Matrix;
    expectMatrixClose(generalizedSmolin({ systems: 4 }), mixture);
  });

  it('rejects an odd or non-positive number of qubits', () => {
    expect(() => generalizedSmolin({ systems: 5 })).toThrow(/even number of qubits/);
    expect(() => generalizedSmolin({ systems: 0 })).toThrow(/even number of qubits/);
    expect(() => generalizedSmolin({ systems: 2.5 })).toThrow(/even number of qubits/);
  });
});
