import { useState } from "react";
import { steeringState } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [m1, setM1] = useState<number>(0.5);
  const [m2, setM2] = useState<number>(0.5);
  const valid = m1 ** 2 + m2 ** 2 <= 1;

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">m1</span>
          <Slider min={0} max={1} value={m1} setValue={setM1} />
          <span className="control-value">{m1.toFixed(2)}</span>
        </div>
        <div className="control">
          <span className="control-label">m2</span>
          <Slider min={0} max={1} value={m2} setValue={setM2} />
          <span className="control-value">{m2.toFixed(2)}</span>
        </div>
      </div>
      {valid ? (
        <div className="example-output">
          <LatexMatrix value={steeringState({ m1, m2 })} precision={2} label="ρ =" />
        </div>
      ) : (
        <div className="callout callout-warn">
          <span className="callout-title">Invalid parameters</span>
          <p>
            m1² + m2² must be at most 1; currently m1² + m2² = {(m1 ** 2 + m2 ** 2).toFixed(2)}.
            Lower m1 or m2.
          </p>
        </div>
      )}
    </ExampleSection>
  );
}

export default Example;
