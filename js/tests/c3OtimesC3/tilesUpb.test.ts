import { describe, expect, it } from 'vitest';
import { tilesBasis, tilesUpb } from '../../src/c3OtimesC3/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectOrthonormal, flat, nested } from '../helpers.js';

describe('tilesBasis', () => {
  it('has five orthonormal product vectors in C9', () => {
    const basis = tilesBasis();
    expect(basis.length).toBe(5);
    expectOrthonormal(basis, 9);
  });
});

describe('tilesUpb', () => {
  it('is a 9x9 bound entangled state', () => {
    const rho = tilesUpb();
    expect(nested(rho).length).toBe(9);
    expectBoundEntangled(rho, [3, 3]);
  });

  it('annihilates every vector of the basis', () => {
    // The state projects onto the orthogonal complement of the UPB.
    const rho = nested(tilesUpb());
    for (const v of tilesBasis()) {
      const entries = flat(v) as number[];
      for (let i = 0; i < 9; i++) {
        let component = 0;
        for (let j = 0; j < 9; j++) {
          component += (rho[i][j] as number) * entries[j];
        }
        expect(Math.abs(component), `row ${i}`).toBeLessThan(1e-10);
      }
    }
  });
});
