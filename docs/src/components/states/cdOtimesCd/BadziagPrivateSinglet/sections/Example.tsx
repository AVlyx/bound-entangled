import { useState } from "react";
import { badziagPrivateSinglet } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

/** Shield dimensions small enough to render as a matrix on this page. */
const SHIELD_DIMS = [2, 3] as const;

function Example() {
  const [shieldDim, setShieldDim] = useState<number>(2);
  const rho = badziagPrivateSinglet({ shieldDim });
  const totalDim = 2 * shieldDim;

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">d</span>
          <select value={shieldDim} onChange={(e) => setShieldDim(Number(e.target.value))}>
            {SHIELD_DIMS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <span className="control-value">
            {totalDim}×{totalDim} shield block
          </span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
