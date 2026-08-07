import type { ComponentType } from "react";

import Introduction from "./pages/Introduction";

import Horodecki2by4 from "./components/states/c2OtimesC4/Horodecki";

import Horodecki3by3 from "./components/states/c3otimesC3/Horodecki";
import CrossHatch from "./components/states/c3otimesC3/CrossHatch";
import Ncomms6297 from "./components/states/c3otimesC3/Ncomms6297";
import Steering from "./components/states/c3otimesC3/Steering";
import TilesUpb from "./components/states/c3otimesC3/upb/TilesUpb";
import PyramidUpb from "./components/states/c3otimesC3/upb/PyramidUpb";
import ParametrizedUpb from "./components/states/c3otimesC3/upb/ParametrizedUpb";

import Piani from "./components/states/c4OtimesC4/Piani";

import Sn3GridState from "./components/states/c5OtimesC5/Sn3GridState";

import Horodecki2OtimesDGeneralized from "./components/states/cdOtimesCd/Horodecki2OtimesDGeneralized";
import Gentiles from "./components/states/cdOtimesCd/Gentiles";
import YuOh from "./components/states/cdOtimesCd/YuOh";
import BadziagPrivateSinglet from "./components/states/cdOtimesCd/BadziagPrivateSinglet";
import OrthogonalSinglet from "./components/states/cdOtimesCd/OrthogonalSinglet";

import GridState from "./components/states/cmOtimesCn/gridState";
import GeneralizedGridState from "./components/states/cmOtimesCn/generalizedGridState";
import GenTiles from "./components/states/cmOtimesCn/genTiles";

import Smolin from "./components/states/multipartite/smolin";
import GeneralizedSmolin from "./components/states/multipartite/generalizedSmolin";
import QuasiDs from "./components/states/multipartite/quasiDs";

/** One documentation page: a sidebar entry and the component rendered beside it. */
export interface NavItem {
  /** Route path, unique across the site. */
  path: string;
  /** Label in the sidebar and title of the page. */
  title: string;
  /** Name the library exports this state under, shown under the page title. */
  fn?: string;
  /** Eyebrow above the title, normally the Hilbert space the state lives in. */
  space?: string;
  /** One-sentence summary, shown as the page lead. */
  summary?: string;
  /** Body of the page. */
  Component: ComponentType;
}

/** A nested list of pages inside a section, e.g. the UPBs of 3 ⊗ 3. */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** A top-level block of the sidebar, normally one Hilbert space. */
export interface NavSection {
  title: string;
  items: NavItem[];
  groups?: NavGroup[];
}

