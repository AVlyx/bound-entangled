import { ncomms6297 } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const rho = ncomms6297();

  return (
    <ExampleSection title="The state" copyValue={rho}>
      <div className="example-output">
        <LatexMatrix value={rho} precision={3} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
