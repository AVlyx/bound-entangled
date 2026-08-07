import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="shieldDim">
        The shield subsystem dimension <span className="math-var">d</span>, an integer ≥ 2. The
        full state lives on{" "}
        <span className="math">
          C<sup>2</sup> ⊗ C<sup>2</sup> ⊗ C<sup>d</sup> ⊗ C<sup>d</sup>
        </span>
        , i.e. a (4d²) × (4d²) density matrix. Values below 2, or non-integers, throw.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
