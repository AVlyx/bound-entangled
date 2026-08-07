import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        <span className="badge">PPT</span> <span className="badge">bound entangled</span>{" "}
        <span className="badge">C⁴ ⊗ C⁴</span> <span className="badge">16×16</span>{" "}
        <span className="badge">rank ≤ 6</span>
      </p>
      <ul>
        <li>16×16 density matrix on C⁴ ⊗ C⁴.</li>
        <li>
          Rank at most 6, being a mixture of six rank-1 projectors Pᵢⱼ (before the AA′|BB′
          regrouping, which is a unitary conjugation and so preserves rank).
        </li>
        <li>
          Positive under partial transpose (PPT) with respect to the AA′|BB′ bipartition, and
          entangled — a bound entangled state.
        </li>
        <li>
          Indecomposable: the source paper constructs it as an example of a quantum dynamical
          semigroup that is positive but not decomposable into completely positive pieces.
        </li>
        <li>
          Also referred to as the "4×4 bound entangled Piani state" (arXiv:2010.08372, Appendix
          C5).
        </li>
      </ul>
    </PropertiesSection>
  );
}

export default Properties;
