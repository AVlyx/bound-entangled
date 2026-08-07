import { useState } from "react";
import { generalizedGridState } from "bound-entangled";
import type { Hyperedge } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

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

function Example() {
  const [presetIndex, setPresetIndex] = useState(1);
  const preset = PRESETS[presetIndex];
  const rho = generalizedGridState({ dims: preset.dims, hyperedges: preset.hyperedges });

  return (
    <ExampleSection copyValue={rho}>
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
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
