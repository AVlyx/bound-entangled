import { useState } from "react";
import Slider from "../../../Slider";
import { horodecki2By4 } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationBlock from "../../../Equations/EquationBlock";
import EquationLine from "../../../Equations/EquationLine";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";
import Parameters from "../../../Parameters";
import Parameter from "../../../Parameters/Parameter";
import CopyButton from "../../../CopyButton";

/**
 * Documentation page for the 2 x 4 Horodecki state. The header (title, Hilbert
 * space, signature) comes from `navigation.ts`; this file holds the body.
 */
function Horodecki2by4() {
  const [aParam, setAParam] = useState<number>(0.4);
  const mat = horodecki2By4({ aParam });

  return (
    <>
      <p>
        The <span className="math-var">C² ⊗ C⁴</span> Horodecki state was one of the first examples
        of a state that is positive under partial transpose (PPT) yet entangled. For every{" "}
        <span className="math-var">a</span> in [0, 1] it is PPT; for every{" "}
        <span className="math-var">a</span> in the open interval (0, 1) it is entangled, so no pure
        entanglement can be distilled from it by local operations and classical communication. It is
        separable only at the endpoints <span className="math-var">a</span> = 0 and{" "}
        <span className="math-var">a</span> = 1.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          In the product basis <span className="math">|i⟩⊗|j⟩</span>, with{" "}
          <span className="math-var">i</span> ∈ {"{0, 1}"} and <span className="math-var">j</span> ∈{" "}
          {"{0, 1, 2, 3}"}, ordered as{" "}
          <span className="math">|00⟩, |01⟩, |02⟩, |03⟩, |10⟩, |11⟩, |12⟩, |13⟩</span>, the 8×8
          Horodecki density matrix is
        </p>
        <LatexMatrix
          value={[
            ["a", 0, 0, 0, 0, "a", 0, 0],
            [0, "a", 0, 0, 0, 0, "a", 0],
            [0, 0, "a", 0, 0, 0, 0, "a"],
            [0, 0, 0, "a", 0, 0, 0, 0],
            [0, 0, 0, 0, "b", 0, 0, "c"],
            ["a", 0, 0, 0, 0, "a", 0, 0],
            [0, "a", 0, 0, 0, 0, "a", 0],
            [0, 0, "a", 0, "c", 0, 0, "b"],
          ]}
          label="ρ(a) = 1/(7a + 1) ·"
        />
        <p className="equation-caption">
          with <span className="math-var">b</span>, <span className="math-var">c</span> defined
          below.
        </p>
        <EquationBlock>
          <EquationLine>b = (1 + a) / 2</EquationLine>
          <EquationLine>c = √(1 − a²) / 2</EquationLine>
        </EquationBlock>
      </div>
      <Parameters>
        <Parameter paramName="aParam">
          The free real parameter, in [0, 1]. The state is PPT for every value in this range, and
          separable only at the endpoints <span className="math-var">a</span> = 0 and{" "}
          <span className="math-var">a</span> = 1. Values outside [0, 1] are rejected.
        </Parameter>
      </Parameters>

      <CodeBlock>{`from bound_entangled.c2_otimes_c4 import horodecki

rho = horodecki(0.5)  # 8x8 density matrix`}</CodeBlock>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          {/* <CopyButton /> */}
          <div className="controls">
            <span className="control-label">a</span>
            <Slider min={0} max={1} value={aParam} setValue={setAParam} />
            <span className="control-value">{aParam.toFixed(2)}</span>
          </div>
          <div className="example-output">
            <LatexMatrix value={mat} precision={3} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">entangled for a ∈ (0, 1)</span>{" "}
          <span className="badge">C² ⊗ C⁴</span> <span className="badge">8×8</span>
        </p>
        <p>
          The Peres–Horodecki criterion says every separable state is PPT, so a state with a
          negative partial-transpose eigenvalue is certainly entangled. In{" "}
          <span className="math">C² ⊗ C²</span> and <span className="math">C² ⊗ C³</span> the
          converse also holds — PPT implies separable — but this 2 ⊗ 4 state is a counterexample to
          that converse in higher dimension: it stays PPT for every{" "}
          <span className="math-var">a</span> yet is entangled on the interior of the range, which
          is exactly what makes it bound entangled.
        </p>
        <p>
          For every <span className="math-var">a</span> in [0, 1], including the endpoints,{" "}
          <span className="math-var">ρ(a)</span> is a valid density matrix — trace one and positive
          semidefinite.
        </p>
      </div>

      <Citation>
        <p>
          P. Horodecki, "Separability criterion and inseparable mixed states with positive partial
          transposition", Phys. Lett. A 232, 333 (1997), Section 4.2.{" "}
          <a href="https://arxiv.org/abs/quant-ph/9703004">arXiv:quant-ph/9703004</a>
        </p>
        <p>
          D. Chruściński, A. Kossakowski, "Circulant states with positive partial transpose",{" "}
          <a href="https://arxiv.org/abs/1108.2233">arXiv:1108.2233</a>, Eq. (2).
        </p>
      </Citation>
    </>
  );
}

export default Horodecki2by4;
