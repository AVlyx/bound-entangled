import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The state is the weighted sum <span className="math">ρ = Σᵢ λᵢ |ψᵢ⟩⟨ψᵢ|</span> of four
        eigenvectors, written here in the product basis{" "}
        <span className="math">|ij⟩ = |i⟩ ⊗ |j⟩</span> of C³ ⊗ C³, with{" "}
        <span className="math">a = √(131/2)</span>:
      </p>
      <EquationBlock>
        <EquationLine>|ψ₁⟩ = (1/√2)(|00⟩ + |11⟩)</EquationLine>
        <EquationLine>|ψ₂⟩ = (a/12)(|01⟩ + |10⟩) + (1/60)|02⟩ − (3/10)|21⟩</EquationLine>
        <EquationLine>|ψ₃⟩ = (a/12)(|00⟩ − |11⟩) + (1/60)|12⟩ + (3/10)|20⟩</EquationLine>
        <EquationLine>|ψ₄⟩ = (1/√3)(−|01⟩ + |10⟩ + |22⟩)</EquationLine>
      </EquationBlock>
      <p>with eigenvalues</p>
      <EquationLine>λ = (3257/6884, 450/1721, 450/1721, 27/6884)</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
