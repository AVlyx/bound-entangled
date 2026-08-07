import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="a">The free real parameter, in [0, 1].</Parameter>
    </ParametersSection>
  );
}

export default Parameters;
