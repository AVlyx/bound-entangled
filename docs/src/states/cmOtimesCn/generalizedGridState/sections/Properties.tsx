import { Link } from "react-router-dom";
import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        A hyperedge spanning exactly one vertex (a "loop") contributes a diagonal basis projector,
        and a vertex repeated within a hyperedge weights that basis state more heavily — neither
        is expressible with an ordinary two-vertex edge. For a single two-vertex hyperedge, ρ
        reduces exactly to the projector onto its normalized component, the same pure, entangled
        state an ordinary edge would give.
      </p>
      <p className="doc-cite">
        Loops and repeated-vertex hyperedges are exactly the tools used to build the{" "}
        <Link to="/states/c5-c5/sn3-grid-state">SN3 grid state</Link>, the smallest known Schmidt
        number 3 PPT bound entangled state, on C⁵ ⊗ C⁵: it mixes single-vertex loops (some
        repeated, to weight the diagonal) with ordinary two-vertex edges and one three-vertex
        hyperedge.
      </p>
    </PropertiesSection>
  );
}

export default Properties;
