import { sn3GridState } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";

function Example() {
  const rho = sn3GridState();

  return (
    <ExampleSection copyValue={rho}>
      <p className="equation-caption">
        The full state ρ = sn3GridState(), the trace-normalized sum of |c⟩⟨c| over all 13 hyperedges
        above:
      </p>
      <div className="scroll-x">
        <LatexMatrix value={rho} precision={2} dimZeros label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
