import { useState } from "react";
import { quasiDs } from "bound-entangled";
import type { QuasiDsSign } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [n, setN] = useState<number>(3);
  const [z, setZ] = useState<number>(1);
  const [sigma, setSigma] = useState<QuasiDsSign>(1);

  const rho = quasiDs({ n, z, sigma });

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">n</span>
          <select value={n} onChange={(e) => setN(Number(e.target.value))}>
            <option value={3}>3</option>
            <option value={5}>5</option>
          </select>
          <span className="control-value">{n}</span>
        </div>
        <div className="control">
          <span className="control-label">z</span>
          <Slider min={0} max={1} value={z} setValue={setZ} />
          <span className="control-value">{z.toFixed(2)}</span>
        </div>
        <div className="control">
          <span className="control-label">σ</span>
          <select
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value) as QuasiDsSign)}
          >
            <option value={1}>+1</option>
            <option value={-1}>−1</option>
          </select>
          <span className="control-value">{sigma > 0 ? "+1" : "−1"}</span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
      <p className="figure-caption">
        <span className="math">z</span> is restricted to <span className="math">[0, 1]</span> here
        for a well-behaved demo; the factory accepts any finite real value.
      </p>
    </ExampleSection>
  );
}

export default Example;
