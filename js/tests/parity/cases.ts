/**
 * The parity cases: every construction the TypeScript port shares with the
 * Python package, paired with the Python call it has to reproduce.
 *
 * This file is the single source of truth. `globalSetup.ts` reads the `python`
 * halves, hands them to `reference.py`, and gets back the reference matrices;
 * `parity.test.ts` then evaluates the `ts` halves and compares. Adding a case
 * here is all it takes to cover a new construction.
 *
 * Not covered, because there is nothing on the TypeScript side to compare
 * against: `chessboard` / `chessboard_extremal_PPT`, and the `random_NPT` /
 * `random_PPT` / `random_PPT_close_to_the_PPT_edge` generators, which are
 * random in any case.
 */

import { complex, matrix } from 'mathjs';
import type { Matrix } from 'mathjs';
import {
  badziagPrivateSinglet,
  crossHatch,
  dickeIso,
  fourier,
  genTiles1,
  genTiles1Basis,
  genTiles2,
  genTiles2Basis,
  generalizedGridState,
  generalizedSmolin,
  gridComponent,
  gridState,
  horodecki2By4,
  horodecki2ByDGeneralized,
  horodecki3By3,
  ketbra,
  maxEntangled,
  ncomms6297,
  orthogonalSinglet,
  parametrizedBasis,
  parametrizedUpb,
  partialTranspose,
  pauli,
  permuteSystems,
  phiK,
  piani,
  projectorIj,
  psiIj,
  psiK,
  pyramidBasis,
  pyramidUpb,
  quasiDs,
  quasiDsDickeBasis,
  smolin,
  sn3GridState,
  steeringState,
  thetaDGen,
  tile,
  tilesUpb,
  upb,
  yuOh,
} from '../../src/index.js';
import type { Edge, Hyperedge, PauliIndex, QuasiDsSign, Vertex } from '../../src/index.js';
import type { Scalar } from '../../src/types.js';

/** A call into the Python package, as `reference.py` executes it. */
export interface PythonCall {
  /** Importable module path, e.g. `bound_entangled.c3_otimes_c3.horodecki`. */
  module: string;
  /** The attribute of that module to call. */
  attr: string;
  /** Positional arguments, as JSON. */
  args?: readonly unknown[];
  /** Keyword arguments, as JSON. */
  kwargs?: Readonly<Record<string, unknown>>;
}

/** One construction, evaluated on both sides and compared entrywise. */
export interface ParityCase {
  /** The `describe` block the case is reported under. */
  group: string;
  /** Unique across the whole suite; it keys the reference file. */
  id: string;
  /** The TypeScript side. A `Matrix[]` is compared against a list of vectors. */
  ts: () => Matrix | Matrix[];
  /** The Python side. */
  python: PythonCall;
}

/** Mark an argument that has to reach Python as a numpy array rather than a list. */
function ndarray(data: readonly number[] | readonly (readonly number[])[]): unknown {
  return { __ndarray__: data };
}

/** The same, for an argument with a non-zero imaginary part. */
function complexNdarray(real: readonly number[], imag: readonly number[]): unknown {
  return { __ndarray__: { real, imag } };
}

/**
 * A deterministic, deliberately asymmetric square matrix with every entry
 * distinct.
 *
 * The index-shuffling utilities are only meaningfully tested on such an input:
 * on a symmetric one a transposed or misplaced block can hide.
 */
function ramp(dimension: number): number[][] {
  return Array.from({ length: dimension }, (_, i) =>
    Array.from({ length: dimension }, (_, j) => i * dimension + j + 1),
  );
}

/** The vertices of an edge or hyperedge as plain JSON, for the Python side. */
function vertices(edge: readonly Vertex[]): number[][] {
  return edge.map(([i, j]) => [i, j]);
}

/** The `c3_otimes_c3.cross_hatch` edge set. */
const CROSS_HATCH_EDGES: readonly Edge[] = [
  [
    [0, 0],
    [1, 2],
  ],
  [
    [1, 0],
    [2, 2],
  ],
  [
    [0, 1],
    [2, 0],
  ],
  [
    [0, 2],
    [2, 1],
  ],
];

/** A path on a 2x3 grid, which is PPT but separable: a different regime. */
const PATH_EDGES: readonly Edge[] = [
  [
    [0, 0],
    [0, 1],
  ],
  [
    [0, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 0],
  ],
];

