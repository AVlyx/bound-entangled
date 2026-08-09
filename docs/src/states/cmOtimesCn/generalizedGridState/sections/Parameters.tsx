import Latex from "@/components/Equations/Latex";
import ParametersSection from "@/components/sectionComponents/Parameters";
import Parameter from "@/components/sectionComponents/Parameters/Parameter";

function Parameters() {
  return (
    <ParametersSection>
      <Parameter paramName="dims">
        The grid dimensions <span className="math-var">[m, n]</span>; the state lives on{" "}
        <Latex>{`\\mathbb{C}^m \\otimes \\mathbb{C}^n`}</Latex>
      </Parameter>
      <Parameter paramName="hyperedges">
        A non-empty array of <code>Hyperedge</code>. Each <code>Hyperedge</code> is a non-empty
        array of <code>Vertex</code>, and each <code>Vertex</code> is a pair{" "}
        <span className="math-var">[i, j]</span> with 0 ≤ <span className="math-var">i</span> &lt;{" "}
        <span className="math-var">m</span> and 0 ≤ <span className="math-var">j</span> &lt;{" "}
        <span className="math-var">n</span>. An empty hyperedge set, or a hyperedge spanning zero
        vertices, is rejected.
      </Parameter>
    </ParametersSection>
  );
}

export default Parameters;
