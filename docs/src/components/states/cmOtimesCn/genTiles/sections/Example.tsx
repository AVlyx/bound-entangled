import { useState } from "react";
import { genTiles2, genTiles2Basis } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

const DIM_OPTIONS: readonly [number, number][] = [
  [3, 4],
  [3, 5],
  [4, 5],
];

function Example() {
  const [dimIndex, setDimIndex] = useState(0);
  const dims = DIM_OPTIONS[dimIndex];
  const rho = genTiles2({ dims });
  const basisSize = genTiles2Basis({ dims }).length;

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">dims [m, n]</span>
          <select value={dimIndex} onChange={(e) => setDimIndex(Number(e.target.value))}>
            {DIM_OPTIONS.map(([m, n], i) => (
              <option key={`${m}-${n}`} value={i}>
                [{m}, {n}]
              </option>
            ))}
          </select>
          <span className="control-value">
            {basisSize} basis vectors, {dims[0] * dims[1]}×{dims[0] * dims[1]}
          </span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="ρ =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
