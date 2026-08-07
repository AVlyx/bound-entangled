import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="gammaA">
        Alice's γ angle. Any real value with cos γ_A ≠ 0 and sin γ_A ≠ 0 — multiples of π/2 are
        excluded.
      </Parameter>
      <Parameter paramName="thetaA">
        Alice's θ angle. Any real value with cos θ_A ≠ 0 and sin θ_A ≠ 0, the same restriction as
        gammaA.
      </Parameter>
      <Parameter paramName="phiA">
        Alice's phase angle, entering as e^(iφ_A). Unrestricted.
      </Parameter>
      <Parameter paramName="gammaB">
        Bob's γ angle, subject to the same restriction as gammaA.
      </Parameter>
      <Parameter paramName="thetaB">
        Bob's θ angle, subject to the same restriction as thetaA.
      </Parameter>
      <Parameter paramName="phiB">
        Bob's phase angle, entering as e^(iφ_B). Unrestricted.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
