import { describe, expect, it } from 'vitest';
import { ketbra, maxEntangled, upb } from '../src/index.js';
import { expectBoundEntangled, expectDensityMatrix, expectPPT } from './qi.js';
import { isotropicTwoQubit, tilesBasis, zeros } from './helpers.js';

describe('qi assertions', () => {
  it('accepts a valid density matrix', () => {
    expectDensityMatrix(ketbra(maxEntangled(2)), [2, 2]);
    expectDensityMatrix(isotropicTwoQubit(0.4), [2, 2]);
  });

  it('rejects a matrix that is not normalized', () => {
    const unnormalized = zeros(2);
    unnormalized[0][0] = 2;
    expect(() => expectDensityMatrix(unnormalized)).toThrow();
  });

  it('rejects a matrix with a negative eigenvalue', () => {
    expect(() =>
      expectDensityMatrix([
        [2, 0],
        [0, -1],
      ]),
    ).toThrow();
  });

  it('rejects dimensions that do not match the state', () => {
    expect(() => expectDensityMatrix(ketbra(maxEntangled(2)), [3, 3])).toThrow();
  });

  it('rejects an entangled state as PPT', () => {
    // The Bell state is a valid density matrix, but NPT.
    expect(() => expectPPT(ketbra(maxEntangled(2)), [2, 2])).toThrow();
  });

  it('accepts the bound entangled Tiles state', () => {
    expectBoundEntangled(upb(tilesBasis()), [3, 3]);
  });
});
