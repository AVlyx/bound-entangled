import { useState } from "react";
import { generalizedGridComponent, sn3GridState } from "bound-entangled";
import type { Hyperedge } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/**
 * Documentation page for the SN3 grid state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */

/** The 5x5 grid dimensions the state lives on. */
const DIMS: readonly [number, number] = [5, 5];

/** The 13 hyperedges the state is built from, grouped and labelled as in the source. */
const HYPEREDGES: ReadonlyArray<{ label: string; vertices: Hyperedge }> = [
  { label: "loop (0,0)", vertices: [[0, 0]] },
  { label: "loop (1,0)", vertices: [[1, 0]] },
  { label: "loop (0,1)", vertices: [[0, 1]] },
  { label: "loop (4,1)", vertices: [[4, 1]] },
  { label: "loop (1,4)", vertices: [[1, 4]] },
  { label: "double loop (3,2) — listed twice", vertices: [[3, 2]] },
  { label: "double loop (2,3) — listed twice", vertices: [[2, 3]] },
  {
    label: "edge (1,2)–(3,4)",
    vertices: [
      [1, 2],
      [3, 4],
    ],
  },
  {
    label: "edge (2,1)–(4,3)",
    vertices: [
      [2, 1],
      [4, 3],
    ],
  },
  {
    label: "edge (2,2)–(3,3)",
    vertices: [
      [2, 2],
      [3, 3],
    ],
  },
  {
    label: "hyperedge (0,2)-(1,1)-(2,0)",
    vertices: [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  },
];

function Sn3GridState() {
  const [selected, setSelected] = useState<number>(0);
  const vertices = HYPEREDGES[selected].vertices;
  const component = generalizedGridComponent(DIMS, vertices).toArray() as number[];

  return (
    <>
      <p>
        The smallest known Schmidt number 3 PPT bound entangled state, on C⁵ ⊗ C⁵. It is an instance
        of the generalized quantum grid state construction: a mixture of pure states, each carried
        by a hyperedge over the product basis, chosen so the resulting state stays positive under
        partial transpose while requiring entangling operations of Schmidt rank at least 3 to
        prepare.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          A (plain) grid state is built from a graph whose vertices are the product basis states{" "}
          <span className="math">|i⟩ ⊗ |j⟩</span> of C<span className="math-var">m</span> ⊗ C
          <span className="math-var">n</span>, and whose edges pair up vertices. An edge joining{" "}
          <span className="math">(i, j)</span> and <span className="math">(k, l)</span> carries the
          pure state <span className="math">(|ij⟩ − |kl⟩) / √2</span>, and the grid state is the
          uniform mixture <span className="math">ρ = (1 / |E|) Σₑ |e⟩⟨e|</span> of the states
          carried by every edge.
        </p>
        <p>
          The SN3 state generalizes this to <em>hyperedges</em>: a hyperedge is a list of one or
          more vertices, possibly repeating a vertex. Unlike an ordinary edge it carries no relative
          minus sign, and repeating a vertex adds to it again, so a hyperedge spanning vertices{" "}
          <span className="math">v₁, …, vₖ</span> carries the unnormalized vector
        </p>
        <div className="equation">|c⟩ = Σᵢ |vᵢ⟩</div>
        <p>
          The generalized grid state is the trace-normalized sum of{" "}
          <span className="math">|c⟩⟨c|</span> over every hyperedge — not divided by the number of
          hyperedges directly, so a hyperedge spanning more vertices, or a vertex reused across
          several hyperedges, contributes more weight before the final normalization:
        </p>
        <div className="equation">ρ = (Σ₍hyperedges₎ |c⟩⟨c|) / tr(Σ₍hyperedges₎ |c⟩⟨c|)</div>
        <p>
          <code>sn3GridState()</code> is this construction on the 5×5 grid with 13 hyperedges,
          falling into four groups:
        </p>
        <ul>
          <li>
            five single-vertex "loops" at <span className="math">(0,0)</span>,{" "}
            <span className="math">(1,0)</span>, <span className="math">(0,1)</span>,{" "}
            <span className="math">(4,1)</span> and <span className="math">(1,4)</span>, each a
            diagonal term <span className="math">|v⟩⟨v|</span>;
          </li>
          <li>
            two "double loops", the single vertices <span className="math">(3,2)</span> and{" "}
            <span className="math">(2,3)</span>, each listed twice among the hyperedges and so
            carrying twice the weight of a single loop;
          </li>
          <li>
            three two-vertex "edges" — <span className="math">{"{(1,2), (3,4)}"}</span>,{" "}
            <span className="math">{"{(2,1), (4,3)}"}</span> and{" "}
            <span className="math">{"{(2,2), (3,3)}"}</span> — each carrying an unnormalized{" "}
            <span className="math">|ij⟩ + |kl⟩</span> coherence (no minus sign, unlike a plain grid
            edge); and
          </li>
          <li>
            one three-vertex hyperedge <span className="math">{"{(0,2), (1,1), (2,0)}"}</span>,
            carrying <span className="math">|02⟩ + |11⟩ + |20⟩</span> — the only hyperedge spanning
            three vertices.
          </li>
        </ul>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c5_otimes_c5 import sn3_grid_state

rho = sn3_grid_state()  # 25x25 density matrix on C⁵ ⊗ C⁵`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <p>
          <code>sn3GridState()</code> has no free parameter; instead, pick one of its 13 hyperedges
          to see the (unnormalized) component vector it contributes to the mixture.
        </p>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">hyperedge</span>
              <select value={selected} onChange={(e) => setSelected(Number(e.target.value))}>
                {HYPEREDGES.map((h, index) => (
                  <option key={h.label} value={index}>
                    {h.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={component.map((x) => [x])} precision={2} dimZeros label="|c⟩ =" />
          </div>
        </div>
        <p className="equation-caption">
          The full state ρ = sn3GridState(), the trace-normalized sum of |c⟩⟨c| over all 13
          hyperedges above:
        </p>
        <div className="scroll-x">
          <LatexMatrix value={sn3GridState()} precision={2} dimZeros label="ρ =" />
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">bound entangled</span>{" "}
          <span className="badge">Schmidt number 3</span> <span className="badge">C⁵ ⊗ C⁵</span>{" "}
          <span className="badge">25×25</span>
        </p>
        <ul>
          <li>25×25 density matrix on C⁵ ⊗ C⁵.</li>
          <li>Positive under partial transpose (PPT) with respect to the [5, 5] split.</li>
          <li>
            The smallest known Schmidt number 3 PPT bound entangled state, per the source paper's
            Result 1 / Appendix B: preparing it from a product state requires operations of Schmidt
            rank at least 3, even though it has positive partial transpose.
          </li>
        </ul>
      </div>

      <Citation>
        <p>
          R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum bound entangled
          states", Result 1 / Appendix B.{" "}
          <a href="https://arxiv.org/abs/2402.12966">arXiv:2402.12966</a>
        </p>
        <p>
          The underlying grid state construction is due to J. Lockhart, O. Gühne, S. Severini,
          "Entanglement properties of quantum grid states", Phys. Rev. A 97, 062340 (2018).{" "}
          <a href="https://arxiv.org/abs/1705.09261">arXiv:1705.09261</a>
        </p>
      </Citation>
    </>
  );
}

export default Sn3GridState;
