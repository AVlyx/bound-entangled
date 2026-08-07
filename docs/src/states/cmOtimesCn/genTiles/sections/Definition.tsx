import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        For dimensions <span className="math-var">[m, n]</span>, the basis consists of three
        families of product vectors (DiVincenzo, Mor, Shor, Smolin, Terhal, Section V B, Eqs.
        5.9–5.11):
      </p>
      <EquationLine>
        {"|S_j\\rangle = \\tfrac{|j\\rangle - |j+1\\bmod m\\rangle}{\\sqrt2} \\otimes |j\\rangle,\\quad j = 0,\\ldots,m-1"}
      </EquationLine>
      <p className="equation-caption">m "short" tile states.</p>
      <EquationLine>
        {"|L_{jk}\\rangle = |j\\rangle \\otimes \\text{(normalized combination of }|j+i+1\\bmod m\\rangle" +
          "\\text{ and }|i+2\\rangle\\text{, weighted by roots of unity)}\\ \\omega^{ik},\\ \\omega = e^{2\\pi i/(n-2)}"}
      </EquationLine>
      <p className="equation-caption">
        m(n − 3) "long" tile states, <span className="math-var">j</span> = 0, …,{" "}
        <span className="math-var">m</span> − 1, <span className="math-var">k</span> = 1, …,{" "}
        <span className="math-var">n</span> − 3.
      </p>
      <EquationLine>{"|F\\rangle = \\tfrac{\\sum_{i,j} |i\\rangle \\otimes |j\\rangle}{\\sqrt{mn}}"}</EquationLine>
      <p className="equation-caption">one "stopper" state, for a total of mn − 2m + 1 vectors.</p>
      <p>
        Given the basis <span className="math-var">v</span>
        <sub>1</sub>, …, <span className="math-var">v</span>
        <sub>N</sub> (with <span className="math-var">N</span> = mn − 2m + 1), the state is the
        uniform mixture over the orthogonal complement of their span:
      </p>
      <EquationLine>{"\\rho = \\tfrac{I - \\sum_i |v_i\\rangle\\langle v_i|}{mn-N}"}</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
