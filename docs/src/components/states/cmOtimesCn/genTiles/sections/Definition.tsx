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
      <EquationLine>{"|S_j⟩ = (|j⟩ − |j+1 mod m⟩) / √2 ⊗ |j⟩,  j = 0, …, m − 1"}</EquationLine>
      <p className="equation-caption">m "short" tile states.</p>
      <EquationLine>
        {"|L_{jk}⟩ = |j⟩ ⊗ (normalized combination of |j+i+1 mod m⟩ and |i+2⟩," +
          " weighted by roots of unity ω^{ik}, ω = e^{2πi/(n−2)})"}
      </EquationLine>
      <p className="equation-caption">
        m(n − 3) "long" tile states, <span className="math-var">j</span> = 0, …,{" "}
        <span className="math-var">m</span> − 1, <span className="math-var">k</span> = 1, …,{" "}
        <span className="math-var">n</span> − 3.
      </p>
      <EquationLine>{"|F⟩ = (Σ_{i,j} |i⟩ ⊗ |j⟩) / √(mn)"}</EquationLine>
      <p className="equation-caption">one "stopper" state, for a total of mn − 2m + 1 vectors.</p>
      <p>
        Given the basis <span className="math-var">v</span>
        <sub>1</sub>, …, <span className="math-var">v</span>
        <sub>N</sub> (with <span className="math-var">N</span> = mn − 2m + 1), the state is the
        uniform mixture over the orthogonal complement of their span:
      </p>
      <EquationLine>{"ρ = (I − Σ_i |v_i⟩⟨v_i|) / (mn − N)"}</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
