import { useState } from "react";
import { gridState } from "bound-entangled";
import type { Edge } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

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

function Example() {
  const [presetIndex, setPresetIndex] = useState(0);
  const preset = PRESETS[presetIndex];
  const rho = gridState({ dims: preset.dims, edges: preset.edges });

  return (
    <ExampleSection copyValue={rho}>
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
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
