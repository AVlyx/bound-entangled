import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // Builds the Python reference the parity suite compares against, once, before
    // any test file runs. See tests/parity/globalSetup.ts.
    globalSetup: ['./tests/parity/globalSetup.ts'],
  },
});
