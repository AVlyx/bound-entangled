import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";
import { PAULI_NAMES, type PauliDigit } from "../shared";

/** The six Pauli index pairs whose generalized Bell projectors make up the mixture. */
const MIXTURE_PAIRS: ReadonlyArray<readonly [PauliDigit, PauliDigit]> = [
  [0, 2],
  [1, 1],
  [2, 3],
  [3, 1],
  [3, 2],
  [3, 3],
];

function Definition() {
  return (
    <DefinitionSection>
      <p>
        Write <span className="math">|Ψ⁺₄⟩</span> for the (normalized) maximally entangled state
        of <span className="math">C⁴ ⊗ C⁴</span>. For Pauli indices{" "}
        <span className="math-var">i</span>, <span className="math-var">j</span> ∈{" "}
        {"{0, 1, 2, 3}"} (0 = I, 1 = X, 2 = Y, 3 = Z), the generalized Bell state
      </p>
      <EquationLine>|Ψᵢⱼ⟩ = (𝟙 ⊗ σᵢ ⊗ σⱼ) |Ψ⁺₄⟩</EquationLine>
      <p>
        is obtained by applying <span className="math-var">σᵢ</span> ⊗{" "}
        <span className="math-var">σⱼ</span> to the second C⁴ factor of{" "}
        <span className="math">|Ψ⁺₄⟩</span>, viewed as two qubits. Its rank-1 projector{" "}
        <span className="math">Pᵢⱼ = |Ψᵢⱼ⟩⟨Ψᵢⱼ|</span> is exactly what the exported{" "}
        <code>projectorIj(i, j)</code> computes, and is itself part of the construction: the
        Pianni state is the uniform mixture of six such projectors,
      </p>
      <EquationLine>ρ₀ = (1/6) Σ Pᵢⱼ</EquationLine>
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
      <EquationLine>ρ = permuteSystems(ρ₀, [0, 2, 1, 3], [2, 2, 2, 2])</EquationLine>
      <p className="equation-caption">
        Regrouping the qubits this way — described in the source as recombining them into the
        bipartition AA′|BB′ — is what makes ρ positive under the resulting [4, 4] partial
        transpose; the unpermuted mixture ρ₀ is already PPT, so the permutation changes which
        split the state is entangled across, not merely how it is written.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
