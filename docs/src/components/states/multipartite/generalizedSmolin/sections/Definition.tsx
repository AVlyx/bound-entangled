import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        For <span className="math">systems = 2n</span> qubits, the generalized Smolin (GSS) state
        is
      </p>
      <EquationLine>{"ρ = (I + (−1)ⁿ Σ_{i∈{X,Y,Z}} σᵢ^{⊗2n}) / 2^{2n}"}</EquationLine>
      <p>
        where{" "}
        <span className="math">
          σᵢ<sup>⊗2n</sup>
        </span>{" "}
        is the operator <span className="math">σᵢ</span> applied to every one of the{" "}
        <span className="math">2n</span> qubits. The sign alternates with the parity of{" "}
        <span className="math">n</span>.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
