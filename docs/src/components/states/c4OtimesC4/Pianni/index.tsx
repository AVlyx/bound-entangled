import { useState } from "react";
import { pianni, projectorIj } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import CodeBlock from "../../../CodeBlock";
import Citation from "../../../Citation";

/**
 * Documentation page for the Pianni state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */

/** A Pauli index: 0 = I, 1 = X, 2 = Y, 3 = Z. */
type PauliDigit = 0 | 1 | 2 | 3;

/** The four Pauli operators, indexed 0 = I, 1 = X, 2 = Y, 3 = Z. */
const PAULI_NAMES = ["I", "X", "Y", "Z"] as const;

/** The six Pauli index pairs whose generalized Bell projectors make up the mixture. */
const MIXTURE_PAIRS: ReadonlyArray<readonly [PauliDigit, PauliDigit]> = [
  [0, 2],
  [1, 1],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
];

function Pianni() {
  const [i, setI] = useState<PauliDigit>(1);
  const [j, setJ] = useState<PauliDigit>(1);

  return (
    <>
      <p>
        A bound entangled state on C⁴ ⊗ C⁴, built as a uniform mixture of six generalized Bell
        projectors and then regrouped into two ququart parties so that it is positive under partial
        transpose. It originates as an example of a quantum dynamical semigroup that cannot be
        written as a mixture of decomposable ones.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          Write <span className="math">|Ψ⁺₄⟩</span> for the (normalized) maximally entangled state
          of <span className="math">C⁴ ⊗ C⁴</span>. For Pauli indices{" "}
          <span className="math-var">i</span>, <span className="math-var">j</span> ∈{" "}
          {"{0, 1, 2, 3}"} (0 = I, 1 = X, 2 = Y, 3 = Z), the generalized Bell state
        </p>
        <div className="equation">|Ψᵢⱼ⟩ = (𝟙 ⊗ σᵢ ⊗ σⱼ) |Ψ⁺₄⟩</div>
        <p>
          is obtained by applying <span className="math-var">σᵢ</span> ⊗{" "}
          <span className="math-var">σⱼ</span> to the second C⁴ factor of{" "}
          <span className="math">|Ψ⁺₄⟩</span>, viewed as two qubits. Its rank-1 projector{" "}
          <span className="math">Pᵢⱼ = |Ψᵢⱼ⟩⟨Ψᵢⱼ|</span> is exactly what the exported{" "}
          <code>projectorIj(i, j)</code> computes, and is itself part of the construction: the
          Pianni state is the uniform mixture of six such projectors,
        </p>
        <div className="equation">ρ₀ = (1/6) Σ Pᵢⱼ</div>
        <p>over the six pairs</p>
        <div className="scroll-x">
          <table className="doc-table">
            <thead>
              <tr>
                <th>i</th>
                <th>j</th>
                <th>σᵢ ⊗ σⱼ</th>
              </tr>
            </thead>
            <tbody>
              {MIXTURE_PAIRS.map(([pi, pj]) => (
                <tr key={`${pi}-${pj}`}>
                  <td className="num">{pi}</td>
                  <td className="num">{pj}</td>
                  <td>
                    {PAULI_NAMES[pi]} ⊗ {PAULI_NAMES[pj]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Finally, regarding the 16 dimensions as four qubits (the first C⁴ factor split into two
          qubits, the second — the one the Pauli operators acted on — split into the other two), the
          Pianni state reorders those four qubits with the permutation [0, 2, 1, 3]:
        </p>
        <div className="equation">ρ = permuteSystems(ρ₀, [0, 2, 1, 3], [2, 2, 2, 2])</div>
        <p className="equation-caption">
          Regrouping the qubits this way — described in the source as recombining them into the
          bipartition AA′|BB′ — is what makes ρ positive under the resulting [4, 4] partial
          transpose; the unpermuted mixture ρ₀ is already PPT, so the permutation changes which
          split the state is entangled across, not merely how it is written.
        </p>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c4_otimes_c4 import pianni

rho = pianni()  # 16x16 density matrix on C⁴ ⊗ C⁴`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <p>
          The 16×16 Pianni state itself has no free parameter; instead, explore the building block{" "}
          <span className="math">Pᵢⱼ = projectorIj(i, j)</span> that the mixture is made from.
        </p>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">i</span>
              <select value={i} onChange={(e) => setI(Number(e.target.value) as PauliDigit)}>
                {PAULI_NAMES.map((name, index) => (
                  <option key={name} value={index}>
                    {index} ({name})
                  </option>
                ))}
              </select>
            </div>
            <div className="control">
              <span className="control-label">j</span>
              <select value={j} onChange={(e) => setJ(Number(e.target.value) as PauliDigit)}>
                {PAULI_NAMES.map((name, index) => (
                  <option key={name} value={index}>
                    {index} ({name})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={projectorIj(i, j)} precision={2} dimZeros label="Pᵢⱼ =" />
          </div>
        </div>
        <p className="equation-caption">
          The full state ρ = pianni(), the (1/6)-weighted, permuted sum of the six Pᵢⱼ listed above:
        </p>
        <div className="scroll-x">
          <LatexMatrix value={pianni()} precision={2} dimZeros label="ρ =" />
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">bound entangled</span>{" "}
          <span className="badge">C⁴ ⊗ C⁴</span> <span className="badge">16×16</span>{" "}
          <span className="badge">rank ≤ 6</span>
        </p>
        <ul>
          <li>16×16 density matrix on C⁴ ⊗ C⁴.</li>
          <li>
            Rank at most 6, being a mixture of six rank-1 projectors Pᵢⱼ (before the AA′|BB′
            regrouping, which is a unitary conjugation and so preserves rank).
          </li>
          <li>
            Positive under partial transpose (PPT) with respect to the AA′|BB′ bipartition, and
            entangled — a bound entangled state.
          </li>
          <li>
            Indecomposable: the source paper constructs it as an example of a quantum dynamical
            semigroup that is positive but not decomposable into completely positive pieces.
          </li>
          <li>
            Also referred to as the "4×4 bound entangled Piani state" (arXiv:2010.08372, Appendix
            C5).
          </li>
        </ul>
      </div>

      <Citation>
        <p>
          F. Benatti, R. Floreanini, M. Piani, "Non-decomposable quantum dynamical semigroups and
          bound entangled states", Open Syst. Inf. Dyn. 11, 325 (2004).{" "}
          <a href="https://arxiv.org/abs/quant-ph/0411095">arXiv:quant-ph/0411095</a>
        </p>
        <p>
          Also presented as "the 4×4 bound entangled Piani state" in{" "}
          <a href="https://arxiv.org/abs/2010.08372">arXiv:2010.08372</a> (Appendix C5).
        </p>
      </Citation>
    </>
  );
}

export default Pianni;
