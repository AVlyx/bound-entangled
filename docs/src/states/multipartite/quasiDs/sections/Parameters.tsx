import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="n">
        Number of qubits. Must be an odd integer at least <span className="math">5</span>:
        Theorem 5.1 is stated for <span className="math">n = 2K + 1</span> with{" "}
        <span className="math">K &gt; 1</span>, and at <span className="math">n = 3</span> the
        construction still gives a valid PPT state but no longer an entangled one.
      </Parameter>
      <Parameter paramName="z">
        Real parameter controlling the state's mixing. Must lie in the open interval{" "}
        <span className="math">(0, ∞)</span>.
      </Parameter>
      <Parameter paramName="sigma">
        Sign parameter, either <span className="math">+1</span> or{" "}
        <span className="math">−1</span>; flips only the two off-diagonal corner entries.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
