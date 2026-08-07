import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        <span className="badge">PPT</span> <span className="badge">entangled</span>{" "}
        <span className="badge">rank 4</span>
      </p>
      <p>
        For any valid choice of the six angles, ρ is a 9×9 density matrix (dimension ℂ³ ⊗ ℂ³):
        Hermitian, trace one, and positive semidefinite, with a positive partial transpose.
        Because the five vectors are orthonormal, ρ has rank 4 with every nonzero eigenvalue equal
        to 1/4, and ρ|ψᵢ⟩ = 0 for each basis vector. It has no product vector in its range, so it
        is entangled despite being PPT: a bound entangled state, for every one of the angles in
        the family.
      </p>
    </PropertiesSection>
  );
}

export default Properties;
