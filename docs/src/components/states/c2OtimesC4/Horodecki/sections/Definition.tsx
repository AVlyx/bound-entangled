import DefinitionSection from "@/components/sectionComponents/Definition";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        In the product basis <span className="math">|i⟩⊗|j⟩</span>, with{" "}
        <span className="math-var">i</span> ∈ {"{0, 1}"} and <span className="math-var">j</span> ∈{" "}
        {"{0, 1, 2, 3}"}, ordered as{" "}
        <span className="math">|00⟩, |01⟩, |02⟩, |03⟩, |10⟩, |11⟩, |12⟩, |13⟩</span>, the 8×8
        Horodecki density matrix is
      </p>
      <LatexMatrix
        value={[
          ["a", 0, 0, 0, 0, "a", 0, 0],
          [0, "a", 0, 0, 0, 0, "a", 0],
          [0, 0, "a", 0, 0, 0, 0, "a"],
          [0, 0, 0, "a", 0, 0, 0, 0],
          [0, 0, 0, 0, "b", 0, 0, "c"],
          ["a", 0, 0, 0, 0, "a", 0, 0],
          [0, "a", 0, 0, 0, 0, "a", 0],
          [0, 0, "a", 0, "c", 0, 0, "b"],
        ]}
        label="ρ(a) = 1/(7a + 1) ·"
      />
      <p className="equation-caption">
        with <span className="math-var">b</span>, <span className="math-var">c</span> defined
        below.
      </p>
      <EquationBlock>
        <EquationLine>b = (1 + a) / 2</EquationLine>
        <EquationLine>c = √(1 − a²) / 2</EquationLine>
      </EquationBlock>
    </DefinitionSection>
  );
}

export default Definition;