/** An edge set on a non-square grid, where the two strides differ. */
const RECTANGLE_EDGES: readonly Edge[] = [
  [
    [0, 0],
    [2, 3],
  ],
  [
    [1, 1],
    [0, 2],
  ],
  [
    [2, 0],
    [1, 3],
  ],
];

/** The `c5_otimes_c5.sn3_grid_state` hyperedges, in the paper's order. */
const SN3_HYPEREDGES: readonly Hyperedge[] = [
  [[0, 0]],
  [[1, 0]],
  [[0, 1]],
  [[4, 1]],
  [[1, 4]],
  [[3, 2]],
  [[2, 3]],
  [[3, 2]],
  [[2, 3]],
  [
    [1, 2],
    [3, 4],
  ],
  [
    [2, 1],
    [4, 3],
  ],
  [
    [2, 2],
    [3, 3],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

/** Two ordinary edges, which `generalizedGridState` adds rather than subtracts. */
const SIMPLE_HYPEREDGES: readonly Hyperedge[] = [
  [
    [0, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [2, 2],
  ],
];

/**
 * A hyperedge set with a repeated vertex, which has to contribute twice, and a
 * lone vertex, which has to contribute a bare diagonal entry.
 */
const REPEATED_HYPEREDGES: readonly Hyperedge[] = [
  [
    [0, 1],
    [0, 1],
    [2, 3],
  ],
  [[1, 0]],
  [
    [1, 2],
    [2, 0],
    [0, 3],
  ],
];

const cases: ParityCase[] = [];

function add(group: string, id: string, ts: () => Matrix | Matrix[], python: PythonCall): void {
  cases.push({ group, id, ts, python });
}

// --------------------------------------------------------------- C^2 x C^4 --

for (const a of [0, 0.25, 0.5, 0.9, 1]) {
  add('c2OtimesC4', `horodecki2By4(a=${a})`, () => horodecki2By4({ aParam: a }), {
    module: 'bound_entangled.c2_otimes_c4.horodecki',
    attr: 'horodecki',
    args: [a],
  });
}

// --------------------------------------------------------------- C^3 x C^3 --

for (const a of [0, 0.25, 0.5, 0.9, 1]) {
  add('c3OtimesC3', `horodecki3By3(a=${a})`, () => horodecki3By3({ aParam: a }), {
    module: 'bound_entangled.c3_otimes_c3.horodecki',
    attr: 'horodecki',
    args: [a],
  });
}

add('c3OtimesC3', 'crossHatch()', () => crossHatch(), {
  module: 'bound_entangled.c3_otimes_c3.cross_hatch',
  attr: 'cross_hatch',
});

add('c3OtimesC3', 'ncomms6297()', () => ncomms6297(), {
  module: 'bound_entangled.c3_otimes_c3.ncomms6297',
  attr: 'ncomms6297',
});

for (const [m1, m2] of [
  [0.5, 0.5],
  [0.2, 0.3],
  [0.6, 0.1],
  [0, 0],
  [0.1, -0.4],
] as const) {
  add('c3OtimesC3', `steeringState(m1=${m1}, m2=${m2})`, () => steeringState({ m1, m2 }), {
    module: 'bound_entangled.c3_otimes_c3.steering',
    attr: 'steering_state',
    args: [m1, m2],
  });
}

add('c3OtimesC3', 'tilesUpb()', () => tilesUpb(), {
  module: 'bound_entangled.c3_otimes_c3.upb.tiles_UPB',
  attr: 'tiles_upb',
});

add('c3OtimesC3', 'pyramidUpb()', () => pyramidUpb(), {
  module: 'bound_entangled.c3_otimes_c3.upb.pyramid_UPB',
  attr: 'pyramid_upb',
});

add('c3OtimesC3', 'pyramidBasis()', () => pyramidBasis(), {
  module: 'bound_entangled.c3_otimes_c3.upb.pyramid_UPB',
  attr: 'pyramid_basis',
});

/** The angle at which the parametrized family reduces to the Pyramid UPB. */
const PYRAMID_ANGLE = Math.acos((Math.sqrt(5) - 1) / 2);

// The Pyramid and Tiles UPBs are special points of the six-parameter family, so
// those two angle choices pin the family to a known limit as well as to Python.
const PARAMETRIZED_ANGLES: readonly (readonly [
  string,
  number,
  number,
  number,
  number,
  number,
  number,
])[] = [
  ['generic', 0.7, 0.6, 0.3, 1.1, 0.5, 1.4],
  ['pyramidLimit', PYRAMID_ANGLE, PYRAMID_ANGLE, 0, PYRAMID_ANGLE, PYRAMID_ANGLE, 0],
  ['tilesLimit', (3 * Math.PI) / 4, (3 * Math.PI) / 4, 0, (3 * Math.PI) / 4, (3 * Math.PI) / 4, 0],
  ['phased', 1.2, 0.9, -0.8, 0.4, 2.1, 2.7],
];

for (const [label, gammaA, thetaA, phiA, gammaB, thetaB, phiB] of PARAMETRIZED_ANGLES) {
  const options = { gammaA, thetaA, phiA, gammaB, thetaB, phiB };
  const args = [gammaA, thetaA, phiA, gammaB, thetaB, phiB];
  add('c3OtimesC3', `parametrizedUpb(${label})`, () => parametrizedUpb(options), {
    module: 'bound_entangled.c3_otimes_c3.upb.parametrized_UPB',
    attr: 'parametrized_upb',
    args,
  });
  add('c3OtimesC3', `parametrizedBasis(${label})`, () => parametrizedBasis(options), {
    module: 'bound_entangled.c3_otimes_c3.upb.parametrized_UPB',
    attr: 'parametrized_basis',
    args,
  });
}

// --------------------------------------------------------------- C^4 x C^4 --

add('c4OtimesC4', 'piani()', () => piani(), {
  module: 'bound_entangled.c4_otimes_c4.piani',
  attr: 'piani',
});

for (const [i, j] of [
  [0, 0],
  [0, 2],
  [1, 1],
  [2, 3],
  [3, 1],
  [3, 3],
] as const) {
  add('c4OtimesC4', `projectorIj(${i}, ${j})`, () => projectorIj(i, j), {
    module: 'bound_entangled.c4_otimes_c4.piani',
    attr: 'P_ij',
    args: [i, j],
  });
}

// --------------------------------------------------------------- C^5 x C^5 --

add('c5OtimesC5', 'sn3GridState()', () => sn3GridState(), {
  module: 'bound_entangled.c5_otimes_c5.sn3_grid_state',
  attr: 'sn3_grid_state',
});

// --------------------------------------------------------------- C^d x C^d --

for (const [secondDimD, b] of [
  [2, 0.5],
  [3, 0.5],
  [4, 0.2],
  [4, 0.5],
  [5, 0.8],
  [6, 0.9],
] as const) {
  add(
    'cdOtimesCd',
    `horodecki2ByDGeneralized(d=${secondDimD}, b=${b})`,
    () => horodecki2ByDGeneralized({ secondDimD, b }),
    {
      module: 'bound_entangled.cd_otimes_cd.horodecki_2_by_d_generalized',
      attr: 'horodecki_2_by_d_generalized',
      kwargs: { second_dim_d: secondDimD, b },
    },
  );
}

for (const fullDim of [4, 6, 8]) {
  add('cdOtimesCd', `genTiles1(d=${fullDim})`, () => genTiles1({ fullDim }), {
    module: 'bound_entangled.cd_otimes_cd.gen_tiles',
    attr: 'gen_tiles1',
    kwargs: { full_dim: fullDim },
  });
  add('cdOtimesCd', `genTiles1Basis(d=${fullDim})`, () => genTiles1Basis({ fullDim }), {
    module: 'bound_entangled.cd_otimes_cd.gen_tiles',
    attr: 'gen_tiles1_basis',
    args: [fullDim],
  });
}

for (const [fullDim, x, y] of [
  [3, 0.5, 0.1],
  [3, 0.2, 0.2],
  [4, 0.3, 0.1],
  [4, 0.1, 0.05],
  [5, 0.4, 0.05],
  [6, 0.2, 0.1],
] as const) {
  add('cdOtimesCd', `yuOh(d=${fullDim}, x=${x}, y=${y})`, () => yuOh({ fullDim, x, y }), {
    module: 'bound_entangled.cd_otimes_cd.yu_oh',
    attr: 'yu_oh',
    kwargs: { full_dim: fullDim, x, y },
  });
}

// The Yu-Oh building blocks, so a mismatch in the state can be traced to one of
// them rather than to the assembly.
for (const [d, i, j] of [
  [3, 0, 1],
  [4, 1, 2],
  [5, 0, 4],
] as const) {
  add('cdOtimesCd', `psiIj(${d}, ${i}, ${j})`, () => matrix(psiIj(d, i, j)), {
    module: 'bound_entangled.cd_otimes_cd.yu_oh',
    attr: 'psi_ij',
    args: [d, i, j],
  });
}

for (const d of [3, 4, 5, 6]) {
  add('cdOtimesCd', `thetaDGen(${d})`, () => thetaDGen(d).map((theta) => matrix(theta)), {
    module: 'bound_entangled.cd_otimes_cd.yu_oh',
    attr: 'teta_d_gen',
    args: [d],
  });
}

for (const [d, k] of [
  [3, 1],
  [3, 2],
  [5, 3],
] as const) {
  const x = 0.4;
  const y = 0.1;
  const z = Math.sqrt(1 - x ** 2 - y ** 2);
  add('cdOtimesCd', `phiK(${d}, ${k})`, () => matrix(phiK(d, k)), {
    module: 'bound_entangled.cd_otimes_cd.yu_oh',
    attr: 'phi_k',
    args: [d, k],
  });
  add('cdOtimesCd', `psiK(${d}, ${k})`, () => matrix(psiK(d, k, x, y, z)), {
    module: 'bound_entangled.cd_otimes_cd.yu_oh',
    attr: 'psi_k',
    args: [d, k, x, y, z],
  });
}

for (const shieldDim of [2, 3, 4]) {
  add(
    'cdOtimesCd',
    `badziagPrivateSinglet(d=${shieldDim})`,
    () => badziagPrivateSinglet({ shieldDim }),
    {
      module: 'bound_entangled.cd_otimes_cd.badziag_private_singlet',
      attr: 'badziag_private_singlet',
      kwargs: { shield_dim: shieldDim },
    },
  );
}

// d = 3 takes the hard-coded branch of the construction and the powers of two
// the Pauli-string branch, so both have to be exercised.
for (const shieldDim of [2, 3, 4]) {
  add('cdOtimesCd', `orthogonalSinglet(d=${shieldDim})`, () => orthogonalSinglet({ shieldDim }), {
    module: 'bound_entangled.cd_otimes_cd.orthogonal_singlet',
    attr: 'orthogonal_singlet',
    kwargs: { shield_dim: shieldDim },
  });
}

// --------------------------------------------------------------- C^m x C^n --

const GRID_CASES: readonly (readonly [string, readonly [number, number], readonly Edge[]])[] = [
  ['crossHatch', [3, 3], CROSS_HATCH_EDGES],
  ['path', [2, 3], PATH_EDGES],
  ['rectangle', [3, 4], RECTANGLE_EDGES],
];

for (const [label, dims, edges] of GRID_CASES) {
  add('cmOtimesCn', `gridState(${label})`, () => gridState({ dims, edges }), {
    module: 'bound_entangled.cm_otimes_cn.grid_state',
    attr: 'grid_state',
    args: [[...dims], ...edges.map(vertices)],
  });
}

add(
  'cmOtimesCn',
  'gridComponent([3, 4], [1, 1], [2, 3])',
  () => gridComponent([3, 4], [1, 1], [2, 3]),
  {
    module: 'bound_entangled.cm_otimes_cn.grid_state',
    attr: 'grid_component',
    args: [
      [3, 4],
      [1, 1],
      [2, 3],
    ],
  },
);

const GENERALIZED_GRID_CASES: readonly (readonly [
  string,
  readonly [number, number],
  readonly Hyperedge[],
])[] = [
  ['simple', [3, 3], SIMPLE_HYPEREDGES],
  ['sn3', [5, 5], SN3_HYPEREDGES],
  ['repeatedVertices', [3, 4], REPEATED_HYPEREDGES],
];

for (const [label, dims, hyperedges] of GENERALIZED_GRID_CASES) {
  add(
    'cmOtimesCn',
    `generalizedGridState(${label})`,
    () => generalizedGridState({ dims, hyperedges }),
    {
      module: 'bound_entangled.cm_otimes_cn.generalized_grid_state',
      attr: 'generalized_grid_state',
      args: [[...dims], ...hyperedges.map(vertices)],
    },
  );
}

const GEN_TILES2_DIMS: readonly (readonly [number, number])[] = [
  [3, 4],
  [3, 5],
  [4, 4],
  [4, 5],
  [5, 6],
];

for (const dims of GEN_TILES2_DIMS) {
  const label = `${dims[0]}x${dims[1]}`;
  add('cmOtimesCn', `genTiles2(${label})`, () => genTiles2({ dims }), {
    module: 'bound_entangled.cm_otimes_cn.gen_tiles',
    attr: 'gen_tiles2',
    args: [[...dims]],
  });
  add('cmOtimesCn', `genTiles2Basis(${label})`, () => genTiles2Basis({ dims }), {
    module: 'bound_entangled.cm_otimes_cn.gen_tiles',
    attr: 'gen_tiles2_basis',
    args: [[...dims]],
  });
}

// ------------------------------------------------------------- multipartite --

for (const systems of [2, 4, 6]) {
  add('multipartite', `generalizedSmolin(${systems})`, () => generalizedSmolin({ systems }), {
    module: 'bound_entangled.multipartite.generalized_smolin',
    attr: 'generalized_smolin',
    args: [systems],
  });
}

add('multipartite', 'smolin()', () => smolin(), {
  module: 'bound_entangled.multipartite.smolin',
  attr: 'smolin',
});

const QUASI_DS_CASES: readonly (readonly [number, number, QuasiDsSign])[] = [
  [5, 1, 1],
  [5, 1, -1],
  [5, 0.3, 1],
  [5, 4.5, -1],
  [7, 2, -1],
  [7, 0.75, 1],
];

for (const [n, z, sigma] of QUASI_DS_CASES) {
  add('multipartite', `quasiDs(n=${n}, z=${z}, sigma=${sigma})`, () => quasiDs({ n, z, sigma }), {
    module: 'bound_entangled.multipartite.quasi_ds',
    attr: 'quasi_ds',
    args: [n, z, sigma],
  });
  add(
    'multipartite',
    `quasiDsDickeBasis(n=${n}, z=${z}, sigma=${sigma})`,
    () => quasiDsDickeBasis({ n, z, sigma }),
    {
      module: 'bound_entangled.multipartite.quasi_ds',
      attr: 'quasi_ds_dicke_basis',
      args: [n, z, sigma],
    },
  );
}

for (const n of [1, 2, 5, 7]) {
  add('multipartite', `dickeIso(${n})`, () => dickeIso(n), {
    module: 'bound_entangled.multipartite.quasi_ds',
    attr: 'dicke_iso',
    args: [n],
  });
}

// -------------------------------------------------------------------- utils --

// The states above are all built out of these, so checking them separately
// turns a state-level failure into a one-line diagnosis.

const KETBRA_KET = [0.3, -0.6, 0, 0.5];
const KETBRA_BRA = [1, 0.25, -0.75, 0.5];

add('utils', 'ketbra(a)', () => ketbra(KETBRA_KET), {
  module: 'bound_entangled.utils.ketbra',
  attr: 'ketbra',
  args: [ndarray(KETBRA_KET)],
});

add('utils', 'ketbra(a, b)', () => ketbra(KETBRA_KET, KETBRA_BRA), {
  module: 'bound_entangled.utils.ketbra',
  attr: 'ketbra',
  args: [ndarray(KETBRA_KET), ndarray(KETBRA_BRA)],
});

// |a><b| conjugates the bra, so only a complex second argument tells a correct
// implementation from one that dropped the conjugation.
const COMPLEX_KET = { real: [0.5, 0, -0.25], imag: [0, 0.75, 0.5] };
const COMPLEX_BRA = { real: [0.1, -0.2, 0.4], imag: [0.3, 0.6, -0.9] };

/** A complex vector, from its real and imaginary parts. */
function complexVector(parts: { real: number[]; imag: number[] }): Scalar[] {
  return parts.real.map((re, i) => complex(re, parts.imag[i]));
}

add(
  'utils',
  'ketbra(complex a, complex b)',
  () => ketbra(complexVector(COMPLEX_KET), complexVector(COMPLEX_BRA)),
  {
    module: 'bound_entangled.utils.ketbra',
    attr: 'ketbra',
    args: [
      complexNdarray(COMPLEX_KET.real, COMPLEX_KET.imag),
      complexNdarray(COMPLEX_BRA.real, COMPLEX_BRA.imag),
    ],
  },
);

/** The Tiles UPB, written out, so `upb` is checked apart from the bases feeding it. */
const TILES_VECTORS: readonly number[][] = (() => {
  const s = 1 / Math.SQRT2;
  const t = 1 / 3;
  const vector = (entries: Record<number, number>): number[] =>
    Array.from({ length: 9 }, (_, i) => entries[i] ?? 0);
  return [
    vector({ 0: s, 1: -s }),
    vector({ 2: s, 5: -s }),
    vector({ 7: s, 8: -s }),
    vector({ 3: s, 6: -s }),
    new Array<number>(9).fill(t),
  ];
})();

add('utils', 'upb(tiles)', () => upb(TILES_VECTORS), {
  module: 'bound_entangled.utils.upb',
  attr: 'upb',
  args: [TILES_VECTORS.map((v) => ndarray(v))],
});

// The remaining utils are ports of toqito's, which is what the Python package
// calls, so toqito is the reference for them.

for (const dim of [2, 3, 4, 5, 8]) {
  add('utils', `fourier(${dim})`, () => fourier(dim), {
    module: 'toqito.matrices',
    attr: 'fourier',
    args: [dim],
  });
}

const PAULI_CASES: readonly (readonly [string, PauliIndex | readonly PauliIndex[]])[] = [
  ['0', 0],
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['[1, 2]', [1, 2]],
  ['[3, 3, 3]', [3, 3, 3]],
  ['[1, 1, 1, 1]', [1, 1, 1, 1]],
  ['[0, 2, 3]', [0, 2, 3]],
];

for (const [label, index] of PAULI_CASES) {
  add('utils', `pauli(${label})`, () => pauli(index), {
    module: 'toqito.matrices',
    attr: 'pauli',
    args: [Array.isArray(index) ? [...index] : index],
  });
}

for (const dim of [2, 3, 4, 5]) {
  add('utils', `maxEntangled(${dim})`, () => maxEntangled(dim), {
    module: 'toqito.states',
    attr: 'max_entangled',
    args: [dim],
  });
  add(
    'utils',
    `maxEntangled(${dim}, unnormalized)`,
    () => maxEntangled(dim, { normalized: false }),
    {
      module: 'toqito.states',
      attr: 'max_entangled',
      kwargs: { dim, is_normalized: false },
    },
  );
}

for (const index of [0, 1, 2, 3, 4]) {
  add('utils', `tile(${index})`, () => tile(index), {
    module: 'toqito.states',
    attr: 'tile',
    args: [index],
  });
}

const PARTIAL_TRANSPOSE_CASES: readonly (readonly [number, number[], number | number[]])[] = [
  [4, [2, 2], 0],
  [4, [2, 2], 1],
  [6, [2, 3], 0],
  [6, [3, 2], 1],
  [8, [2, 2, 2], 1],
  [8, [2, 2, 2], [0, 2]],
  [9, [3, 3], 1],
];

for (const [dimension, dims, sys] of PARTIAL_TRANSPOSE_CASES) {
  add(
    'utils',
    `partialTranspose(${dimension}, dims=[${dims.join(', ')}], sys=${JSON.stringify(sys)})`,
    () => partialTranspose(ramp(dimension), dims, sys),
    {
      module: 'toqito.channels',
      attr: 'partial_transpose',
      args: [ndarray(ramp(dimension)), sys, dims],
    },
  );
}

const PERMUTE_CASES: readonly (readonly [number, number[], number[]])[] = [
  [4, [1, 0], [2, 2]],
  [6, [1, 0], [2, 3]],
  [8, [1, 2, 0], [2, 2, 2]],
  [8, [2, 0, 1], [2, 2, 2]],
  [16, [0, 2, 1, 3], [2, 2, 2, 2]],
  [12, [2, 0, 1], [2, 2, 3]],
];

for (const [dimension, perm, dims] of PERMUTE_CASES) {
  add(
    'utils',
    `permuteSystems(${dimension}, perm=[${perm.join(', ')}], dims=[${dims.join(', ')}])`,
    () => permuteSystems(ramp(dimension), perm, dims),
    {
      module: 'toqito.perms',
      attr: 'permute_systems',
      args: [ndarray(ramp(dimension)), perm, dims],
    },
  );
}

/** Every case, in declaration order. */
export const parityCases: readonly ParityCase[] = cases;
