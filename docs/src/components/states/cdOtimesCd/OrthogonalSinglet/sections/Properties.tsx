import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <ul>
        <li>
          Square density matrix of size (4d²) × (4d²): Hermitian, trace one, positive
          semidefinite.
        </li>
        <li>
          Bound entangled across the Alice = (A, A′) | Bob = (B, B′) cut: positive semidefinite
          with a positive partial transpose (PPT) after permuting ABA′B′ → AA′BB′.
        </li>
        <li>
          Rejects shield dimensions that are neither 3 nor a power of two (e.g. 5 or 6 throw).
        </li>
      </ul>
      <div className="callout callout-warn">
        <span className="callout-title">Ordering</span>
        <p>
          The raw output of <code>orthogonalSinglet</code> is in ABA′B′ ordering (two-qubit pair,
          then shield pair). Testing the physical Alice|Bob cut — Alice = (A, A′), Bob = (B, B′) —
          requires permuting the systems to AA′BB′ before checking PPT.
        </p>
      </div>
    </PropertiesSection>
  );
}

export default Properties;
