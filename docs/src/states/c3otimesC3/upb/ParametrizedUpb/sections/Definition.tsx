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
        <EquationLine>{"|v_0\\rangle = |0\\rangle"}</EquationLine>
        <EquationLine>{"|v_1\\rangle = |1\\rangle"}</EquationLine>
        <EquationLine>{"|v_2\\rangle = \\cos\\theta\\,|0\\rangle + \\sin\\theta\\,|2\\rangle"}</EquationLine>
        <EquationLine>
          {"|v_3\\rangle = \\sin\\gamma\\sin\\theta\\,|0\\rangle + \\cos\\gamma\\,e^{i\\varphi}\\,|1\\rangle - \\sin\\gamma\\cos\\theta\\,|2\\rangle"}
        </EquationLine>
        <EquationLine>
          {"|v_4\\rangle = \\left(\\tfrac{\\sin\\gamma\\cos\\theta\\,e^{i\\varphi}}{N}\\right)|1\\rangle + \\left(\\tfrac{\\cos\\gamma}{N}\\right)|2\\rangle"}
        </EquationLine>
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
        <EquationLine>
          {"\\rho = \\tfrac{I - \\sum_i |\\psi_i\\rangle\\langle\\psi_i|}{9-5} = \\tfrac{I - \\sum_i |\\psi_i\\rangle\\langle\\psi_i|}{4}"}
        </EquationLine>
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
