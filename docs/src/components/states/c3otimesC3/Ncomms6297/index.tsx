/**
 * Documentation page for the ncomms6297 state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { ncomms6297 } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../LatexMatrix";
import Citation from "../../../Citation";

function Ncomms6297() {
  const rho = ncomms6297();

  return (
    <>
      <p>
        A rank-4 PPT entangled state on C³ ⊗ C³, given explicitly by its spectral decomposition:
        four eigenvectors and their eigenvalues, taken directly from Nature Communications 5, 6297
        (2014).
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          The state is the weighted sum <span className="math">ρ = Σᵢ λᵢ |ψᵢ⟩⟨ψᵢ|</span> of four
          eigenvectors, written here in the product basis{" "}
          <span className="math">|ij⟩ = |i⟩ ⊗ |j⟩</span> of C³ ⊗ C³, with{" "}
          <span className="math">a = √(131/2)</span>:
        </p>
        <div className="equation">|ψ₁⟩ = (1/√2)(|00⟩ + |11⟩)</div>
        <div className="equation">|ψ₂⟩ = (a/12)(|01⟩ + |10⟩) + (1/60)|02⟩ − (3/10)|21⟩</div>
        <div className="equation">|ψ₃⟩ = (a/12)(|00⟩ − |11⟩) + (1/60)|12⟩ + (3/10)|20⟩</div>
        <div className="equation">|ψ₄⟩ = (1/√3)(−|01⟩ + |10⟩ + |22⟩)</div>
        <p>with eigenvalues</p>
        <div className="equation">λ = (3257/6884, 450/1721, 450/1721, 27/6884)</div>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c3_otimes_c3 import ncomms6297

rho = ncomms6297()`}
        />
      </div>

      <div className="doc-section">
        <h2>The state</h2>
        <div className="example">
          <div className="example-output">
            <LatexMatrix value={rho} precision={3} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>9×9 density matrix on C³ ⊗ C³.</li>
          <li>Rank 4 — exactly the four eigenvectors above, each with nonzero eigenvalue.</li>
          <li>Positive partial transpose (PPT).</li>
          <li>Entangled despite being PPT — a bound entangled state.</li>
        </ul>
      </div>

      <Citation>
        <p>
          Nature Commun. 5, 6297 (2014).{" "}
          <a href="https://www.nature.com/articles/ncomms6297">nature.com/articles/ncomms6297</a>
        </p>
      </Citation>
    </>
  );
}

export default Ncomms6297;
