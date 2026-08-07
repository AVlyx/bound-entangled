import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="n">
        Number of qubits. Must be a positive odd integer, at least 3.
      </Parameter>
      <Parameter paramName="z">
        Real parameter controlling the state's mixing. Must be a finite real number.
      </Parameter>
      <Parameter paramName="sigma">
        Sign parameter, either <span className="math">+1</span> or{" "}
        <span className="math">−1</span>; flips only the two off-diagonal corner entries.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
