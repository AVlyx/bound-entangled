import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The state is written in the product basis <span className="math">|ij⟩</span> of C³ ⊗ C³,
        in terms of two free parameters <span className="math-var">m1</span>,{" "}
        <span className="math-var">m2</span> and
      </p>
      <EquationBlock>
        <EquationLine>m3 = √((1 − m1² − m2²) / 2)</EquationLine>
        <EquationLine>|ψ₁⟩ = (1/√2)(|12⟩ + |21⟩)</EquationLine>
        <EquationLine>|ψ₂⟩ = (1/√3)(|00⟩ + |11⟩ − |22⟩)</EquationLine>
        <EquationLine>|ψ₃⟩ = m1|01⟩ + m2|10⟩ + m3|11⟩ + m3|22⟩</EquationLine>
        <EquationLine>|ψ̃₃⟩ = m1|02⟩ − m2|20⟩ + m3|21⟩ − m3|12⟩</EquationLine>
      </EquationBlock>
      <p>combined as</p>
      <EquationLine>ρ = λ1 |ψ₁⟩⟨ψ₁| + λ2 |ψ₂⟩⟨ψ₂| + λ3 (|ψ₃⟩⟨ψ₃| + |ψ̃₃⟩⟨ψ̃₃|)</EquationLine>
      <p>
        with <span className="math">D = 4 − 2m1² + m1·m2 − 2m2²</span> and
      </p>
      <EquationLine>λ1 = 1 − (2 + 3·m1·m2) / D, λ3 = 1 / D, λ2 = 1 − λ1 − 2λ3</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
