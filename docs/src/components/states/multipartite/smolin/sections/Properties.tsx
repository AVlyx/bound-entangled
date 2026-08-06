import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <ul>
        <li>
          16×16 density matrix on four qubits, <span className="math">A ⊗ B ⊗ C ⊗ D</span>.
        </li>
        <li>
          PPT across the <span className="math">AB | CD</span> bipartition, i.e. with respect to
          the splitting <span className="math">dims = [4, 4]</span>.
        </li>
        <li>
          Equal to <code>{`generalizedSmolin({ systems: 4 })`}</code>, the four-qubit member of
          the generalized Smolin family.
        </li>
      </ul>
      <div className="callout callout-tip">
        <span className="callout-title">Unlockable entanglement</span>
        <p>
          The state can be unlocked by classical communication between any two of the four
          parties, which is why Smolin called it a “four-party unlockable bound entangled state.”
        </p>
      </div>
    </PropertiesSection>
  );
}

export default Properties;
