import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        Because each basis vector is a product state, none of the projectors it contributes change
        under partial transposition, so ρ is PPT; because no product vector lies in the range of ρ
        (the basis is unextendible), ρ is entangled — a bound entangled state for any [m, n]
        satisfying the constraints above.
      </p>
      <div className="callout callout-tip">
        <span className="callout-title">Why PPT + unextendible ⇒ bound entangled</span>
        The uniform mixture over the orthogonal complement of a UPB is PPT since each |v
        <sub>i</sub>⟩⟨v<sub>i</sub>| is a product-state projector, invariant under partial
        transposition; it is entangled since the UPB property means no product vector lies in ρ's
        range.
      </div>
    </PropertiesSection>
  );
}

export default Properties;
