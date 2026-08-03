/**
 * https://arxiv.org/abs/1705.09261
 *
 * J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid
 * states", Phys. Rev. A 97, 062340 (2018).
 */

import { divide, subtract } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ket, ketbra } from '../utils/index.js';
import { fail, sumMatrices } from '../utils/internal.js';

/** A vertex `[i, j]` of the m x n grid, i.e. the product basis state |ij>. */
export type Vertex = readonly [number, number];

/** An edge of the grid, joining two vertices. */
export type Edge = readonly [Vertex, Vertex];

export interface GridStateOptions {
  /** The grid dimensions `[m, n]`, giving a state on C^m ⊗ C^n. */
  dims: readonly [number, number];
  /** The edges of the graph the state is built from. */
  edges: readonly Edge[];
}

/**
 * The normalized difference (|ij> - |kl>) / √2 carried by one edge.
 *
 * @param dims - the grid dimensions `[m, n]`.
 * @param from - one endpoint of the edge.
 * @param to - the other endpoint.
 * @returns the edge's pure state.
 */
export function gridComponent(dims: readonly [number, number], from: Vertex, to: Vertex): Matrix {
  return divide(subtract(ket(dims, from), ket(dims, to)), Math.SQRT2) as Matrix;
}

/**
 * A quantum grid state: the uniform mixture of the pure states carried by a
 * set of graph edges.
 *
 * @param options - see {@link GridStateOptions}.
 * @returns the grid state on C^m ⊗ C^n.
 */
export function gridState({ dims, edges }: GridStateOptions): Matrix {
  if (edges.length === 0) {
    fail('a grid state needs at least one edge');
  }
  const terms = edges.map(([from, to]) => ketbra(gridComponent(dims, from, to)));
  return divide(sumMatrices(terms), edges.length) as Matrix;
}
