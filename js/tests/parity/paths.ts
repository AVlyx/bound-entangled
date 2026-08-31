/**
 * Where the two halves of the parity run meet.
 *
 * `globalSetup.ts` writes the spec here and has `reference.py` write the
 * reference matrices back; `parity.test.ts` reads them. The location is fixed
 * rather than randomized so the test files can find it without vitest having to
 * thread a value through to the workers -- which does mean two parity runs on
 * one machine at the same time would tread on each other.
 */

import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** The scratch directory, recreated from scratch on every run. */
export const PARITY_DIR = join(tmpdir(), 'bound-entangled-parity');

/** What TypeScript asks Python to compute. */
export const SPEC_PATH = join(PARITY_DIR, 'spec.json');

/** What Python computed. */
export const REFERENCE_PATH = join(PARITY_DIR, 'reference.json');
