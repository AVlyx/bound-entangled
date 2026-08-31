/**
 * Runs the Python side of the parity suite once, before any test file.
 *
 * Turns `cases.ts` into a JSON spec, hands it to `reference.py`, and leaves the
 * resulting reference matrices in a temp file for `parity.test.ts` to read.
 *
 * The interpreter is the repository's `.venv` if there is one, otherwise
 * whatever `python3`/`python` is on PATH. Set `BOUND_ENTANGLED_PYTHON` to point
 * at a different one.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parityCases } from './cases.js';
import { PARITY_DIR, REFERENCE_PATH, SPEC_PATH } from './paths.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..', '..', '..');
const pythonSrc = join(repoRoot, 'python', 'src');
const script = join(here, 'reference.py');

/** The Python interpreter to run `reference.py` with. */
function interpreter(): string {
  const configured = process.env.BOUND_ENTANGLED_PYTHON;
  if (configured) {
    return configured;
  }
  const candidates = [
    join(repoRoot, '.venv', 'Scripts', 'python.exe'),
    join(repoRoot, '.venv', 'bin', 'python'),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return process.platform === 'win32' ? 'python' : 'python3';
}

/**
 * Guard against a copy-pasted case silently shadowing the one it was copied
 * from: ids key the reference file, so a duplicate would drop a case.
 */
function assertUniqueIds(): void {
  const seen = new Set<string>();
  for (const { id } of parityCases) {
    if (seen.has(id)) {
      throw new Error(`duplicate parity case id: ${id}`);
    }
    seen.add(id);
  }
}

export default function setup(): void {
  assertUniqueIds();

  if (!existsSync(pythonSrc)) {
    throw new Error(
      `the Python package is not where the parity suite expects it (${pythonSrc}); ` +
        'the suite has to run from a checkout that contains both ports',
    );
  }

  rmSync(PARITY_DIR, { recursive: true, force: true });
  mkdirSync(PARITY_DIR, { recursive: true });

  const spec = {
    pythonSrc,
    cases: parityCases.map(({ id, python }) => ({ id, ...python })),
  };
  writeFileSync(SPEC_PATH, JSON.stringify(spec), 'utf8');

  const python = interpreter();
  try {
    execFileSync(python, [script, SPEC_PATH, REFERENCE_PATH], { stdio: 'pipe' });
  } catch (error) {
    const { stderr } = error as { stderr?: Buffer };
    throw new Error(
      `could not build the Python reference with "${python}".\n` +
        'The parity suite needs the Python package importable, which means its ' +
        'dependencies (numpy, toqito) installed. Set BOUND_ENTANGLED_PYTHON to ' +
        'choose an interpreter.\n\n' +
        (stderr?.toString() ?? String(error)),
    );
  }

  if (!existsSync(REFERENCE_PATH)) {
    throw new Error(`${python} exited cleanly but wrote no reference to ${REFERENCE_PATH}`);
  }
}
