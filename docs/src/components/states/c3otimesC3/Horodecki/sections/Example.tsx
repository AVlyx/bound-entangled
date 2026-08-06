import { useState } from "react";
import { horodecki3By3 } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Slider from "@/components/Slider";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const [aParam, setAParam] = useState<number>(0.4);

  return (
    <ExampleSection>
      <div className="controls">
        <div className="control">
          <span className="control-label">a</span>
          <Slider min={0} max={1} value={aParam} setValue={setAParam} />
          <span className="control-value">{aParam.toFixed(2)}</span>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={horodecki3By3({ aParam })} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
