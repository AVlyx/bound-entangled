import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The state lives on{" "}
        <span className="math">
          C<sup>2</sup> ⊗ C<sup>2</sup> ⊗ C<sup>d</sup> ⊗ C<sup>d</sup>
        </span>{" "}
        in ABA′B′ ordering: a two-qubit pair AB and a shield pair A′B′, each of dimension{" "}
        <span className="math-var">d</span>. Writing basis states as |
        <span className="math-var">i j k l</span>⟩ = |<span className="math-var">i</span>⟩
        <sub>A</sub> ⊗ |<span className="math-var">j</span>⟩<sub>B</sub> ⊗ |
        <span className="math-var">k</span>⟩<sub>A′</sub> ⊗ |<span className="math-var">l</span>⟩
        <sub>B′</sub>, the state mixes two branches with weights
      </p>
      <EquationBlock>
        <EquationLine>{"p_1 = \\tfrac{\\sqrt d}{1+\\sqrt d}"}</EquationLine>
        <EquationLine>{"p_2 = 1 - p_1"}</EquationLine>
      </EquationBlock>
      <p>
        The p<sub>1</sub> branch is supported on the |00, <span className="math-var">ij</span>⟩
        and |11, <span className="math-var">ij</span>⟩ basis states, with diagonal populations
        plus coherences weighted by the entries of the <span className="math-var">d</span> ×{" "}
        <span className="math-var">d</span> discrete Fourier matrix U (U<sub>ij</sub> = ω
        <sup>ij</sup>/√d, ω = e<sup>2πi/d</sup>):
      </p>
      <EquationLine>
        {"\\sum_{ij} \\tfrac{1}{2d^2}( |00,ij\\rangle\\langle00,ij| + |11,ij\\rangle\\langle11,ij| )" +
          " + \\tfrac{1}{2d\\sqrt d}( U_{ij} |00,ij\\rangle\\langle11,ji| + \\text{h.c.} )"}
      </EquationLine>
      <p>
        The p<sub>2</sub> branch is supported on |01, <span className="math-var">ii</span>⟩ and
        |10, <span className="math-var">ii</span>⟩, again a diagonal part plus Fourier-weighted
        coherences:
      </p>
      <EquationLine>
        {"\\sum_i \\tfrac{1}{2d}( |01,ii\\rangle\\langle01,ii| + |10,ii\\rangle\\langle10,ii| )" +
          " + \\sum_{ij} \\tfrac{1}{2d}( U_{ij} |01,ii\\rangle\\langle10,jj| + \\text{h.c.} )"}
      </EquationLine>
      <p className="doc-muted">
        ρ = p<sub>1</sub> · (p<sub>1</sub> branch, normalised) + p<sub>2</sub> · (p<sub>2</sub>{" "}
        branch, normalised). The construction above is naturally written in ABA′B′ ordering; the
        returned matrix is reordered to AA′BB′ before being handed back, so the physical Alice =
        (A, A′) | Bob = (B, B′) cut can be tested directly on it.
      </p>
      <p>
        The "private singlet" name follows the source, which frames the construction as a PPT
        singlet in the style of states studied for private key distillation from bound
        entanglement.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
