import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        Each party (Alice with angles γ_A, θ_A, φ_A; Bob with γ_B, θ_B, φ_B) contributes five
        vectors in ℂ³, built from the same formula with N = √(cos²γ + sin²γ cos²θ):
      </p>
      <EquationBlock>
        <EquationLine>|v₀⟩ = |0⟩</EquationLine>
        <EquationLine>|v₁⟩ = |1⟩</EquationLine>
        <EquationLine>|v₂⟩ = cosθ |0⟩ + sinθ |2⟩</EquationLine>
        <EquationLine>{"|v₃⟩ = sinγ sinθ |0⟩ + cosγ e^{iφ} |1⟩ − sinγ cosθ |2⟩"}</EquationLine>
        <EquationLine>{"|v₄⟩ = (sinγ cosθ e^{iφ}/N) |1⟩ + (cosγ/N) |2⟩"}</EquationLine>
      </EquationBlock>
      <p>
        Alice's and Bob's vectors are then paired in a shifted order — |ψᵢ⟩ = |aᵢ⟩ ⊗ |b_σ(i)⟩ with
        σ = (1, 3, 0, 2, 4) — rather than index by index. This mismatch is what forces the
        resulting basis to be unextendible: every pair of the five |ψᵢ⟩ is orthogonal, either
        because Alice's factors are orthogonal or because Bob's are, covering all ten pairs (the
        orthogonality graph is the same for every UPB on ℂ³ ⊗ ℂ³). As for the Tiles and Pyramid
        UPBs, the bound entangled state is the uniform mixture over the 4-dimensional orthogonal
        complement of the five |ψᵢ⟩:
      </p>
      <div className="equation-boxed">
        <EquationLine>ρ = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / (9 − 5) = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / 4</EquationLine>
      </div>
      <p>
        At φ_A = φ_B = 0 and θ_A = θ_B = γ_A = γ_B = arccos((√5 − 1)/2) this reduces to the
        Pyramid UPB; at φ_A = φ_B = 0 and θ_A = θ_B = γ_A = γ_B = 3π/4 it reduces to the Tiles
        UPB.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
