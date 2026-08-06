/**
 * Documentation page for the generalized grid state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { generalizedGridState } from "bound-entangled";
import type { Hyperedge } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import Citation from "../../../Citation";
import Parameters from "../../../Parameters";
import Parameter from "../../../Parameters/Parameter";

interface Preset {
  label: string;
  dims: readonly [number, number];
  hyperedges: readonly Hyperedge[];
}

const PRESETS: Preset[] = [
  {
    label: "2 × 2, one loop (single vertex)",
    dims: [2, 2],
    hyperedges: [[[1, 1]]],
  },
  {
    label: "3 × 3, one hyperedge (pure state)",
    dims: [3, 3],
    hyperedges: [
      [
        [0, 0],
        [1, 1],
      ],
    ],
  },
  {
    label: "3 × 3, two hyperedges (mixed state)",
    dims: [3, 3],
    hyperedges: [
      [
        [0, 0],
        [1, 1],
      ],
      [
        [0, 1],
        [2, 2],
      ],
    ],
  },
];

function GeneralizedGridState() {
  const [presetIndex, setPresetIndex] = useState(1);
  const preset = PRESETS[presetIndex];
  const rho = generalizedGridState({ dims: preset.dims, hyperedges: preset.hyperedges });

  return (
    <>
      <p>
        The generalized grid state extends the <Link to="/states/cm-cn/grid-state">grid state</Link>{" "}
        by letting a hyperedge span any number of vertices of the m × n grid, not just two. Each
        hyperedge contributes the (unnormalized) sum of its vertices' basis states rather than their
        normalized difference, and the mixture is trace-normalized rather than divided by an edge
        count.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          A hyperedge is a list of one or more vertices <span className="math-var">[i, j]</span>.
          Its component is the sum of the corresponding basis states — a vertex listed twice
          contributes twice, and there is no relative minus sign between terms:
        </p>
        <EquationLine>{"|h⟩ = Σ_{[i, j] ∈ h} |i, j⟩"}</EquationLine>
        <p>
          The generalized grid state is the trace-normalized mixture over a chosen set of hyperedges{" "}
          <span className="math-var">H</span>:
        </p>
        <EquationLine>{"ρ = (Σ_{h ∈ H} |h⟩⟨h|) / Tr(Σ_{h ∈ H} |h⟩⟨h|)"}</EquationLine>
      </div>

      <Parameters>
        <Parameter paramName="dims">
          The grid dimensions <span className="math-var">[m, n]</span>; the state lives on C
          <sup>m</sup> ⊗ C<sup>n</sup>.
        </Parameter>
        <Parameter paramName="hyperedges">
          A non-empty array of <code>Hyperedge</code>. Each <code>Hyperedge</code> is a non-empty
          array of <code>Vertex</code>, and each <code>Vertex</code> is a pair{" "}
          <span className="math-var">[i, j]</span> with 0 ≤ <span className="math-var">i</span>{" "}
          &lt; <span className="math-var">m</span> and 0 ≤ <span className="math-var">j</span>{" "}
          &lt; <span className="math-var">n</span>. An empty hyperedge set, or a hyperedge spanning
          zero vertices, is rejected.
        </Parameter>
      </Parameters>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.cm_otimes_cn import generalized_grid_state

rho = generalized_grid_state(
    (3, 3),
    [(0, 0), (1, 1)],
    [(0, 1), (2, 2)],
)`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">hyperedges</span>
              <select value={presetIndex} onChange={(e) => setPresetIndex(Number(e.target.value))}>
                {PRESETS.map((p, i) => (
                  <option key={p.label} value={i}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div>
        <h2>Properties</h2>
        <p>
          A hyperedge spanning exactly one vertex (a "loop") contributes a diagonal basis projector,
          and a vertex repeated within a hyperedge weights that basis state more heavily — neither
          is expressible with an ordinary two-vertex edge. For a single two-vertex hyperedge, ρ
          reduces exactly to the projector onto its normalized component, the same pure, entangled
          state an ordinary edge would give.
        </p>
        <p className="doc-cite">
          Loops and repeated-vertex hyperedges are exactly the tools used to build the{" "}
          <Link to="/states/c5-c5/sn3-grid-state">SN3 grid state</Link>, the smallest known Schmidt
          number 3 PPT bound entangled state, on C⁵ ⊗ C⁵: it mixes single-vertex loops (some
          repeated, to weight the diagonal) with ordinary two-vertex edges and one three-vertex
          hyperedge.
        </p>
      </div>

      <Citation>
        <p>
          R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum bound entangled
          states". <a href="https://arxiv.org/abs/2402.12966">arXiv:2402.12966</a>
        </p>
      </Citation>
    </>
  );
}

export default GeneralizedGridState;
