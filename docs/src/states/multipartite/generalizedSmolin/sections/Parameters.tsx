import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="systems">
        Total number of qubits, <span className="math">2n</span>. Must be an even integer{" "}
        <span className="math">≥ 2</span>.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
