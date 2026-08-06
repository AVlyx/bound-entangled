/**
 * Documentation page for the quasi-DS states. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { quasiDs } from "bound-entangled";
import type { QuasiDsSign } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import Slider from "../../../Slider";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";
import Parameters from "../../../Parameters";
import Parameter from "../../../Parameters/Parameter";

function QuasiDs() {
  const [n, setN] = useState<number>(3);
  const [z, setZ] = useState<number>(1);
  const [sigma, setSigma] = useState<QuasiDsSign>(1);

  const rho = quasiDs({ n, z, sigma });

  return (
    <>
      <p>
        A family of permutationally invariant states on an odd number{" "}
        <span className="math">n</span> of qubits, built by dressing a diagonal matrix in the
        symmetric Dicke basis with two off-diagonal corners. Quasi-Dicke states are PPT across every
        bipartition and bound entangled for every valid choice of parameters.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
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
        <EquationLine>{"V = Σ_{i₁…iₙ} binom(n, ν)^{−1/2} |i₁…iₙ⟩⟨ν|"}</EquationLine>
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
        <EquationLine>{"D(z)_{kk} = binom(n, k) · f_{K−k}(z), K = ⌊n / 2⌋"}</EquationLine>
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
        <EquationLine>{"ρ_{Dicke}(z, σ) = (D(z) + O(σ)) / (2 (4 + z)^K)"}</EquationLine>
        <p>
          and the computational-basis state is the conjugation{" "}
          <span className="math">ρ = V ρ_Dicke Vᵀ</span>.
        </p>
      </div>

      <Parameters>
        <Parameter paramName="n">Number of qubits. Must be a positive odd integer, at least 3.</Parameter>
        <Parameter paramName="z">
          Real parameter controlling the state's mixing. Must be a finite real number.
        </Parameter>
        <Parameter paramName="sigma">
          Sign parameter, either <span className="math">+1</span> or{" "}
          <span className="math">−1</span>; flips only the two off-diagonal corner entries.
        </Parameter>
      </Parameters>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.multipartite import quasi_ds

rho = quasi_ds(n=3, z=1, sigma=1)`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">n</span>
              <select value={n} onChange={(e) => setN(Number(e.target.value))}>
                <option value={3}>3</option>
                <option value={5}>5</option>
              </select>
              <span className="control-value">{n}</span>
            </div>
            <div className="control">
              <span className="control-label">z</span>
              <Slider min={0} max={1} value={z} setValue={setZ} />
              <span className="control-value">{z.toFixed(2)}</span>
            </div>
            <div className="control">
              <span className="control-label">σ</span>
              <select
                value={sigma}
                onChange={(e) => setSigma(Number(e.target.value) as QuasiDsSign)}
              >
                <option value={1}>+1</option>
                <option value={-1}>−1</option>
              </select>
              <span className="control-value">{sigma > 0 ? "+1" : "−1"}</span>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
        <p className="figure-caption">
          <span className="math">z</span> is restricted to <span className="math">[0, 1]</span> here
          for a well-behaved demo; the factory accepts any finite real value.
        </p>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>
            <span className="math">(n + 1) × (n + 1)</span> density matrix in the Dicke basis (
            <span className="math-var">quasiDsDickeBasis</span>), lifted to a{" "}
            <span className="math">2ⁿ × 2ⁿ</span> density matrix on <span className="math">n</span>{" "}
            qubits via the isometry <span className="math-var">dickeIso</span>.
          </li>
          <li>PPT across every bipartition, and bound entangled for every valid parameter.</li>
          <li>
            PPT, in particular, across the one-qubit-versus-the-rest split,{" "}
            <span className="math">dims = [2, 2ⁿ⁻¹]</span>.
          </li>
          <li>
            Flipping <span className="math-var">sigma</span> flips only the sign of the two
            off-diagonal corner entries and leaves the diagonal unchanged.
          </li>
          <li>
            The Dicke isometry <span className="math-var">V</span> has orthonormal columns,{" "}
            <span className="math">Vᵀ V = I</span>.
          </li>
        </ul>
      </div>

      <Citation>
        <p>
          J. Tura, R. Augusiak, P. Hyllus, M. Kuś, J. Samsonowicz, M. Lewenstein, “Four-qubit
          entangled symmetric states with positive partial transpositions,” Nature Commun. 5, 6297
          (2014).{" "}
          <a href="https://www.nature.com/articles/ncomms6297" target="_blank" rel="noreferrer">
            nature.com/articles/ncomms6297
          </a>
        </p>
      </Citation>
    </>
  );
}

export default QuasiDs;
