/**
 * Documentation page for the generalized Smolin state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { generalizedSmolin } from "bound-entangled";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";
import Parameters from "../../../Parameters";
import Parameter from "../../../Parameters/Parameter";

function GeneralizedSmolin() {
  const [n, setN] = useState<number>(2);
  const systems = n * 2;
  const rho = generalizedSmolin({ systems });

  return (
    <>
      <p>
        Kay's generalization of Smolin's state to <span className="math">2n</span> qubits, built
        from equal-weight sums of the fully-aligned Pauli words{" "}
        <span className="math">
          X<sup>⊗2n</sup>
        </span>
        ,{" "}
        <span className="math">
          Y<sup>⊗2n</sup>
        </span>{" "}
        and{" "}
        <span className="math">
          Z<sup>⊗2n</sup>
        </span>
        . It reduces to the original Smolin state at <span className="math-var">systems = 4</span>,
        and is bound entangled for every even <span className="math-var">systems ≥ 4</span>.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          For <span className="math">systems = 2n</span> qubits, the generalized Smolin (GSS) state
          is
        </p>
        <EquationLine>{"ρ = (I + (−1)ⁿ Σ_{i∈{X,Y,Z}} σᵢ^{⊗2n}) / 2^{2n}"}</EquationLine>
        <p>
          where{" "}
          <span className="math">
            σᵢ<sup>⊗2n</sup>
          </span>{" "}
          is the operator <span className="math">σᵢ</span> applied to every one of the{" "}
          <span className="math">2n</span> qubits. The sign alternates with the parity of{" "}
          <span className="math">n</span>.
        </p>
      </div>

      <Parameters>
        <Parameter paramName="systems">
          Total number of qubits, <span className="math">2n</span>. Must be an even integer{" "}
          <span className="math">≥ 2</span>.
        </Parameter>
      </Parameters>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.multipartite import generalized_smolin

rho = generalized_smolin(systems=6)`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">n</span>
              <select value={n} onChange={(e) => setN(Number(e.target.value))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
              <span className="control-value">systems = {systems}</span>
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
            <span className="math">
              2<sup>systems</sup> × 2<sup>systems</sup>
            </span>{" "}
            density matrix on <span className="math">systems</span> qubits.
          </li>
          <li>
            <span className="math-var">systems = 4</span> (<span className="math">n = 2</span>)
            reproduces the original Smolin state, PPT across the{" "}
            <span className="math">dims = [4, 4]</span> split.
          </li>
          <li>
            <span className="math-var">systems = 2</span> (<span className="math">n = 1</span>)
            falls outside the bound-entangled range and reduces instead to the two-qubit singlet
            projector <span className="math">|ψ⁻⟩⟨ψ⁻|</span>, a pure state.
          </li>
          <li>
            Bound entangled for every even <span className="math">systems ≥ 4</span>.
          </li>
        </ul>
        <div className="callout callout-tip">
          <span className="callout-title">Genuinely multipartite</span>
          <p>
            At six qubits the state is PPT across the 2-qubit | 4-qubit cut (
            <span className="math">dims = [4, 16]</span>) but not across the equal 3 | 3 split, so
            no single bipartite cut fully characterizes its entanglement.
          </p>
        </div>
      </div>

      <Citation>
        {" "}
        <p>
          A. Kay, “Degree of quantum bound entanglement for a family of mixed states,” Phys. Rev. A
          71, 032309 (2005).{" "}
          <a href="https://arxiv.org/abs/quant-ph/0411142" target="_blank" rel="noreferrer">
            arXiv:quant-ph/0411142
          </a>
        </p>
        <p>
          See also J. A. Smolin, “Four-party unlockable bound entangled state,” Phys. Rev. A 63,
          032306 (2001).{" "}
          <a href="https://arxiv.org/abs/quant-ph/0001001" target="_blank" rel="noreferrer">
            arXiv:quant-ph/0001001
          </a>
        </p>
      </Citation>
    </>
  );
}

export default GeneralizedSmolin;
