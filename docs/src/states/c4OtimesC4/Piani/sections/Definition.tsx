import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";
import { PAULI_NAMES, type PauliDigit } from "../shared";
import Latex from "@/components/Equations/Latex";

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
        Write <span className="math">|Ψ⁺₄⟩</span> for the (normalized) maximally entangled state of{" "}
        <span className="math">
          {" "}
          <Latex>{`\\mathbb{C}^4 \\otimes \\mathbb{C}^4`}</Latex>
        </span>
        . For Pauli indices <span className="math-var">i</span>, <span className="math-var">j</span>{" "}
        ∈ {"{0, 1, 2, 3}"} (0 = I, 1 = X, 2 = Y, 3 = Z), the generalized Bell state
      </p>
      <EquationLine>
        {
          "|\\Psi_{ij}\\rangle = (\\mathbb{1} \\otimes \\sigma_i \\otimes \\sigma_j) |\\Psi^+_4\\rangle"
        }
      </EquationLine>
      <p>
        is obtained by applying <span className="math-var">σᵢ</span> ⊗{" "}
        <span className="math-var">σⱼ</span> to the second C⁴ factor of{" "}
        <span className="math">|Ψ⁺₄⟩</span>, viewed as two qubits. Its rank-1 projector{" "}
        <span className="math">Pᵢⱼ = |Ψᵢⱼ⟩⟨Ψᵢⱼ|</span> is exactly what the exported{" "}
        <code>projectorIj(i, j)</code> computes, and is itself part of the construction: the Piani
        state is the uniform mixture of six such projectors,
      </p>
      <EquationLine>{"\\rho = \\tfrac16 \\sum P_{ij}"}</EquationLine>
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
      <p className="equation-caption">
        This mixture is already positive under the [4, 4] partial transpose — no further
        rearranging of the underlying qubits is needed — while remaining entangled, which is what
        makes it bound entangled.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
