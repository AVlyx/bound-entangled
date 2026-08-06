import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        A vertex is a pair <span className="math-var">[i, j]</span>, identified with the basis
        state |<span className="math-var">i</span>, <span className="math-var">j</span>⟩. An edge
        joins two vertices and carries the normalized difference of their basis states:
      </p>
      <EquationLine>|e⟩ = (|i, j⟩ − |k, l⟩) / √2</EquationLine>
      <p>
        The grid state is the uniform mixture over a chosen edge set{" "}
        <span className="math-var">E</span>:
      </p>
      <EquationLine>{"ρ = (1 / |E|) Σ_{e ∈ E} |e⟩⟨e|"}</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
