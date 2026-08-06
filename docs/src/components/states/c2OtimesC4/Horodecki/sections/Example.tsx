import { useState } from "react";
import { horodecki2By4 } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import CopyButton from "@/components/CopyButton";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [aParam, setAParam] = useState<number>(0.4);
  const mat = horodecki2By4({ aParam });

  return (
    <ExampleSection>
      {/* <CopyButton /> */}
      <div className="controls">
        <span className="control-label">a</span>
        <Slider min={0} max={1} value={aParam} setValue={setAParam} />
        <span className="control-value">{aParam.toFixed(2)}</span>
      </div>
      <div className="example-output">
        <LatexMatrix value={mat} precision={3} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