export const navigation: NavSection[] = [
  {
    title: "Getting started",
    items: [
      {
        path: "/",
        title: "Introduction",
        summary:
          "Constructions of bound entangled states and unextendible product bases, in TypeScript and Python.",
        Component: Introduction,
      },
    ],
  },
  {
    title: "C² ⊗ C⁴",
    items: [
      {
        path: "/states/c2-c4/horodecki",
        title: "Horodecki 2 ⊗ 4",
        fn: "horodecki2By4",
        space: "C² ⊗ C⁴",
        summary:
          "The original 2 ⊗ 4 bound entangled state: positive under partial transpose, yet entangled.",
        Component: Horodecki2by4,
      },
    ],
  },
  {
    title: "C³ ⊗ C³",
    items: [
      {
        path: "/states/c3-c3/horodecki",
        title: "Horodecki 3 ⊗ 3",
        fn: "horodecki3By3",
        space: "C³ ⊗ C³",
        summary: "The 3 ⊗ 3 member of the Horodecki family, bound entangled for every a in (0, 1).",
        Component: Horodecki3by3,
      },
      {
        path: "/states/c3-c3/cross-hatch",
        title: "Cross-hatch",
        fn: "crossHatch",
        space: "C³ ⊗ C³",
        Component: CrossHatch,
      },
      {
        path: "/states/c3-c3/ncomms6297",
        title: "Ncomms6297",
        fn: "ncomms6297",
        space: "C³ ⊗ C³",
        Component: Ncomms6297,
      },
      {
        path: "/states/c3-c3/steering",
        title: "Steering state",
        fn: "steeringState",
        space: "C³ ⊗ C³",
        Component: Steering,
      },
    ],
    groups: [
      {
        title: "Unextendible product bases",
        items: [
          {
            path: "/states/c3-c3/upb/tiles",
            title: "Tiles",
            fn: "tilesUpb",
            space: "C³ ⊗ C³",
            Component: TilesUpb,
          },
          {
            path: "/states/c3-c3/upb/pyramid",
            title: "Pyramid",
            fn: "pyramidUpb",
            space: "C³ ⊗ C³",
            Component: PyramidUpb,
          },
          {
            path: "/states/c3-c3/upb/parametrized",
            title: "Parametrized",
            fn: "parametrizedUpb",
            space: "C³ ⊗ C³",
            Component: ParametrizedUpb,
          },
        ],
      },
    ],
  },
  {
    title: "C⁴ ⊗ C⁴",
    items: [
      {
        path: "/states/c4-c4/piani",
        title: "Piani",
        fn: "piani",
        space: "C⁴ ⊗ C⁴",
        Component: Piani,
      },
    ],
  },
  {
    title: "C⁵ ⊗ C⁵",
    items: [
      {
        path: "/states/c5-c5/sn3-grid-state",
        title: "SN3 grid state",
        fn: "sn3GridState",
        space: "C⁵ ⊗ C⁵",
        Component: Sn3GridState,
      },
    ],
  },
  {
    title: "Cᵈ ⊗ Cᵈ",
    items: [
      {
        path: "/states/cd-cd/horodecki-2-d",
        title: "Horodecki 2 ⊗ d",
        fn: "horodecki2ByDGeneralized",
        space: "C² ⊗ Cᵈ",
        Component: Horodecki2OtimesDGeneralized,
      },
      {
        path: "/states/cd-cd/gen-tiles-1",
        title: "GenTiles1",
        fn: "genTiles1",
        space: "Cᵈ ⊗ Cᵈ",
        Component: Gentiles,
      },
      {
        path: "/states/cd-cd/yu-oh",
        title: "Yu–Oh",
        fn: "yuOh",
        space: "Cᵈ ⊗ Cᵈ",
        Component: YuOh,
      },
      {
        path: "/states/cd-cd/badziag-private-singlet",
        title: "Badziag private singlet",
        fn: "badziagPrivateSinglet",
        space: "Cᵈ ⊗ Cᵈ",
        Component: BadziagPrivateSinglet,
      },
      {
        path: "/states/cd-cd/orthogonal-singlet",
        title: "Orthogonal singlet",
        fn: "orthogonalSinglet",
        space: "Cᵈ ⊗ Cᵈ",
        Component: OrthogonalSinglet,
      },
    ],
  },
  {
    title: "Cᵐ ⊗ Cⁿ",
    items: [
      {
        path: "/states/cm-cn/grid-state",
        title: "Grid state",
        fn: "gridState",
        space: "Cᵐ ⊗ Cⁿ",
        Component: GridState,
      },
      {
        path: "/states/cm-cn/generalized-grid-state",
        title: "Generalized grid state",
        fn: "generalizedGridState",
        space: "Cᵐ ⊗ Cⁿ",
        Component: GeneralizedGridState,
      },
      {
        path: "/states/cm-cn/gen-tiles-2",
        title: "GenTiles2",
        fn: "genTiles2",
        space: "Cᵐ ⊗ Cⁿ",
        Component: GenTiles,
      },
    ],
  },
  {
    title: "Multipartite",
    items: [
      {
        path: "/states/multipartite/smolin",
        title: "Smolin",
        fn: "smolin",
        space: "(C²)⊗⁴",
        Component: Smolin,
      },
      {
        path: "/states/multipartite/generalized-smolin",
        title: "Generalized Smolin",
        fn: "generalizedSmolin",
        space: "(C²)⊗ⁿ",
        Component: GeneralizedSmolin,
      },
      {
        path: "/states/multipartite/quasi-ds",
        title: "Quasi-DS",
        fn: "quasiDs",
        space: "(C²)⊗ⁿ",
        Component: QuasiDs,
      },
    ],
  },
];

/** Every page in sidebar order, which is also the order used for prev/next links. */
export const navItems: NavItem[] = navigation.flatMap((section) => [
  ...section.items,
  ...(section.groups?.flatMap((group) => group.items) ?? []),
]);
