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
        <EquationLine>{"|\\psi_1\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)"}</EquationLine>
        <EquationLine>
          {"|\\psi_2\\rangle = \\tfrac{a}{12}(|01\\rangle + |10\\rangle) + \\tfrac{1}{60}|02\\rangle - \\tfrac{3}{10}|21\\rangle"}
        </EquationLine>
        <EquationLine>
          {"|\\psi_3\\rangle = \\tfrac{a}{12}(|00\\rangle - |11\\rangle) + \\tfrac{1}{60}|12\\rangle + \\tfrac{3}{10}|20\\rangle"}
        </EquationLine>
        <EquationLine>
          {"|\\psi_4\\rangle = \\tfrac{1}{\\sqrt3}(-|01\\rangle + |10\\rangle + |22\\rangle)"}
        </EquationLine>
      </EquationBlock>
      <p>with eigenvalues</p>
      <EquationLine>
        {"\\lambda = (3257/6884,\\ 450/1721,\\ 450/1721,\\ 27/6884)"}
      </EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
