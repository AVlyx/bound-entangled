import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="dims">
        The dimensions <span className="math-var">[m, n]</span> of the C<sup>m</sup> ⊗ C
        <sup>n</sup> system. Requires <span className="math-var">n</span> &gt; 3,{" "}
        <span className="math-var">m</span> ≥ 3, and <span className="math-var">n</span> ≥{" "}
        <span className="math-var">m</span>; note that m = n = 3 does not itself yield a UPB,
        which is why n &gt; 3 is required.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
