import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The construction uses the antisymmetric vectors ψ<sub>ij</sub> = |ij⟩ − |ji⟩, and a family
        of d unit vectors θ<sub>1</sub>, …, θ<sub>d</sub> in ℝᵈ built by induction on the
        dimension, which sum to the zero vector. From these, for k = 1, …, d − 1:
      </p>
      <EquationLine>
        {"φ_k = ((d − 1)^{3/2} / (d √(d − 2))) · Σ_p θ_p(k) |θ_p⟩ ⊗ |θ_p⟩"}
      </EquationLine>
      <p>
        φ<sub>k</sub> is symmetric under swapping the two factors. It combines with x and y into ψ
        <sub>k</sub> = x |0, k⟩ + y |k, 0⟩ + z · φ<sub>k</sub>, where z = √(1 − x² − y²). The full
        state is then
      </p>
      <EquationLine>
        {"ρ = (xy / R) |Φ_d⟩⟨Φ_d| + (δ / R) Σ_{1 ≤ j < i < d} |ψ_{ij}⟩⟨ψ_{ij}|" +
          " + (1 / R) Σ_{k=1}^{d − 1} |ψ_k⟩⟨ψ_k|"}
      </EquationLine>
      <p>
        with |Φ<sub>d</sub>⟩ = Σᵢ |ii⟩ the unnormalized maximally entangled ket, δ = z²/(d − 2) −
        xy, and R = d · xy + (d − 1)(d − 2)δ + d − 1.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
