import { useState } from "react";
import { genTiles1 } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

/** The two smallest valid dimensions; d = 8 would already render a 64x64 matrix. */
const DIMENSIONS = [4, 6];

function Example() {
  const [d, setD] = useState(4);
  const basisSize = d * d - 2 * d + 1;
  const rho = genTiles1({ fullDim: d });

  return (
    <ExampleSection copyValue={rho}>
      <div className="controls">
        <div className="control">
          <span className="control-label">d</span>
          <select value={d} onChange={(e) => setD(Number(e.target.value))}>
            {DIMENSIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <span className="control-value">{basisSize} basis vectors</span>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
