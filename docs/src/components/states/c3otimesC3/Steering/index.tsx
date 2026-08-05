/**
 * Documentation page for the steering state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { steeringState } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationBlock from "../../../Equations/EquationBlock";
import EquationLine from "../../../Equations/EquationLine";
import Slider from "../../../Slider";
import Citation from "../../../Citation";

function Steering() {
  const [m1, setM1] = useState<number>(0.5);
  const [m2, setM2] = useState<number>(0.5);
  const valid = m1 ** 2 + m2 ** 2 <= 1;

  return (
    <>
      <p>
        A 3×3 bound entangled state that is steerable: a counterexample to the (stronger) Peres
        conjecture that bound entangled states cannot be used to demonstrate EPR steering.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          The state is written in the product basis <span className="math">|ij⟩</span> of C³ ⊗ C³,
          in terms of two free parameters <span className="math-var">m1</span>,{" "}
          <span className="math-var">m2</span> and
        </p>
        <EquationBlock>
          <EquationLine>m3 = √((1 − m1² − m2²) / 2)</EquationLine>
          <EquationLine>|ψ₁⟩ = (1/√2)(|12⟩ + |21⟩)</EquationLine>
          <EquationLine>|ψ₂⟩ = (1/√3)(|00⟩ + |11⟩ − |22⟩)</EquationLine>
          <EquationLine>|ψ₃⟩ = m1|01⟩ + m2|10⟩ + m3|11⟩ + m3|22⟩</EquationLine>
          <EquationLine>|ψ̃₃⟩ = m1|02⟩ − m2|20⟩ + m3|21⟩ − m3|12⟩</EquationLine>
        </EquationBlock>
        <p>combined as</p>
        <EquationLine>ρ = λ1 |ψ₁⟩⟨ψ₁| + λ2 |ψ₂⟩⟨ψ₂| + λ3 (|ψ₃⟩⟨ψ₃| + |ψ̃₃⟩⟨ψ̃₃|)</EquationLine>
        <p>
          with <span className="math">D = 4 − 2m1² + m1·m2 − 2m2²</span> and
        </p>
        <EquationLine>λ1 = 1 − (2 + 3·m1·m2) / D, λ3 = 1 / D, λ2 = 1 − λ1 − 2λ3</EquationLine>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>m1</dt>
          <dd>First free real parameter, with m1² + m2² ≤ 1.</dd>
          <dt>m2</dt>
          <dd>Second free real parameter, with m1² + m2² ≤ 1.</dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.c3_otimes_c3 import steering_state

rho = steering_state(0.5, 0.5)`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">m1</span>
              <Slider min={0} max={1} value={m1} setValue={setM1} />
              <span className="control-value">{m1.toFixed(2)}</span>
            </div>
            <div className="control">
              <span className="control-label">m2</span>
              <Slider min={0} max={1} value={m2} setValue={setM2} />
              <span className="control-value">{m2.toFixed(2)}</span>
            </div>
          </div>
          {valid ? (
            <div className="example-output">
              <LatexMatrix value={steeringState({ m1, m2 })} precision={2} label="ρ =" />
            </div>
          ) : (
            <div className="callout callout-warn">
              <span className="callout-title">Invalid parameters</span>
              <p>
                m1² + m2² must be at most 1; currently m1² + m2² = {(m1 ** 2 + m2 ** 2).toFixed(2)}.
                Lower m1 or m2.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>9×9 density matrix on C³ ⊗ C³.</li>
          <li>Positive partial transpose (PPT).</li>
          <li>Entangled despite being PPT — a bound entangled state.</li>
          <li>Steerable: a counterexample to the stronger Peres conjecture.</li>
        </ul>
      </div>

      <Citation>
        <p>
          T. Moroder, O. Gittsovich, M. Huber, O. Gühne, "Steering Bound Entangled States: A
          Counterexample to the Stronger Peres Conjecture", Phys. Rev. Lett. 113, 050404 (2014).{" "}
          <a href="https://arxiv.org/abs/1405.0262">arXiv:1405.0262</a>
        </p>
      </Citation>
    </>
  );
}

export default Steering;
