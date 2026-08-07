import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The permutationally symmetric Dicke states{" "}
        <span className="math">
          |D<sub>k</sub>
          <sup>n</sup>⟩
        </span>
        , <span className="math">k = 0, …, n</span>, index the computational basis by Hamming
        weight. The isometry <span className="math-var">V</span> maps the Dicke basis into the
        computational basis,
      </p>
      <EquationLine>
        {"V = \\sum_{i_1\\ldots i_n} \\binom{n}{\\nu}^{-1/2} |i_1\\ldots i_n\\rangle\\langle\\nu|"}
      </EquationLine>
      <p>
        with <span className="math">ν</span> the Hamming weight of the bit string{" "}
        <span className="math">i₁…iₙ</span>, and qubit <span className="math">k</span>{" "}
        contributing <span className="math">2ᵏ</span> to the row index.
      </p>
      <p>
        In the Dicke basis, the state is a diagonal part <span className="math-var">D(z)</span>{" "}
        plus a sign <span className="math-var">σ</span> placed in the two corners{" "}
        <span className="math">(0, n)</span> and <span className="math">(n, 0)</span>:
      </p>
      <EquationLine>
        {"D(z)_{kk} = \\binom{n}{k} \\cdot f_{K-k}(z),\\ K = \\lfloor n/2 \\rfloor"}
      </EquationLine>
      <p>
        where{" "}
        <span className="math">
          f<sub>k</sub>(z)
        </span>{" "}
        follows the recurrence{" "}
        <span className="math">
          f<sub>k+2</sub>(z) = (2 + z) f<sub>k+1</sub>(z) − f<sub>k</sub>(z)
        </span>
        , <span className="math">f₀ = 1</span>, <span className="math">f₁ = 1 + z</span>. The
        normalized Dicke-basis density matrix is
      </p>
      <EquationLine>
        {"\\rho_{\\text{Dicke}}(z,\\sigma) = \\tfrac{D(z) + O(\\sigma)}{2(4+z)^K}"}
      </EquationLine>
      <p>
        and the computational-basis state is the conjugation{" "}
        <span className="math">ρ = V ρ_Dicke Vᵀ</span>.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
