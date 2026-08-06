import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
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
    </PropertiesSection>
  );
}

export default Properties;
