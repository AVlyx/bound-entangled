import { useState } from "react";
import { generalizedSmolin } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [n, setN] = useState<number>(2);
  const systems = n * 2;
  const rho = generalizedSmolin({ systems });

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">n</span>
          <select value={n} onChange={(e) => setN(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          <span className="control-value">systems = {systems}</span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="ρ =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
