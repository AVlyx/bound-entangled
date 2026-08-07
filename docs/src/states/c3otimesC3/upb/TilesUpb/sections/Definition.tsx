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
        <EquationLine>{"|\\psi_0\\rangle = |0\\rangle \\otimes (|0\\rangle - |1\\rangle)/\\sqrt2"}</EquationLine>
        <EquationLine>{"|\\psi_1\\rangle = (|0\\rangle - |1\\rangle) \\otimes |2\\rangle/\\sqrt2"}</EquationLine>
        <EquationLine>{"|\\psi_2\\rangle = |2\\rangle \\otimes (|1\\rangle - |2\\rangle)/\\sqrt2"}</EquationLine>
        <EquationLine>{"|\\psi_3\\rangle = (|1\\rangle - |2\\rangle) \\otimes |0\\rangle/\\sqrt2"}</EquationLine>
        <EquationLine>
          {"|\\psi_4\\rangle = (|0\\rangle + |1\\rangle + |2\\rangle) \\otimes (|0\\rangle + |1\\rangle + |2\\rangle)/3"}
        </EquationLine>
      </EquationBlock>
      <p>
        The five vectors are pairwise orthonormal, so they span a 5-dimensional subspace of the
        9-dimensional space ℂ³ ⊗ ℂ³, leaving a 4-dimensional orthogonal complement. The bound
        entangled state is the uniform mixture over that complement, built by the shared{" "}
        <span className="math-op">upb</span> construction:
      </p>
      <div className="equation-boxed">
        <EquationLine>
          {"\\rho = \\tfrac{I - \\sum_i |\\psi_i\\rangle\\langle\\psi_i|}{9-5} = \\tfrac{I - \\sum_i |\\psi_i\\rangle\\langle\\psi_i|}{4}"}
        </EquationLine>
      </div>
      <p className="equation-caption">
        each |ψᵢ⟩⟨ψᵢ| is a rank-1 product-state projector, so ρ inherits a positive partial
        transpose while having no product vector in its range.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
