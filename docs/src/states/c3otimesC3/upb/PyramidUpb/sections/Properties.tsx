import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        <span className="badge">PPT</span> <span className="badge">entangled</span>{" "}
        <span className="badge">rank 4</span>
      </p>
      <p>
        ρ is a 9×9 density matrix (dimension ℂ³ ⊗ ℂ³): Hermitian, trace one, and positive
        semidefinite, with a positive partial transpose. Because the five Pyramid vectors are
        orthonormal, ρ has rank 4 with every nonzero eigenvalue equal to 1/4, and ρ|ψ_j⟩ = 0 for
        each of the five basis vectors. It has no product vector in its range, so it is entangled
        despite being PPT: a bound entangled state. The Pyramid UPB is also the special case φ_A =
        φ_B = 0, θ_A = θ_B = γ_A = γ_B = arccos((√5 − 1)/2) of the Parametrized UPB on this site.
      </p>
    </PropertiesSection>
  );
}

export default Properties;
