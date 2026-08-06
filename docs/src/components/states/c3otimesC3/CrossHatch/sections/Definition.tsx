import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        A grid state is built from a graph whose vertices are the product basis states{" "}
        <span className="math">|i⟩ ⊗ |j⟩</span> of{" "}
        <span className="math">
          <span className="math-var">C</span>ᵐ ⊗ <span className="math-var">C</span>ⁿ
        </span>{" "}
        and whose edges pair up vertices. An edge joining <span className="math">(i, j)</span> and{" "}
        <span className="math">(k, l)</span> carries the pure state
      </p>
      <EquationLine>{"|e\\rangle = (|ij\\rangle - |kl\\rangle) / \\sqrt{2}"}</EquationLine>
      <p>and the grid state is the uniform mixture of the states carried by every edge:</p>
      <EquationLine>{"\\rho = (1/|E|) \\sum_e |e\\rangle\\langle e|"}</EquationLine>
      <p>The cross-hatch state is this construction on the 3×3 grid, with the four edges</p>
      <EquationLine>
        {"\\{(0,0), (1,2)\\},\\ \\{(1,0), (2,2)\\},\\ \\{(0,1), (2,0)\\},\\ \\{(0,2), (2,1)\\}"}
      </EquationLine>
      <span className="equation-caption">
        Every vertex used is distinct, so the four edge states are mutually orthogonal.
      </span>
    </DefinitionSection>
  );
}

export default Definition;
