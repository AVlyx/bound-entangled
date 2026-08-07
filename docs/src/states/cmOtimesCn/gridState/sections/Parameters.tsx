import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="dims">
        The grid dimensions <span className="math-var">[m, n]</span>; the state lives on C
        <sup>m</sup> ⊗ C<sup>n</sup>.
      </Parameter>
      <Parameter paramName="edges">
        A non-empty array of <code>Edge</code>s. Each <code>Edge</code> is a pair of{" "}
        <code>Vertex</code>, and each <code>Vertex</code> is a pair{" "}
        <span className="math-var">[i, j]</span> with 0 ≤ <span className="math-var">i</span> &lt;{" "}
        <span className="math-var">m</span> and 0 ≤ <span className="math-var">j</span> &lt;{" "}
        <span className="math-var">n</span>. An empty edge set is rejected.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
