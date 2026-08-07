import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <ul>
        <li>
          <span className="math">(n + 1) × (n + 1)</span> density matrix in the Dicke basis (
          <span className="math-var">quasiDsDickeBasis</span>), lifted to a{" "}
          <span className="math">2ⁿ × 2ⁿ</span> density matrix on <span className="math">n</span>{" "}
          qubits via the isometry <span className="math-var">dickeIso</span>.
        </li>
        <li>PPT across every bipartition, and bound entangled for every valid parameter.</li>
        <li>
          PPT, in particular, across the one-qubit-versus-the-rest split,{" "}
          <span className="math">dims = [2, 2ⁿ⁻¹]</span>.
        </li>
        <li>
          Flipping <span className="math-var">sigma</span> flips only the sign of the two
          off-diagonal corner entries and leaves the diagonal unchanged.
        </li>
        <li>
          The Dicke isometry <span className="math-var">V</span> has orthonormal columns,{" "}
          <span className="math">Vᵀ V = I</span>.
        </li>
      </ul>
    </PropertiesSection>
  );
}

export default Properties;
