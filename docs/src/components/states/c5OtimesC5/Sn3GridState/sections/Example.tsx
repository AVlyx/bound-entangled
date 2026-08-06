import { useState } from "react";
import { generalizedGridComponent, sn3GridState } from "bound-entangled";
import type { Hyperedge } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

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

function Example() {
  const [selected, setSelected] = useState<number>(0);
  const vertices = HYPEREDGES[selected].vertices;
  const component = generalizedGridComponent(DIMS, vertices).toArray() as number[];

  return (
    <ExampleSection>
      <p>
        <code>sn3GridState()</code> has no free parameter; instead, pick one of its 13 hyperedges
        to see the (unnormalized) component vector it contributes to the mixture.
      </p>
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
        <LatexMatrix value={component.map((x) => [x])} precision={2} dimZeros label="|c\rangle =" />
      </div>
      <p className="equation-caption">
        The full state ρ = sn3GridState(), the trace-normalized sum of |c⟩⟨c| over all 13
        hyperedges above:
      </p>
      <div className="scroll-x">
        <LatexMatrix value={sn3GridState()} precision={2} dimZeros label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
