/**
 * Documentation page for the orthogonal singlet state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { orthogonalSinglet } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/** Shield dimensions that are both valid (3 or a power of two) and small enough to render. */
const SHIELD_DIMS = [2, 3] as const;

function OrthogonalSinglet() {
  const [shieldDim, setShieldDim] = useState<number>(2);
  const rho = orthogonalSinglet({ shieldDim });
  const totalDim = 2 * shieldDim;

  return (
    <>
      <p>
        The orthogonal singlet, ρ<sub>F2</sub>, is a second bound-entangled family on{" "}
        <span className="math">
          C<sup>2d</sup> ⊗ C<sup>2d</sup>
        </span>
        , built with the same two-branch weighting as the Bądziąg private singlet but with the
        Fourier phases replaced by a family of real orthogonal matrices. It is presented as ρ
        <sub>F2</sub> in Phys. Rev. Research 3, 023101 (2021), reverse-engineered from Tóth &
        Vértesi's construction of PPT states useful for metrology.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          As with the private singlet, the state lives on{" "}
          <span className="math">
            C<sup>2</sup> ⊗ C<sup>2</sup> ⊗ C<sup>d</sup> ⊗ C<sup>d</sup>
          </span>{" "}
          in ABA′B′ ordering (two-qubit pair AB, shield pair A′B′) and mixes two branches with
          weights
        </p>
        <div className="equation">
          p<sub>1</sub> = √d / (1 + √d), &nbsp;&nbsp; p<sub>2</sub> = 1 − p<sub>1</sub>
        </div>
        <p>
          The construction uses a family of <span className="math-var">d</span> real orthogonal{" "}
          <span className="math-var">d</span> × <span className="math-var">d</span> matrices Q
          <sup>k</sup> (Appendix G of the source):
        </p>
        <div className="equation">
          ρ = (p<sub>1</sub>/d²) Σ<sub>ij</sub> |z<sub>ij</sub>⟩⟨z<sub>ij</sub>| + (p<sub>2</sub>
          /2d) Σ<sub>k</sub> |01⟩⟨01|<sub>AB</sub> ⊗ |s<sub>k</sub>⟩⟨s<sub>k</sub>|<sub>A′B′</sub> +
          (p<sub>2</sub>/2d) Σ<sub>i</sub> |10, ii⟩⟨10, ii|
        </div>
        <p>
          where |z<sub>ij</sub>⟩ = (1/√2)( |00, ij⟩ + Σ<sub>k</sub> Q<sup>j</sup>
          <sub>ik</sub> |11, jk⟩ ), and the |s<sub>k</sub>⟩ live on the shield pair A′B′. For{" "}
          <span className="math-var">d</span> = 3 the Q<sup>k</sup> are rotations by φ = 2π(k+1)/3
          in the first two coordinates,
        </p>
        <div className="equation">
          Q<sup>k</sup> = [[cos φ, sin φ, 0], [sin φ, −cos φ, 0], [0, 0, 1]]
        </div>
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
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>shieldDim</dt>
          <dd>
            The shield subsystem dimension <span className="math-var">d</span>. Must be 3 or a power
            of two, so the total local dimension 2<span className="math-var">d</span> is one of 4,
            6, 8, 16, … Other values throw.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.cd_otimes_cd import orthogonal_singlet

rho = orthogonal_singlet(shield_dim=2)
# rho is a 16 x 16 density matrix on C^2 ⊗ C^2 ⊗ C^2 ⊗ C^2`}
        />
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
          <li>
            Rejects shield dimensions that are neither 3 nor a power of two (e.g. 5 or 6 throw).
          </li>
        </ul>
        <div className="callout callout-warn">
          <span className="callout-title">Ordering</span>
          <p>
            The raw output of <code>orthogonalSinglet</code> is in ABA′B′ ordering (two-qubit pair,
            then shield pair). Testing the physical Alice|Bob cut — Alice = (A, A′), Bob = (B, B′) —
            requires permuting the systems to AA′BB′ before checking PPT.
          </p>
        </div>
      </div>

      <Citation>
        <p>
          ρ<sub>F2</sub> from Phys. Rev. Research 3, 023101 (2021) — the "second family" of PPT
          singlets, reverse-engineered from G. Tóth, T. Vértesi, "Quantum States with a Positive
          Partial Transpose are Useful for Metrology", Phys. Rev. Lett. 120, 020506 (2018). Port of{" "}
          <code>BES_metro.m</code> from the QUBIT4MATLAB package.{" "}
          <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101">
            journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101
          </a>
        </p>
      </Citation>
    </>
  );
}

export default OrthogonalSinglet;
