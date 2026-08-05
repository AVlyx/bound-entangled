/**
 * Documentation page for the Smolin state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { smolin } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

function Smolin() {
  const rho = smolin();

  return (
    <>
      <p>
        The original bound entangled state on four qubits, introduced by Smolin as the equal mixture
        of the four two-qubit Bell states tensored with themselves. It is the{" "}
        <span className="math-var">systems = 4</span> member of the generalized Smolin family.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          On a four-qubit system <span className="math">A ⊗ B ⊗ C ⊗ D</span>, let{" "}
          <span className="math">|φᵢ⟩</span>, <span className="math">i = 0, …, 3</span>, be the four
          two-qubit Bell states. The Smolin state mixes each Bell pair, on{" "}
          <span className="math">AB</span>, with a copy of the same Bell pair on{" "}
          <span className="math">CD</span>:
        </p>
        <div className="equation">ρ = ¼ Σᵢ₌₀³ |φᵢ⟩⟨φᵢ| ⊗ |φᵢ⟩⟨φᵢ|</div>
        <p>
          Equivalently, it is the <span className="math-var">systems = 4</span> instance of the
          generalized Smolin construction: <code>smolin()</code> matches{" "}
          <code>{`generalizedSmolin({ systems: 4 })`}</code>.
        </p>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.multipartite import smolin

rho = smolin()`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <ul>
          <li>
            16×16 density matrix on four qubits, <span className="math">A ⊗ B ⊗ C ⊗ D</span>.
          </li>
          <li>
            PPT across the <span className="math">AB | CD</span> bipartition, i.e. with respect to
            the splitting <span className="math">dims = [4, 4]</span>.
          </li>
          <li>
            Equal to <code>{`generalizedSmolin({ systems: 4 })`}</code>, the four-qubit member of
            the generalized Smolin family.
          </li>
        </ul>
        <div className="callout callout-tip">
          <span className="callout-title">Unlockable entanglement</span>
          <p>
            The state can be unlocked by classical communication between any two of the four
            parties, which is why Smolin called it a “four-party unlockable bound entangled state.”
          </p>
        </div>
      </div>

      <Citation>
        <p>
          J. A. Smolin, “Four-party unlockable bound entangled state,” Phys. Rev. A 63, 032306
          (2001).{" "}
          <a href="https://arxiv.org/abs/quant-ph/0001001" target="_blank" rel="noreferrer">
            arXiv:quant-ph/0001001
          </a>
        </p>
      </Citation>
    </>
  );
}

export default Smolin;
