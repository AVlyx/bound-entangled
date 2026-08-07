import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        <span className="badge">PPT</span> <span className="badge">bound entangled</span>{" "}
        <span className="badge">Schmidt number 3</span> <span className="badge">C⁵ ⊗ C⁵</span>{" "}
        <span className="badge">25×25</span>
      </p>
      <ul>
        <li>25×25 density matrix on C⁵ ⊗ C⁵.</li>
        <li>Positive under partial transpose (PPT) with respect to the [5, 5] split.</li>
        <li>
          The smallest known Schmidt number 3 PPT bound entangled state, per the source paper's
          Result 1 / Appendix B: preparing it from a product state requires operations of Schmidt
          rank at least 3, even though it has positive partial transpose.
        </li>
      </ul>
    </PropertiesSection>
  );
}

export default Properties;
