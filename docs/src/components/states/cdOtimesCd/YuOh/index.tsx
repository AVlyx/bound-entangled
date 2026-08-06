import { useState } from "react";
import { isValidYuOhInput, yuOh } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import Slider from "../../../Slider";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";
import Parameters from "../../../Parameters";
import Parameter from "../../../Parameters/Parameter";

/** The three smallest valid local dimensions. */
const DIMENSIONS = [3, 4, 5];

/**
 * Documentation page for the Yu-Oh state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function YuOh() {
  const [d, setD] = useState(3);
  const [x, setX] = useState(0.5);
  const [y, setY] = useState(0.1);
  const options = { fullDim: d, x, y };
  const valid = isValidYuOhInput(options);

  const sumSq = x ** 2 + y ** 2;
  const z = sumSq <= 1 ? Math.sqrt(1 - sumSq) : NaN;
  const delta = sumSq <= 1 ? z ** 2 / (d - 2) - x * y : NaN;

  return (
    <>
      <p>
        The Yu–Oh state is a family of bound entangled states on Cᵈ ⊗ Cᵈ (d ≥ 3), parametrized by
        two real numbers x and y, that violate a Bell inequality — hence nonlocal despite being
        bound entangled.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          The construction uses the antisymmetric vectors ψ<sub>ij</sub> = |ij⟩ − |ji⟩, and a family
          of d unit vectors θ<sub>1</sub>, …, θ<sub>d</sub> in ℝᵈ built by induction on the
          dimension, which sum to the zero vector. From these, for k = 1, …, d − 1:
        </p>
        <EquationLine>
          {"φ_k = ((d − 1)^{3/2} / (d √(d − 2))) · Σ_p θ_p(k) |θ_p⟩ ⊗ |θ_p⟩"}
        </EquationLine>
        <p>
          φ<sub>k</sub> is symmetric under swapping the two factors. It combines with x and y into ψ
          <sub>k</sub> = x |0, k⟩ + y |k, 0⟩ + z · φ<sub>k</sub>, where z = √(1 − x² − y²). The full
          state is then
        </p>
        <EquationLine>
          {"ρ = (xy / R) |Φ_d⟩⟨Φ_d| + (δ / R) Σ_{1 ≤ j < i < d} |ψ_{ij}⟩⟨ψ_{ij}|" +
            " + (1 / R) Σ_{k=1}^{d − 1} |ψ_k⟩⟨ψ_k|"}
        </EquationLine>
        <p>
          with |Φ<sub>d</sub>⟩ = Σᵢ |ii⟩ the unnormalized maximally entangled ket, δ = z²/(d − 2) −
          xy, and R = d · xy + (d − 1)(d − 2)δ + d − 1.
        </p>
      </div>

      <Parameters>
        <Parameter paramName="fullDim">
          The local dimension <span className="math-var">d</span> shared by both parties. Must be
          an integer ≥ 3.
        </Parameter>
        <Parameter paramName="x">First free real parameter.</Parameter>
        <Parameter paramName="y">Second free real parameter.</Parameter>
      </Parameters>
      <p>
        (x, y) must jointly satisfy x² + y² ≤ 1 and δ = z²/(d − 2) − xy &gt; 0, where z = √(1 − x² −
        y²) — checked by isValidYuOhInput.
      </p>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.cd_otimes_cd import is_valid_yu_oh_input, yu_oh

if is_valid_yu_oh_input(full_dim=3, x=0.5, y=0.1):
    rho = yu_oh(full_dim=3, x=0.5, y=0.1)`}</CodeBlock>
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
              <span className="control-label">x</span>
              <Slider min={0} max={1} value={x} setValue={(e) => setX(e)} />
              <span className="control-value">{x.toFixed(2)}</span>
            </div>
            <div className="control">
              <span className="control-label">y</span>
              <Slider min={0} max={1} value={y} setValue={(e) => setY(e)} />
              <span className="control-value">{y.toFixed(2)}</span>
            </div>
          </div>
          {valid ? (
            <div className="example-output">
              <LatexMatrix value={yuOh(options)} precision={2} label="ρ =" />
            </div>
          ) : (
            <div className="callout callout-warn">
              <span className="callout-title">Outside the valid domain</span>
              <p>
                {sumSq > 1 ? (
                  <>x² + y² = {sumSq.toFixed(2)}, which exceeds 1.</>
                ) : (
                  <>
                    x² + y² = {sumSq.toFixed(2)} ≤ 1, but δ = {delta.toFixed(3)} is not positive.
                  </>
                )}{" "}
                yuOh requires x² + y² ≤ 1 and δ = z²/(d − 2) − xy &gt; 0. Lower x or y to bring the
                state back into the valid domain.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          The state is PPT and bound entangled on Cᵈ ⊗ Cᵈ. It additionally violates a Bell
          inequality, making it nonlocal despite being bound entangled.
        </p>
      </div>

      <Citation>
        <p>
          S. Yu, C. H. Oh, "A family of nonlocal bound entangled states", Phys. Rev. A 95, 032111
          (2017). <a href="https://arxiv.org/abs/1509.08991">arXiv:1509.08991</a>
        </p>
      </Citation>
    </>
  );
}

export default YuOh;
