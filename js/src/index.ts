export type { Dims, MatrixLike, Scalar, VectorLike } from "./types.js";

export type { MaxEntangledOptions, PauliIndex } from "./utils/index.js";
export {
  ket,
  ketbra,
  tensor,
  normalize,
  normalizeTrace,
  upb,
  pauli,
  maxEntangled,
  fourier,
  tile,
  partialTranspose,
  permuteSystems,
  isPSD,
  isPPT,
  DEFAULT_TOLERANCE,
} from "./utils/index.js";

export type { HorodeckiOptions } from "./c3OtimesC3/index.js";
export type { ParametrizedUpbOptions, SteeringStateOptions } from "./c3OtimesC3/index.js";
export {
  crossHatch,
  steeringState,
  ncomms6297,
  pyramidUpb,
  pyramidBasis,
  parametrizedUpb,
  parametrizedBasis,
  tilesUpb,
  tilesBasis,
} from "./c3OtimesC3/index.js";

// The two Horodecki states share a name in their own modules, matching the
// Python package. At the root they need distinguishing, so each is aliased by
// the space it lives in — as `horodecki2ByDGeneralized` already is.
export { horodecki as horodecki3By3 } from "./c3OtimesC3/index.js";
export { horodecki as horodecki2By4 } from "./c2OtimesC4/index.js";

export { piani, projectorIj } from "./c4OtimesC4/index.js";

export { sn3GridState } from "./c5OtimesC5/index.js";

export type {
  BadziagPrivateSingletOptions,
  GenTiles1Options,
  Horodecki2ByDOptions,
  OrthogonalSingletOptions,
  YuOhOptions,
} from "./cdOtimesCd/index.js";
export {
  horodecki2ByDGeneralized,
  genTiles1,
  genTiles1Basis,
  yuOh,
  isValidYuOhInput,
  psiIj,
  thetaDGen,
  phiK,
  psiK,
  badziagPrivateSinglet,
  orthogonalSinglet,
} from "./cdOtimesCd/index.js";

export type {
  Edge,
  GeneralizedGridStateOptions,
  GenTiles2Options,
  GridStateOptions,
  Hyperedge,
  Vertex,
} from "./cmOtimesCn/index.js";
export {
  gridState,
  gridComponent,
  generalizedGridState,
  generalizedGridComponent,
  genTiles2,
  genTiles2Basis,
} from "./cmOtimesCn/index.js";

export type {
  GeneralizedSmolinOptions,
  QuasiDsOptions,
  QuasiDsSign,
} from "./multipartite/index.js";
export {
  generalizedSmolin,
  smolin,
  quasiDs,
  quasiDsDickeBasis,
  dickeIso,
} from "./multipartite/index.js";
