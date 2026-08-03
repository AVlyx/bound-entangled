/**
 * https://arxiv.org/abs/2402.12966
 *
 * R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum
 * bound entangled states". Generalizes quantum grid states (see
 * {@link gridState}) to hyperedges spanning more than two vertices.
 */

import { matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import { ketbra, normalizeTrace } from '../utils/index.js';
import { fail, flatIndex, sumMatrices, totalDimension } from '../utils/internal.js';
import type { Vertex } from './gridState.js';

/** A hyperedge of the grid, spanning one or more vertices. */
export type Hyperedge = readonly Vertex[];

export interface GeneralizedGridStateOptions {
  /** The grid dimensions `[m, n]`, giving a state on C^m ⊗ C^n. */
  dims: readonly [number, number];
  /** The hyperedges of the graph the state is built from. */
  hyperedges: readonly Hyperedge[];
}

/**
 * The (unnormalized) sum of basis states over the vertices a hyperedge spans.
 *
 * Unlike an ordinary edge this carries no relative minus sign, and a vertex
 * listed twice contributes twice.
 *
 * @param dims - the grid dimensions `[m, n]`.
 * @param vertices - the vertices the hyperedge spans.
 * @returns the hyperedge's (unnormalized) vector.
 */
export function generalizedGridComponent(
  dims: readonly [number, number],
  vertices: Hyperedge,
): Matrix {
  if (vertices.length === 0) {
    fail('a hyperedge must span at least one vertex');
  }
  const data = new Array<number>(totalDimension(dims)).fill(0);
  for (const vertex of vertices) {
    data[flatIndex(dims, vertex)] += 1;
  }
  return matrix(data);
}

/**
 * A generalized grid state: the trace-normalized mixture of the pure states
 * carried by a set of hyperedges.
 *
 * @param options - see {@link GeneralizedGridStateOptions}.
 * @returns the generalized grid state on C^m ⊗ C^n.
 */
export function generalizedGridState({ dims, hyperedges }: GeneralizedGridStateOptions): Matrix {
  if (hyperedges.length === 0) {
    fail('a generalized grid state needs at least one hyperedge');
  }
  const terms = hyperedges.map((edge) => ketbra(generalizedGridComponent(dims, edge)));
  return normalizeTrace(sumMatrices(terms));
}
