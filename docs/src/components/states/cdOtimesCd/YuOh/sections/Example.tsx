import { useState } from "react";
import { isValidYuOhInput, yuOh } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

/** The three smallest valid local dimensions. */
const DIMENSIONS = [3, 4, 5];

function Example() {
  const [d, setD] = useState(3);
  const [x, setX] = useState(0.5);
  const [y, setY] = useState(0.1);
  const options = { fullDim: d, x, y };
  const valid = isValidYuOhInput(options);

  const sumSq = x ** 2 + y ** 2;
  const z = sumSq <= 1 ? Math.sqrt(1 - sumSq) : NaN;
  const delta = sumSq <= 1 ? z ** 2 / (d - 2) - x * y : NaN;

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
          <span className="control-label">x</span>
          <Slider min={0} max={1} value={x} setValue={(e) => setX(e)} />
          <span className="control-value">{x.toFixed(2)}</span>
        </div>
        <div className="control">
          <span className="control-label">y</span>
          <Slider min={0} max={1} value={y} setValue={(e) => setY(e)} />
          <span className="control-value">{y.toFixed(2)}</span>
        </div>
      </div>
      {valid ? (
        <div className="example-output">
          <LatexMatrix value={yuOh(options)} precision={2} label="\rho =" />
        </div>
      ) : (
        <div className="callout callout-warn">
          <span className="callout-title">Outside the valid domain</span>
          <p>
            {sumSq > 1 ? (
              <>x² + y² = {sumSq.toFixed(2)}, which exceeds 1.</>
            ) : (
              <>
                x² + y² = {sumSq.toFixed(2)} ≤ 1, but δ = {delta.toFixed(3)} is not positive.
              </>
            )}{" "}
            yuOh requires x² + y² ≤ 1 and δ = z²/(d − 2) − xy &gt; 0. Lower x or y to bring the
            state back into the valid domain.
          </p>
        </div>
      )}
    </ExampleSection>
  );
}

export default Example;
