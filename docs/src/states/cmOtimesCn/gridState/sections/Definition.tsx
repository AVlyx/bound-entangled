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
      <EquationLine>{"|e\\rangle = \\tfrac{|i,j\\rangle - |k,l\\rangle}{\\sqrt2}"}</EquationLine>
      <p>
        The grid state is the uniform mixture over a chosen edge set{" "}
        <span className="math-var">E</span>:
      </p>
      <EquationLine>{"\\rho = \\tfrac{1}{|E|} \\sum_{e \\in E} |e\\rangle\\langle e|"}</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
