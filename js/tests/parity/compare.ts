/**
 * Comparing a mathjs matrix against the numpy array `reference.py` produced.
 *
 * Both sides are flattened to real and imaginary parts in row-major (numpy "C")
 * order, which makes the comparison independent of how either library chose to
 * nest its data.
 */

import { expect } from 'vitest';
import { isComplex } from 'mathjs';
import type { Matrix } from 'mathjs';

/** A single array, as `reference.py` encodes it. */
export interface ArrayReference {
  kind: 'array';
  shape: number[];
  real: number[];
  imag: number[];
}

/** A list of arrays -- what the UPB basis constructions return. */
export interface ListReference {
  kind: 'list';
  items: ArrayReference[];
}

export type Reference = ArrayReference | ListReference;

/** One value, flattened. */
export interface FlatArray {
  shape: number[];
  real: number[];
  imag: number[];
}

function collect(node: unknown, real: number[], imag: number[]): void {
  if (Array.isArray(node)) {
    for (const child of node) {
      collect(child, real, imag);
    }
    return;
  }
  if (isComplex(node)) {
    real.push(node.re);
    imag.push(node.im);
    return;
  }
  real.push(node as number);
  imag.push(0);
}

/** Flatten a mathjs matrix into parallel real and imaginary parts. */
export function flatten(value: Matrix): FlatArray {
  const real: number[] = [];
  const imag: number[] = [];
  collect(value.toArray(), real, imag);
  return { shape: value.size(), real, imag };
}

/**
 * The shape with its length-1 axes dropped.
 *
 * Python returns its vectors as columns of shape `(d, 1)` while mathjs holds
 * them flat as `(d)`. That is a difference in representation, not in the state,
 * so the comparison looks past it -- but `(8, 8)` against `(4, 16)` still has to
 * fail, which is why the shapes are compared at all rather than just the
 * entries.
 */
function squeeze(shape: readonly number[]): number[] {
  return shape.filter((axis) => axis !== 1);
}

/** `(i, j)` for a flat index, given the shape it belongs to. */
function subscript(index: number, shape: readonly number[]): string {
  const axes = squeeze(shape);
  if (axes.length === 0) {
    return '()';
  }
  const coordinates: number[] = [];
  let remaining = index;
  for (let axis = axes.length - 1; axis >= 0; axis--) {
    coordinates.unshift(remaining % axes[axis]);
    remaining = Math.floor(remaining / axes[axis]);
  }
  return `(${coordinates.join(', ')})`;
}

function show(real: number, imag: number): string {
  return imag === 0 ? String(real) : `${real}${imag < 0 ? '-' : '+'}${Math.abs(imag)}i`;
}

/**
 * Assert that a TypeScript result matches its Python reference entrywise.
 *
 * Deliberately a single assertion on the worst entry rather than one per entry:
 * the largest case here has 16k entries, and 16k `expect` calls would cost
 * seconds. The message names the offending entry.
 */
export function expectFlatClose(
  actual: FlatArray,
  expected: FlatArray,
  label: string,
  tolerance = 1e-10,
): void {
  expect(
    squeeze(actual.shape),
    `${label}: shape [${actual.shape.join(', ')}] does not match Python's [${expected.shape.join(', ')}]`,
  ).toEqual(squeeze(expected.shape));

  let worst = -1;
  let where = 0;
  for (let i = 0; i < expected.real.length; i++) {
    const deviation = Math.max(
      Math.abs(actual.real[i] - expected.real[i]),
      Math.abs(actual.imag[i] - expected.imag[i]),
    );
    if (deviation > worst) {
      worst = deviation;
      where = i;
    }
  }

  const detail =
    worst <= tolerance
      ? ''
      : ` at ${subscript(where, expected.shape)}: ` +
        `${show(actual.real[where], actual.imag[where])} vs Python's ` +
        `${show(expected.real[where], expected.imag[where])}`;
  expect(worst, `${label}: differs from the Python construction${detail}`).toBeLessThanOrEqual(
    tolerance,
  );
}

/** Compare a TypeScript result against its reference, whichever shape it takes. */
export function expectMatchesReference(
  actual: Matrix | Matrix[],
  reference: Reference,
  label: string,
): void {
  if (Array.isArray(actual)) {
    expect(reference.kind, `${label}: TypeScript returned a list, Python did not`).toBe('list');
    const { items } = reference as ListReference;
    expect(actual.length, `${label}: list length differs`).toBe(items.length);
    actual.forEach((entry, i) => {
      expectFlatClose(flatten(entry), items[i], `${label}[${i}]`);
    });
    return;
  }

  expect(reference.kind, `${label}: Python returned a list, TypeScript did not`).toBe('array');
  expectFlatClose(flatten(actual), reference as ArrayReference, label);
}
