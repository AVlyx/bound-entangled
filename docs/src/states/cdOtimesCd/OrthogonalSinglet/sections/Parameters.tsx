import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="shieldDim">
        The shield subsystem dimension <span className="math-var">d</span>. Must be 3 or a power
        of two, so the total local dimension 2<span className="math-var">d</span> is one of 4, 6,
        8, 16, … Other values throw.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
