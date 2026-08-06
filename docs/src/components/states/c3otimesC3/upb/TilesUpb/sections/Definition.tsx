import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        Writing {"{"}|0⟩, |1⟩, |2⟩{"}"} for the computational basis of ℂ³, the five vectors are:
      </p>
      <EquationBlock>
        <EquationLine>|ψ₀⟩ = |0⟩ ⊗ (|0⟩ − |1⟩)/√2</EquationLine>
        <EquationLine>|ψ₁⟩ = (|0⟩ − |1⟩) ⊗ |2⟩/√2</EquationLine>
        <EquationLine>|ψ₂⟩ = |2⟩ ⊗ (|1⟩ − |2⟩)/√2</EquationLine>
        <EquationLine>|ψ₃⟩ = (|1⟩ − |2⟩) ⊗ |0⟩/√2</EquationLine>
        <EquationLine>|ψ₄⟩ = (|0⟩ + |1⟩ + |2⟩) ⊗ (|0⟩ + |1⟩ + |2⟩)/3</EquationLine>
      </EquationBlock>
      <p>
        The five vectors are pairwise orthonormal, so they span a 5-dimensional subspace of the
        9-dimensional space ℂ³ ⊗ ℂ³, leaving a 4-dimensional orthogonal complement. The bound
        entangled state is the uniform mixture over that complement, built by the shared{" "}
        <span className="math-op">upb</span> construction:
      </p>
      <div className="equation-boxed">
        <EquationLine>ρ = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / (9 − 5) = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / 4</EquationLine>
      </div>
      <p className="equation-caption">
        each |ψᵢ⟩⟨ψᵢ| is a rank-1 product-state projector, so ρ inherits a positive partial
        transpose while having no product vector in its range.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
