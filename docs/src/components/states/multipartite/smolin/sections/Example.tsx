import { smolin } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const rho = smolin();

  return (
    <ExampleSection>
      <div className="example-output">
        <LatexMatrix value={rho} precision={2} label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
