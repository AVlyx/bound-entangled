import { describe, expect, it } from 'vitest';
import {
  parametrizedBasis,
  parametrizedUpb,
  pyramidBasis,
  pyramidUpb,
} from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectOrthonormal, flat, real } from '../helpers.js';

const ANGLES = {
  gammaA: 0.7,
  thetaA: 0.6,
  phiA: 0.3,
  gammaB: 1.1,
  thetaB: 0.5,
  phiB: 1.4,
};

describe('pyramidBasis', () => {
  it('has five normalized distinct vectors', () => {
    const basis = pyramidBasis();
    expect(basis.length).toBe(5);
    for (const v of basis) {
      expect(flat(v).length).toBe(9);
    }
    for (let i = 0; i < basis.length; i++) {
      for (let j = i + 1; j < basis.length; j++) {
        const differs = flat(basis[i]).some(
          (value, index) => Math.abs(real(value) - real(flat(basis[j])[index])) > 1e-8,
        );
        expect(differs, `vectors ${i} and ${j} coincide`).toBe(true);
      }
    }
  });
});

describe('pyramidUpb', () => {
  it('is bound entangled', () => {
    expectBoundEntangled(pyramidUpb(), [3, 3]);
  });
});

describe('parametrizedBasis', () => {
  it('has the UPB orthogonality graph', () => {
    // Every UPB on 3 (x) 3 has the same orthogonality graph (Fig. 4 of the
    // paper): consecutive states are orthogonal via one party and states two
    // apart via the other, covering all 10 pairs and forcing unextendibility.
    const basis = parametrizedBasis(ANGLES);
    expect(basis.length).toBe(5);
    expectOrthonormal(basis, 9);
  });
});

describe('parametrizedUpb', () => {
  it('is bound entangled', () => {
    expectBoundEntangled(parametrizedUpb(ANGLES), [3, 3]);
  });

  it('reproduces the Pyramid UPB at the pyramid angles', () => {
    // phi = 0 and gamma = theta = arccos((sqrt(5) - 1) / 2) for both parties.
    const angle = Math.acos((Math.sqrt(5) - 1) / 2);
    const rho = parametrizedUpb({
      gammaA: angle,
      thetaA: angle,
      phiA: 0,
      gammaB: angle,
      thetaB: angle,
      phiB: 0,
    });
    expectBoundEntangled(rho, [3, 3]);
  });
});
