import { describe, expect, it } from 'vitest';
import { isPPT, upb } from '../../src/index.js';
import { isotropicTwoQubit, tilesBasis, zeros } from '../helpers.js';

/** The maximally mixed state on `dimension` levels. */
function maximallyMixed(dimension: number): number[][] {
  const rho = zeros(dimension);
  for (let i = 0; i < dimension; i++) {
    rho[i][i] = 1 / dimension;
  }
  return rho;
}

describe('isPPT', () => {
  it('accepts separable states', () => {
    expect(isPPT(maximallyMixed(4), [2, 2])).toBe(true);
    // |0><0| ⊗ |+><+|
    const product = zeros(4);
    product[0][0] = 0.5;
    product[0][1] = 0.5;
    product[1][0] = 0.5;
    product[1][1] = 0.5;
    expect(isPPT(product, [2, 2])).toBe(true);
  });

  it('rejects the Bell state', () => {
    const bell = zeros(4);
    for (const [i, j] of [
      [0, 0],
      [0, 3],
      [3, 0],
      [3, 3],
    ] as const) {
      bell[i][j] = 0.5;
    }
    expect(isPPT(bell, [2, 2])).toBe(false);
  });

  it('finds the p = 1/3 threshold of the two-qubit isotropic family', () => {
    expect(isPPT(isotropicTwoQubit(0.3), [2, 2])).toBe(true);
    expect(isPPT(isotropicTwoQubit(0.4), [2, 2])).toBe(false);
  });

  it('does not depend on which subsystem is transposed', () => {
    const rho = isotropicTwoQubit(0.4);
    expect(isPPT(rho, [2, 2], 0)).toBe(isPPT(rho, [2, 2], 1));
  });

  it('accepts the bound entangled Tiles state on C3 (x) C3', () => {
    expect(isPPT(upb(tilesBasis()), [3, 3])).toBe(true);
  });

  it('works across a multipartite splitting', () => {
    // Four qubits, PPT across the {0,1} vs {2,3} cut of a fully mixed state.
    expect(isPPT(maximallyMixed(16), [2, 2, 2, 2], [2, 3])).toBe(true);
  });
});
