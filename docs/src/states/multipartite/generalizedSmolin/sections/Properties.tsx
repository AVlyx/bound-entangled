import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
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
    </PropertiesSection>
  );
}

export default Properties;
