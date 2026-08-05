import { useState } from "react";
import { horodecki2ByDGeneralized } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import Slider from "../../../Slider";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/** The few smallest valid second dimensions, keeping the rendered matrix small. */
const DIMENSIONS = [2, 3, 4, 5];

/**
 * Documentation page for the generalized Horodecki 2 x d state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Horodecki2OtimesDGeneralized() {
  const [d, setD] = useState(4);
  const [b, setB] = useState(0.5);
  const rho = horodecki2ByDGeneralized({ secondDimD: d, b });

  return (
    <>
      <p>
        This state generalizes the original C² ⊗ C⁴ Horodecki state to C² ⊗ C
        <span className="math-var">d</span>, for any second dimension{" "}
        <span className="math-var">d</span> ≥ 2. It mixes an entangled component built from a chain
        of <span className="math-var">d</span> − 1 partially entangled vectors with a single product
        vector, in proportions set by the free parameter <span className="math-var">b</span>.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          The inseparable part mixes the <span className="math-var">d</span> − 1 vectors |ψᵢ⟩ = (|0,
          i⟩ + |1, i + 1⟩) / √2, for i = 0, …, d − 2, with the corner state |1, 0⟩:
        </p>
        <div className="equation">
          ρ<sub>insep</sub> = 2/(2d − 1) · Σᵢ |ψᵢ⟩⟨ψᵢ| + 1/(2d − 1) · |1, 0⟩⟨1, 0|
        </div>
        <p>
          The separable part is a single product vector: a qubit fixed in the |0⟩ direction tensored
          with a two-level superposition on the shield system,
        </p>
        <div className="equation">|φ_b⟩ = (1/√2) |0⟩ ⊗ (√(1 − b) |0⟩ + √(1 + b) |d − 1⟩)</div>
        <p>and the full state is the weighted mixture</p>
        <div className="equation">
          ρ = [(2d − 1) b · ρ<sub>insep</sub> + |φ_b⟩⟨φ_b|] / [(2d − 1) b + 1]
        </div>
        <p>
          For d = 4 this reduces to the original C² ⊗ C⁴ Horodecki state (see{" "}
          <span className="math-op">horodecki2By4</span>), up to an anti-diagonal transpose.
        </p>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>secondDimD</dt>
          <dd>
            The second local dimension <span className="math-var">d</span> of C² ⊗ Cᵈ. Must be an
            integer ≥ 2; the full system has dimension 2d.
          </dd>
          <dt>b</dt>
          <dd>
            The free real parameter weighing the entangled component against the product state.
            Since φ_b needs √(1 − b) and √(1 + b) to stay real, b must lie in [−1, 1].
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.cd_otimes_cd import horodecki_2_by_d_generalized

rho = horodecki_2_by_d_generalized(second_dim_d=4, b=0.5)`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">d</span>
              <select value={d} onChange={(e) => setD(Number(e.target.value))}>
                {DIMENSIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="control">
              <span className="control-label">b</span>
              <Slider min={0} max={1} value={b} setValue={(e) => setB(e)} />
              <span className="control-value">{b.toFixed(2)}</span>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          The state is a valid density matrix that stays positive under partial transpose (PPT)
          across the 2 | d split, while its inseparable component keeps it entangled: a bound
          entangled state.
        </p>
      </div>

      <Citation>
        <p className="doc-cite">
          <a href="https://arxiv.org/abs/1203.3711">arXiv:1203.3711</a>
        </p>
      </Citation>
    </>
  );
}

export default Horodecki2OtimesDGeneralized;
