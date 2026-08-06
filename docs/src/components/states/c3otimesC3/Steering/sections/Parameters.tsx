import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="m1">First free real parameter, with m1² + m2² ≤ 1.</Parameter>
      <Parameter paramName="m2">Second free real parameter, with m1² + m2² ≤ 1.</Parameter>
    </ParametersSection>
  );
}

export default Parameters;
