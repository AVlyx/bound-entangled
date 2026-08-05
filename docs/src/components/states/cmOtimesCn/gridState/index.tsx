/**
 * Documentation page for the grid state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { gridState } from "bound-entangled";
import type { Edge } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import Citation from "../../../Citation";

interface Preset {
  label: string;
  dims: readonly [number, number];
  edges: readonly Edge[];
}

const PRESETS: Preset[] = [
  {
    label: "2 × 3, three-edge path",
    dims: [2, 3],
    edges: [
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
    ],
  },
  {
    label: "2 × 2, single edge (Bell state)",
    dims: [2, 2],
    edges: [
      [
        [0, 0],
        [1, 1],
      ],
    ],
  },
];

function GridState() {
  const [presetIndex, setPresetIndex] = useState(0);
  const preset = PRESETS[presetIndex];
  const rho = gridState({ dims: preset.dims, edges: preset.edges });

  return (
    <>
      <p>
        A quantum grid state identifies the vertices of an m × n grid with the product basis{" "}
        <span className="math">
          {"{|"}
          <span className="math-var">i</span>, <span className="math-var">j</span>
          {"⟩}"}
        </span>{" "}
        of C<sup>m</sup> ⊗ C<sup>n</sup>, and turns a graph on those vertices into a mixed state:
        the uniform mixture of the pure states carried by its edges. It is a general,
        graph-theoretic route to bound entanglement — whether a particular choice of edges gives an
        entangled or a PPT state is a combinatorial property of the graph.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          A vertex is a pair <span className="math-var">[i, j]</span>, identified with the basis
          state |<span className="math-var">i</span>, <span className="math-var">j</span>⟩. An edge
          joins two vertices and carries the normalized difference of their basis states:
        </p>
        <EquationLine>|e⟩ = (|i, j⟩ − |k, l⟩) / √2</EquationLine>
        <p>
          The grid state is the uniform mixture over a chosen edge set{" "}
          <span className="math-var">E</span>:
        </p>
        <EquationLine>{"ρ = (1 / |E|) Σ_{e ∈ E} |e⟩⟨e|"}</EquationLine>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>dims</dt>
          <dd>
            The grid dimensions <span className="math-var">[m, n]</span>; the state lives on C
            <sup>m</sup> ⊗ C<sup>n</sup>.
          </dd>
          <dt>edges</dt>
          <dd>
            A non-empty array of <code>Edge</code>s. Each <code>Edge</code> is a pair of{" "}
            <code>Vertex</code>, and each <code>Vertex</code> is a pair{" "}
            <span className="math-var">[i, j]</span> with 0 ≤ <span className="math-var">i</span>{" "}
            &lt; <span className="math-var">m</span> and 0 ≤ <span className="math-var">j</span>{" "}
            &lt; <span className="math-var">n</span>. An empty edge set is rejected.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.cm_otimes_cn import grid_state

rho = grid_state(
    (2, 3),
    ((0, 0), (0, 1)),
    ((0, 1), (0, 2)),
    ((0, 0), (1, 0)),
)`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">edge set</span>
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

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          Every grid state is a valid density matrix, since it is a uniform mixture of the rank-one
          projectors carried by the edges. Whether it is entangled or PPT depends on the graph: a
          single edge gives the projector onto |<span className="math-var">i, j</span>⟩ − |
          <span className="math-var">k, l</span>⟩, which is a maximally entangled (NPT) Bell-type
          state, as in the 2 × 2 preset above. Other edge sets can instead give a PPT state — a
          candidate for bound entanglement.
        </p>
        <p className="doc-cite">
          The four-edge cross-hatch pattern on C³ ⊗ C³ is one such PPT example; see{" "}
          <Link to="/states/c3-c3/cross-hatch">crossHatch()</Link>. The hyperedge generalization of
          this construction, used to build the C⁵ ⊗ C⁵ SN3 grid state, is documented at{" "}
          generalizedGridState().
        </p>
      </div>

      <Citation>
        <p>
          J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid states",
          Phys. Rev. A 97, 062340 (2018).{" "}
          <a href="https://arxiv.org/abs/1705.09261">arXiv:1705.09261</a>
        </p>
      </Citation>
    </>
  );
}

export default GridState;
