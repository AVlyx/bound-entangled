import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="aParam">
        The free real parameter, in [0, 1]. The state is PPT for every value in this range, and
        separable only at the endpoints <span className="math-var">a</span> = 0 and{" "}
        <span className="math-var">a</span> = 1. Values outside [0, 1] are rejected.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
