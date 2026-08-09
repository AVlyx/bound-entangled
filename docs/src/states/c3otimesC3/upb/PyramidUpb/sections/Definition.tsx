import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";
import Latex from "@/components/Equations/Latex";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        For j = 0, …, 4 and h = ½√(1 + √5), Alice's and Bob's local vectors sit at two interleaved
        sets of vertices of a regular pentagon, lifted to height h and normalised:
      </p>
      <EquationBlock>
        <EquationLine>
          {"|a_j\\rangle \\propto (\\cos(2\\pi j/5), \\sin(2\\pi j/5), h)"}
        </EquationLine>
        <EquationLine>
          {"|b_j\\rangle \\propto (\\cos(4\\pi j/5), \\sin(4\\pi j/5), h)"}
        </EquationLine>
      </EquationBlock>
      <p>
        The j-th vector of the basis is the product state |ψ_j⟩ = |a_j⟩ ⊗ |b_j⟩. The five vectors
        are pairwise orthonormal, spanning a 5-dimensional subspace of the 9-dimensional space{" "}
        <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex> and leaving a 4-dimensional
        orthogonal complement. As for every UPB in this library, the bound entangled state is the
        uniform mixture over that complement, via the shared <span className="math-op">upb</span>{" "}
        construction:
      </p>
      <div className="equation-boxed">
        <EquationLine>
          {
            "\\rho = \\tfrac{I - \\sum_j |\\psi_j\\rangle\\langle\\psi_j|}{9-5} = \\tfrac{I - \\sum_j |\\psi_j\\rangle\\langle\\psi_j|}{4}"
          }
        </EquationLine>
      </div>
      <p className="equation-caption">
        each |ψ_j⟩⟨ψ_j| is a rank-1 product-state projector, so ρ inherits a positive partial
        transpose while having no product vector in its range.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
