import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationBlock from "@/components/Equations/EquationBlock";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        As with the private singlet, the state lives on{" "}
        <span className="math">
          C<sup>2</sup> ⊗ C<sup>2</sup> ⊗ C<sup>d</sup> ⊗ C<sup>d</sup>
        </span>{" "}
        in ABA′B′ ordering (two-qubit pair AB, shield pair A′B′) and mixes two branches with
        weights
      </p>
      <EquationBlock>
        <EquationLine>{"p_1 = \\tfrac{\\sqrt d}{1+\\sqrt d}"}</EquationLine>
        <EquationLine>{"p_2 = 1 - p_1"}</EquationLine>
      </EquationBlock>
      <p>
        The construction uses a family of <span className="math-var">d</span> real orthogonal{" "}
        <span className="math-var">d</span> × <span className="math-var">d</span> matrices Q
        <sup>k</sup> (Appendix G of the source):
      </p>
      <EquationLine>
        {"\\rho = \\tfrac{p_1}{d^2} \\sum_{ij} |z_{ij}\\rangle\\langle z_{ij}| + \\tfrac{p_2}{2d} \\sum_k |01\\rangle\\langle01|_{AB} \\otimes |s_k\\rangle\\langle s_k|_{A'B'}" +
          " + \\tfrac{p_2}{2d} \\sum_i |10,ii\\rangle\\langle10,ii|"}
      </EquationLine>
      <p>
        where |z<sub>ij</sub>⟩ = (1/√2)( |00, ij⟩ + Σ<sub>k</sub> Q<sup>j</sup>
        <sub>ik</sub> |11, jk⟩ ), and the |s<sub>k</sub>⟩ live on the shield pair A′B′. For{" "}
        <span className="math-var">d</span> = 3 the Q<sup>k</sup> are rotations by φ = 2π(k+1)/3
        in the first two coordinates,
      </p>
      <EquationLine>
        {"Q^k = \\begin{bmatrix} \\cos\\varphi & \\sin\\varphi & 0 \\\\ \\sin\\varphi & -\\cos\\varphi & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}"}
      </EquationLine>
      <p>
        and the |s<sub>k</sub>⟩ are hard-coded as |s<sub>0</sub>⟩ = (|00⟩ + |11⟩)/√2, |s
        <sub>1</sub>⟩ = (|01⟩ − |10⟩)/√2, |s<sub>2</sub>⟩ = |22⟩. For{" "}
        <span className="math-var">d</span> = 2<sup>n</sup> a power of two, Q<sup>k</sup> is the{" "}
        <span className="math-var">n</span>-fold tensor product of the Pauli X and the identity,
        one factor per bit of <span className="math-var">k</span>, and |s<sub>k</sub>⟩ = (1/√d) Σ
        <sub>ij</sub> Q<sup>k</sup>
        <sub>ij</sub> |ij⟩ directly.
      </p>
      <p className="doc-muted">
        The returned matrix is in ABA′B′ ordering; testing the physical Alice = (A, A′) | Bob =
        (B, B′) cut requires permuting the systems to AA′BB′ first.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
