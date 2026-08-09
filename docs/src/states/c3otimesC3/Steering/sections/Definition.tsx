import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";
import Latex from "@/components/Equations/Latex";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The state is written in the product basis <span className="math">|ij⟩</span> of{" "}
        <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex>, in terms of two free parameters{" "}
        <span className="math-var">m1</span>, <span className="math-var">m2</span> and
      </p>
      <EquationBlock>
        <EquationLine>{"m3 = \\sqrt{\\tfrac{1 - m1^2 - m2^2}{2}}"}</EquationLine>
        <EquationLine>
          {"|\\psi_1\\rangle = \\tfrac{1}{\\sqrt2}(|12\\rangle + |21\\rangle)"}
        </EquationLine>
        <EquationLine>
          {"|\\psi_2\\rangle = \\tfrac{1}{\\sqrt3}(|00\\rangle + |11\\rangle - |22\\rangle)"}
        </EquationLine>
        <EquationLine>
          {"|\\psi_3\\rangle = m1|01\\rangle + m2|10\\rangle + m3|11\\rangle + m3|22\\rangle"}
        </EquationLine>
        <EquationLine>
          {
            "|\\tilde\\psi_3\\rangle = m1|02\\rangle - m2|20\\rangle + m3|21\\rangle - m3|12\\rangle"
          }
        </EquationLine>
      </EquationBlock>
      <p>combined as</p>
      <EquationLine>
        {
          "\\rho = \\lambda1 |\\psi_1\\rangle\\langle\\psi_1| + \\lambda2 |\\psi_2\\rangle\\langle\\psi_2| + \\lambda3 (|\\psi_3\\rangle\\langle\\psi_3| + |\\tilde\\psi_3\\rangle\\langle\\tilde\\psi_3|)"
        }
      </EquationLine>
      <p>
        with <span className="math">D = 4 − 2m1² + m1·m2 − 2m2²</span> and
      </p>
      <EquationLine>
        {
          "\\lambda1 = 1 - \\tfrac{2 + 3\\cdot m1\\cdot m2}{D},\\ \\lambda3 = \\tfrac1D,\\ \\lambda2 = 1 - \\lambda1 - 2\\lambda3"
        }
      </EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
