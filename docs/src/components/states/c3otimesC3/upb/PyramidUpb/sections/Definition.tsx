import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        For j = 0, …, 4 and h = ½√(1 + √5), Alice's and Bob's local vectors sit at two interleaved
        sets of vertices of a regular pentagon, lifted to height h and normalised:
      </p>
      <EquationBlock>
        <EquationLine>|a_j⟩ ∝ (cos(2πj/5), sin(2πj/5), h)</EquationLine>
        <EquationLine>|b_j⟩ ∝ (cos(4πj/5), sin(4πj/5), h)</EquationLine>
      </EquationBlock>
      <p>
        The j-th vector of the basis is the product state |ψ_j⟩ = |a_j⟩ ⊗ |b_j⟩. The five vectors
        are pairwise orthonormal, spanning a 5-dimensional subspace of the 9-dimensional space ℂ³
        ⊗ ℂ³ and leaving a 4-dimensional orthogonal complement. As for every UPB in this library,
        the bound entangled state is the uniform mixture over that complement, via the shared{" "}
        <span className="math-op">upb</span> construction:
      </p>
      <div className="equation-boxed">
        <EquationLine>ρ = (I − Σⱼ |ψ_j⟩⟨ψ_j|) / (9 − 5) = (I − Σⱼ |ψ_j⟩⟨ψ_j|) / 4</EquationLine>
      </div>
      <p className="equation-caption">
        each |ψ_j⟩⟨ψ_j| is a rank-1 product-state projector, so ρ inherits a positive partial
        transpose while having no product vector in its range.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
