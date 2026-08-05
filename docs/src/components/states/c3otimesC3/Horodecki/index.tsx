import { useState } from "react";
import Slider from "../../../Slider";
import { horodecki3By3 } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationBlock from "../../../Equations/EquationBlock";
import EquationLine from "../../../Equations/EquationLine";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/**
 * Documentation page for the 3 x 3 Horodecki state. The header (title, Hilbert
 * space, signature) comes from `navigation.ts`; this file holds the body.
 */
function Horodecki3by3() {
  const [aParam, setAParam] = useState<number>(0.4);

  return (
    <>
      <p>
        The <span className="math-var">C³ ⊗ C³</span> Horodecki state is one of the first known
        families of bound entangled states. For every <span className="math-var">a</span> in [0, 1]
        it is positive under partial transpose (PPT); for every <span className="math-var">a</span>{" "}
        in the open interval (0, 1) it is entangled, so no pure entanglement can be distilled from
        it. It is separable only at the endpoints <span className="math-var">a</span> = 0 and{" "}
        <span className="math-var">a</span> = 1.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          In the product basis <span className="math">|i⟩⊗|j⟩</span>, with{" "}
          <span className="math-var">i</span>, <span className="math-var">j</span> ∈ {"{0, 1, 2}"},
          ordered as <span className="math">|00⟩, |01⟩, |02⟩, |10⟩, ..., |22⟩</span>, the 9×9
          Horodecki density matrix is
        </p>

        <LatexMatrix
          value={[
            ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
            [0, "a", 0, 0, 0, 0, 0, 0, 0],
            [0, 0, "a", 0, 0, 0, 0, 0, 0],
            [0, 0, 0, "a", 0, 0, 0, 0, 0],
            ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
            [0, 0, 0, 0, 0, "a", 0, 0, 0],
            [0, 0, 0, 0, 0, 0, "b", 0, "c"],
            [0, 0, 0, 0, 0, 0, 0, "a", 0],
            ["a", 0, 0, 0, "a", 0, "c", 0, "b"],
          ]}
          label="ρ(a) = 1/(8a + 1) ·"
        />
        <EquationBlock>
          <EquationLine>b = (1 + a) / 2</EquationLine>
          <EquationLine>c = √(1 − a²) / 2</EquationLine>
        </EquationBlock>
        <div className="callout callout-tip">
          <span className="callout-title">Off-diagonal coherences</span>
          <p>
            The <span className="math">|00⟩, |11⟩, |22⟩</span> coherences — the entries linking
            rows/columns 0, 4, and 8 above — are essential: without them the state would be
            separable. This implementation includes them (matching toqito's construction) even
            though some published presentations of the matrix omit them.
          </p>
        </div>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>aParam</dt>
          <dd>
            The free real parameter, in [0, 1]. The state is PPT for every value in this range, and
            separable only at the endpoints <span className="math-var">a</span> = 0 and{" "}
            <span className="math-var">a</span> = 1. Values outside [0, 1] are rejected.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>
          {`from bound_entangled.c3_otimes_c3 \n import horodecki rho = horodecki(0.5) # 9x9 density matrix`}
        </CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">a</span>
              <Slider min={0} max={1} value={aParam} setValue={setAParam} />
              <span className="control-value">{aParam.toFixed(2)}</span>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={horodecki3By3({ aParam })} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">entangled for a ∈ (0, 1)</span>{" "}
          <span className="badge">C³ ⊗ C³</span> <span className="badge">9×9</span>
        </p>
        <p>
          The Peres–Horodecki criterion says every separable state is PPT, so a state with a
          negative partial-transpose eigenvalue is certainly entangled. In{" "}
          <span className="math">C² ⊗ C²</span> and <span className="math">C² ⊗ C³</span> the
          converse also holds — PPT implies separable — but from{" "}
          <span className="math">C³ ⊗ C³</span> on that converse fails: this state stays PPT for
          every <span className="math-var">a</span> yet is entangled on the interior of the range,
          which is exactly what makes it bound entangled.
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
          transposition", Phys. Lett. A 232, 333 (1997), Section 4.1.{" "}
          <a href="https://arxiv.org/abs/quant-ph/9703004">arXiv:quant-ph/9703004</a>
        </p>
        <p>
          D. Chruściński, A. Kossakowski, "Circulant states with positive partial transpose",{" "}
          <a href="https://arxiv.org/abs/1108.2233">arXiv:1108.2233</a>, Eq. (1).
        </p>
      </Citation>
    </>
  );
}

export default Horodecki3by3;
