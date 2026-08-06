import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The inseparable part mixes the <span className="math-var">d</span> − 1 vectors |ψᵢ⟩ = (|0,
        i⟩ + |1, i + 1⟩) / √2, for i = 0, …, d − 2, with the corner state |1, 0⟩:
      </p>
      <EquationLine>
        {"ρ_{insep} = 2/(2d − 1) · Σᵢ |ψᵢ⟩⟨ψᵢ| + 1/(2d − 1) · |1, 0⟩⟨1, 0|"}
      </EquationLine>
      <p>
        The separable part is a single product vector: a qubit fixed in the |0⟩ direction tensored
        with a two-level superposition on the shield system,
      </p>
      <EquationLine>|φ_b⟩ = (1/√2) |0⟩ ⊗ (√(1 − b) |0⟩ + √(1 + b) |d − 1⟩)</EquationLine>
      <p>and the full state is the weighted mixture</p>
      <EquationLine>
        {"ρ = [(2d − 1) b · ρ_{insep} + |φ_b⟩⟨φ_b|] / [(2d − 1) b + 1]"}
      </EquationLine>
      <p>
        For d = 4 this reduces to the original C² ⊗ C⁴ Horodecki state (see{" "}
        <span className="math-op">horodecki2By4</span>), up to an anti-diagonal transpose.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
