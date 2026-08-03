import { describe, expect, it } from 'vitest';
import type { Matrix } from 'mathjs';
import { permuteSystems } from '../../src/index.js';
import { badziagPrivateSinglet, orthogonalSinglet } from '../../src/cdOtimesCd/index.js';
import { expectBoundEntangled, expectDensityMatrix } from '../qi.js';
import { nested } from '../helpers.js';

/**
 * Reorder ABA'B' → AA'BB' so the PPT check sees the physical Alice|Bob cut.
 *
 * Both singlets are built in ABA'B' ordering (two-qubit pair A, B of dimension
 * 2 each; shield pair A', B' of dimension `shieldDim` each), while the
 * bipartition of interest is Alice = (A, A') against Bob = (B, B').
 */
function toAliceBob(rho: Matrix, shieldDim: number): Matrix {
  const d = shieldDim;
  return permuteSystems(rho, [0, 2, 1, 3], [2, 2, d, d]);
}

describe('badziagPrivateSinglet', () => {
  it.each([2, 3])('has shape 4d² x 4d² for d = %i', (d) => {
    const rows = nested(badziagPrivateSinglet({ shieldDim: d }));
    expect(rows.length).toBe(4 * d * d);
    expect(rows[0].length).toBe(4 * d * d);
  });

  it.each([2, 3])('is a valid density matrix for d = %i', (d) => {
    expectDensityMatrix(badziagPrivateSinglet({ shieldDim: d }), [2 * d, 2 * d]);
  });

  it.each([2, 3])('is bound entangled across the Alice|Bob cut for d = %i', (d) => {
    const rho = toAliceBob(badziagPrivateSinglet({ shieldDim: d }), d);
    expectBoundEntangled(rho, [2 * d, 2 * d]);
  });

  it('rejects a shield dimension below 2', () => {
    expect(() => badziagPrivateSinglet({ shieldDim: 1 })).toThrow(/integer >= 2/);
  });
});

describe('orthogonalSinglet', () => {
  it.each([2, 3, 4])('has shape 4d² x 4d² for d = %i', (d) => {
    const rows = nested(orthogonalSinglet({ shieldDim: d }));
    expect(rows.length).toBe(4 * d * d);
    expect(rows[0].length).toBe(4 * d * d);
  });

  it.each([2, 3])('is a valid density matrix for d = %i', (d) => {
    expectDensityMatrix(orthogonalSinglet({ shieldDim: d }), [2 * d, 2 * d]);
  });

  it.each([2, 3])('is bound entangled across the Alice|Bob cut for d = %i', (d) => {
    const rho = toAliceBob(orthogonalSinglet({ shieldDim: d }), d);
    expectBoundEntangled(rho, [2 * d, 2 * d]);
  });

  it('rejects shield dimensions that are neither 3 nor a power of two', () => {
    expect(() => orthogonalSinglet({ shieldDim: 5 })).toThrow(/3 or a power of two/);
    expect(() => orthogonalSinglet({ shieldDim: 6 })).toThrow(/3 or a power of two/);
    expect(() => orthogonalSinglet({ shieldDim: 1 })).toThrow(/integer >= 2/);
  });
});
