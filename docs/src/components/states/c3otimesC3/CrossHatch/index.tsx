/**
 * Documentation page for the cross-hatch state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { crossHatch } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../LatexMatrix";
import Citation from "../../../Citation";

function CrossHatch() {
  const rho = crossHatch();

  return (
    <>
      <p>
        The cross-hatch state is the 3×3 instance of the quantum grid state construction of
        Lockhart, Gühne and Severini: a bound entangled state built from a small graph on the
        product basis of C³ ⊗ C³, detected by the CCNR (realignment) criterion.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          A grid state is built from a graph whose vertices are the product basis states{" "}
          <span className="math">|i⟩ ⊗ |j⟩</span> of{" "}
          <span className="math">
            <span className="math-var">C</span>ᵐ ⊗ <span className="math-var">C</span>ⁿ
          </span>{" "}
          and whose edges pair up vertices. An edge joining <span className="math">(i, j)</span> and{" "}
          <span className="math">(k, l)</span> carries the pure state
        </p>
        <div className="equation">|e⟩ = (|ij⟩ − |kl⟩) / √2</div>
        <p>and the grid state is the uniform mixture of the states carried by every edge:</p>
        <div className="equation">ρ = (1 / |E|) Σₑ |e⟩⟨e|</div>
        <p>The cross-hatch state is this construction on the 3×3 grid, with the four edges</p>
        <div className="equation">
          {"{(0,0), (1,2)},  {(1,0), (2,2)},  {(0,1), (2,0)},  {(0,2), (2,1)}"}
        </div>
        <span className="equation-caption">
          Every vertex used is distinct, so the four edge states are mutually orthogonal.
        </span>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c3_otimes_c3 import cross_hatch

rho = cross_hatch()`}
        />
      </div>

      <div className="doc-section">
        <h2>The state</h2>
        <div className="example">
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>9×9 density matrix on C³ ⊗ C³.</li>
          <li>Positive partial transpose (PPT).</li>
          <li>Entangled despite being PPT — a bound entangled state.</li>
          <li>Rank at most 4: a uniform mixture of the four pure edge states above.</li>
          <li>Detected by the CCNR (realignment) criterion.</li>
        </ul>
      </div>

      <Citation>
        <p>
          J. Lockhart, O. Gühne, S. Severini, "Entanglement properties of quantum grid states",
          Phys. Rev. A 97, 062340 (2018).{" "}
          <a href="https://arxiv.org/abs/1705.09261">arXiv:1705.09261</a>
        </p>
      </Citation>
    </>
  );
}

export default CrossHatch;
