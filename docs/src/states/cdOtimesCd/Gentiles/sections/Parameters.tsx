import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="fullDim">
        The local dimension <span className="math-var">d</span> shared by both parties. Must be
        even and ≥ 4.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
