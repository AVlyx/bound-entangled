import { add, multiply, subtract } from 'mathjs';
import type { Matrix } from 'mathjs';
import { fail } from './internal.js';
import { ket } from './ket.js';
import { tensor } from './tensor.js';

/**
 * One of the five "Tile" states on C³ ⊗ C³, which together form an
 * unextendible product basis.
 *
 * ```
 * |psi_0> = |0>(|0> - |1>)/sqrt(2)      |psi_1> = (|0> - |1>)|2>/sqrt(2)
 * |psi_2> = |2>(|1> - |2>)/sqrt(2)      |psi_3> = (|1> - |2>)|0>/sqrt(2)
 * |psi_4> = (|0> + |1> + |2>)(|0> + |1> + |2>)/3
 * ```
 *
 * Reference: C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A.
 * Smolin, B. M. Terhal, "Unextendible Product Bases and Bound Entanglement",
 * Phys. Rev. Lett. 82, 5385 (1999), https://arxiv.org/abs/quant-ph/9808030
 *
 * @param index - which tile state to build, 0 through 4.
 * @returns the tile state, as a flat 9-vector.
 */
export function tile(index: number): Matrix {
  const e0 = ket(3, 0);
  const e1 = ket(3, 1);
  const e2 = ket(3, 2);
  const half = 1 / Math.SQRT2;

  switch (index) {
    case 0:
      return multiply(half, tensor(e0, subtract(e0, e1))) as Matrix;
    case 1:
      return multiply(half, tensor(subtract(e0, e1), e2)) as Matrix;
    case 2:
      return multiply(half, tensor(e2, subtract(e1, e2))) as Matrix;
    case 3:
      return multiply(half, tensor(subtract(e1, e2), e0)) as Matrix;
    case 4: {
      const uniform = add(add(e0, e1), e2);
      return multiply(1 / 3, tensor(uniform, uniform)) as Matrix;
    }
    default:
      return fail(`tile index must be 0, 1, 2, 3 or 4, got ${index}`);
  }
}
