/**
 * Every construction in the TypeScript package, checked against the Python one.
 *
 * These tests assert nothing about the states themselves -- not that they are
 * density matrices, not that they are PPT, not that they are entangled. The
 * Python package's own doctests already establish all of that. The only claim
 * here is that the port reproduces it: same construction, same numbers.
 *
 * The reference matrices come from `globalSetup.ts`, which runs `reference.py`
 * against the Python sources in `../../../python/src` before any test starts.
 * The cases themselves live in `cases.ts`.
 */

import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parityCases } from './cases.js';
import { expectMatchesReference } from './compare.js';
import type { Reference } from './compare.js';
import { REFERENCE_PATH } from './paths.js';

const reference = JSON.parse(readFileSync(REFERENCE_PATH, 'utf8')) as Record<string, Reference>;

const groups = [...new Set(parityCases.map((parityCase) => parityCase.group))];

describe('the Python reference', () => {
  it('covers every case', () => {
    const missing = parityCases
      .map((parityCase) => parityCase.id)
      .filter((id) => !(id in reference));
    expect(missing, 'cases the Python run did not produce').toEqual([]);
  });
});

for (const group of groups) {
  describe(`${group} matches Python`, () => {
    for (const parityCase of parityCases.filter((entry) => entry.group === group)) {
      it(parityCase.id, () => {
        expectMatchesReference(parityCase.ts(), reference[parityCase.id], parityCase.id);
      });
    }
  });
}
