import { describe, expect, it } from "vitest";
import { multiply } from "mathjs";
import { piani, projectorIj } from "../../src/c4OtimesC4/index.js";
import { expectBoundEntangled, expectHermitian } from "../qi.js";
import { expectMatrixClose, nested, real } from "../helpers.js";

describe("projectorIj", () => {
  it("is a 16x16 rank-one projector", () => {
    const p = projectorIj(1, 1);
    const rows = nested(p);
    expect(rows.length).toBe(16);
    expect(rows[0].length).toBe(16);
    expectHermitian(p);

    const trace = rows.reduce((total, row, i) => total + real(row[i]), 0);
    expect(trace).toBeCloseTo(1, 10);

    expectMatrixClose(multiply(p, p), p);
  });
});

describe("piani", () => {
  it("is a 16x16 bound entangled state", () => {
    const rho = piani();
    expect(nested(rho).length).toBe(16);
    expectBoundEntangled(rho, [4, 4]);
  });

  it("has the expected diagonal", () => {
    const rows = nested(piani());
    // 1/8 on the four |01>, |10>-type qubit patterns picked out by the mixture,
    // 1/24 everywhere else; they sum to 4/8 + 12/24 = 1.
    const heavy = new Set([1, 2, 13, 14]);
    for (let i = 0; i < 16; i++) {
      expect(real(rows[i][i]), `diagonal entry ${i}`).toBeCloseTo(
        heavy.has(i) ? 1 / 8 : 1 / 24,
        10,
      );
    }
  });

  it("applies the [0, 2, 1, 3] qubit permutation", () => {
    // The unpermuted mixture is itself PPT, so expectBoundEntangled cannot catch
    // a missing permuteSystems. These four entries of row 0 pin it down: the
    // permutation swaps the coherences at columns 5 and 10 onto 3 and 12.
    const rows = nested(piani());
    expect(real(rows[0][3])).toBeCloseTo(-1 / 24, 10);
    expect(real(rows[0][12])).toBeCloseTo(-1 / 24, 10);
    expect(real(rows[0][5])).toBeCloseTo(0, 10);
    expect(real(rows[0][10])).toBeCloseTo(0, 10);
  });
});
