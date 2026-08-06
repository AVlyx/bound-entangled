import { useState } from "react";
import { horodecki2ByDGeneralized } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

/** The few smallest valid second dimensions, keeping the rendered matrix small. */
const DIMENSIONS = [2, 3, 4, 5];

function Example() {
  const [d, setD] = useState(4);
  const [b, setB] = useState(0.5);
  const rho = horodecki2ByDGeneralized({ secondDimD: d, b });

  return (
    <ExampleSection>
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
        <div className="control">
          <span className="control-label">b</span>
          <Slider min={0} max={1} value={b} setValue={(e) => setB(e)} />
          <span className="control-value">{b.toFixed(2)}</span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
