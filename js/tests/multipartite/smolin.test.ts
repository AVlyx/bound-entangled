import { describe, expect, it } from 'vitest';
import { generalizedSmolin, smolin } from '../../src/multipartite/index.js';
import { expectBoundEntangled } from '../qi.js';
import { expectMatrixClose, nested } from '../helpers.js';

describe('smolin', () => {
  it('is a 16x16 bound entangled state on C⁴ ⊗ C⁴', () => {
    const rho = smolin();
    expect(nested(rho).length).toBe(16);
    expectBoundEntangled(rho, [4, 4]);
  });

  it('is the four-qubit member of the generalized Smolin family', () => {
    expectMatrixClose(smolin(), generalizedSmolin({ systems: 4 }));
  });
});
