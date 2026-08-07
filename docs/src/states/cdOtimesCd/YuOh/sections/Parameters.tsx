import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <>
      <ParametersSection>
        <Parameter paramName="fullDim">
          The local dimension <span className="math-var">d</span> shared by both parties. Must be
          an integer ≥ 3.
        </Parameter>
        <Parameter paramName="x">First free real parameter.</Parameter>
        <Parameter paramName="y">Second free real parameter.</Parameter>
      </ParametersSection>
      <p>
        (x, y) must jointly satisfy x² + y² ≤ 1 and δ = z²/(d − 2) − xy &gt; 0, where z = √(1 − x²
        − y²) — checked by isValidYuOhInput.
      </p>
    </>
  );
}

export default Parameters;
