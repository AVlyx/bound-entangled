import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="secondDimD">
        The second local dimension <span className="math-var">d</span> of C² ⊗ Cᵈ. Must be an
        integer ≥ 2; the full system has dimension 2d.
      </Parameter>
      <Parameter paramName="b">
        The free real parameter weighing the entangled component against the product state. Since
        φ_b needs √(1 − b) and √(1 + b) to stay real, b must lie in [−1, 1].
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
