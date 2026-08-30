import { useState } from "react";
import { quasiDs } from "bound-entangled";
import type { QuasiDsSign } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [z, setZ] = useState<number>(1);
  const [sigma, setSigma] = useState<QuasiDsSign>(1);

  // n = 5 is the smallest valid size (n = 2K + 1 with K > 1); n = 7 would be a
  // 128 x 128 matrix, too large to render here.
  const n = 5;
  const rho = quasiDs({ n, z, sigma });

  return (
    <ExampleSection copyValue={rho}>
      <div className="controls">
        <div className="control">
          <span className="control-label">n</span>
          <span className="control-value">{n}</span>
        </div>
        <div className="control">
          <span className="control-label">z</span>
          <Slider min={0.05} max={1} value={z} setValue={setZ} />
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
        Shown at <span className="math">n = 5</span>, the smallest number of qubits for which
        Theorem 5.1 applies. <span className="math">z</span> is restricted to{" "}
        <span className="math">[0.05, 1]</span> here for a well-behaved demo; the factory
        accepts any <span className="math">z &gt; 0</span>.
      </p>
    </ExampleSection>
  );
}

export default Example;
