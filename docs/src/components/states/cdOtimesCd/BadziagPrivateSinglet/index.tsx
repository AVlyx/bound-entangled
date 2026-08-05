/**
 * Documentation page for the Badziag private singlet. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { badziagPrivateSinglet } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationBlock from "../../../Equations/EquationBlock";
import EquationLine from "../../../Equations/EquationLine";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/** Shield dimensions small enough to render as a matrix on this page. */
const SHIELD_DIMS = [2, 3] as const;

function BadziagPrivateSinglet() {
  const [shieldDim, setShieldDim] = useState<number>(2);
  const rho = badziagPrivateSinglet({ shieldDim });
  const totalDim = 2 * shieldDim;

  return (
    <>
      <p>
        The Bądziąg et al. private singlet is a bound-entangled density matrix on{" "}
        <span className="math">
          C<sup>2d</sup> ⊗ C<sup>2d</sup>
        </span>
        , built by mixing a two-qubit block with a "shield" pair of local dimension{" "}
        <span className="math-var">d</span>. It is presented as ρ<sub>F1</sub> in Phys. Rev.
        Research 3, 023101 (2021), and is bound entangled for every shield dimension{" "}
        <span className="math-var">d</span> ≥ 2.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
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
          <EquationLine>p_1 = √d / (1 + √d)</EquationLine>
          <EquationLine>p_2 = 1 − p_1</EquationLine>
        </EquationBlock>
        <p>
          The p<sub>1</sub> branch is supported on the |00, <span className="math-var">ij</span>⟩
          and |11, <span className="math-var">ij</span>⟩ basis states, with diagonal populations
          plus coherences weighted by the entries of the <span className="math-var">d</span> ×{" "}
          <span className="math-var">d</span> discrete Fourier matrix U (U<sub>ij</sub> = ω
          <sup>ij</sup>/√d, ω = e<sup>2πi/d</sup>):
        </p>
        <EquationLine>
          {"Σ_{ij} (1/2d²)( |00, ij⟩⟨00, ij| + |11, ij⟩⟨11, ij| )" +
            " + (1/2d√d)( U_{ij} |00, ij⟩⟨11, ji| + h.c. )"}
        </EquationLine>
        <p>
          The p<sub>2</sub> branch is supported on |01, <span className="math-var">ii</span>⟩ and
          |10, <span className="math-var">ii</span>⟩, again a diagonal part plus Fourier-weighted
          coherences:
        </p>
        <EquationLine>
          {"Σ_i (1/2d)( |01, ii⟩⟨01, ii| + |10, ii⟩⟨10, ii| )" +
            " + Σ_{ij} (1/2d)( U_{ij} |01, ii⟩⟨10, jj| + h.c. )"}
        </EquationLine>
        <p className="doc-muted">
          ρ = p<sub>1</sub> · (p<sub>1</sub> branch, normalised) + p<sub>2</sub> · (p<sub>2</sub>{" "}
          branch, normalised). The returned matrix is in ABA′B′ ordering; testing the physical Alice
          = (A, A′) | Bob = (B, B′) cut requires permuting the systems to AA′BB′ first.
        </p>
        <p>
          The "private singlet" name follows the source, which frames the construction as a PPT
          singlet in the style of states studied for private key distillation from bound
          entanglement.
        </p>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>shieldDim</dt>
          <dd>
            The shield subsystem dimension <span className="math-var">d</span>, an integer ≥ 2. The
            full state lives on{" "}
            <span className="math">
              C<sup>2</sup> ⊗ C<sup>2</sup> ⊗ C<sup>d</sup> ⊗ C<sup>d</sup>
            </span>
            , i.e. a (4d²) × (4d²) density matrix. Values below 2, or non-integers, throw.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.cd_otimes_cd import badziag_private_singlet

rho = badziag_private_singlet(shield_dim=2)
# rho is a 16 x 16 density matrix on C^2 ⊗ C^2 ⊗ C^2 ⊗ C^2`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">d</span>
              <select value={shieldDim} onChange={(e) => setShieldDim(Number(e.target.value))}>
                {SHIELD_DIMS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <span className="control-value">
                {totalDim}×{totalDim} shield block
              </span>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>
            Square density matrix of size (4d²) × (4d²): Hermitian, trace one, positive
            semidefinite.
          </li>
          <li>
            Bound entangled across the Alice = (A, A′) | Bob = (B, B′) cut: positive semidefinite
            with a positive partial transpose (PPT) after permuting ABA′B′ → AA′BB′.
          </li>
        </ul>
        <div className="callout callout-warn">
          <span className="callout-title">Ordering</span>
          <p>
            The raw output of <code>badziagPrivateSinglet</code> is in ABA′B′ ordering (two-qubit
            pair, then shield pair). Testing the physical Alice|Bob cut — Alice = (A, A′), Bob = (B,
            B′) — requires permuting the systems to AA′BB′ before checking PPT.
          </p>
        </div>
      </div>

      <Citation>
        <p>
          P. Bądziąg, K. Horodecki, M. Horodecki, J. Jenkins, "Bound entanglement is not sufficient
          for private key distillation"-style PPT singlets, presented as ρ<sub>F1</sub> in Phys.
          Rev. Research 3, 023101 (2021).{" "}
          <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101">
            journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101
          </a>
        </p>
      </Citation>
    </>
  );
}

export default BadziagPrivateSinglet;
