import DefinitionSection from "@/components/sectionComponents/Definition";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        In the product basis <span className="math">|i⟩⊗|j⟩</span>, with{" "}
        <span className="math-var">i</span>, <span className="math-var">j</span> ∈ {"{0, 1, 2}"},
        ordered as <span className="math">|00⟩, |01⟩, |02⟩, |10⟩, ..., |22⟩</span>, the 9×9
        Horodecki density matrix is
      </p>

      <LatexMatrix
        value={[
          ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
          [0, "a", 0, 0, 0, 0, 0, 0, 0],
          [0, 0, "a", 0, 0, 0, 0, 0, 0],
          [0, 0, 0, "a", 0, 0, 0, 0, 0],
          ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
          [0, 0, 0, 0, 0, "a", 0, 0, 0],
          [0, 0, 0, 0, 0, 0, "b", 0, "c"],
          [0, 0, 0, 0, 0, 0, 0, "a", 0],
          ["a", 0, 0, 0, "a", 0, "c", 0, "b"],
        ]}
        label="\rho(a) = \tfrac{1}{8a+1}\cdot"
      />
      <EquationBlock>
        <EquationLine>{"b = \\tfrac{1+a}{2}"}</EquationLine>
        <EquationLine>{"c = \\tfrac{\\sqrt{1-a^2}}{2}"}</EquationLine>
      </EquationBlock>
      <div className="callout callout-tip">
        <span className="callout-title">Off-diagonal coherences</span>
        <p>
          The <span className="math">|00⟩, |11⟩, |22⟩</span> coherences — the entries linking
          rows/columns 0, 4, and 8 above — are essential: without them the state would be
          separable. This implementation includes them (matching toqito's construction) even
          though some published presentations of the matrix omit them.
        </p>
      </div>
    </DefinitionSection>
  );
}

export default Definition;
