import { Link } from "react-router-dom";
import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        Every grid state is a valid density matrix, since it is a uniform mixture of the rank-one
        projectors carried by the edges. Whether it is entangled or PPT depends on the graph: a
        single edge gives the projector onto |<span className="math-var">i, j</span>⟩ − |
        <span className="math-var">k, l</span>⟩, which is a maximally entangled (NPT) Bell-type
        state, as in the 2 × 2 preset above. Other edge sets can instead give a PPT state — a
        candidate for bound entanglement.
      </p>
      <p className="doc-cite">
        The four-edge cross-hatch pattern on C³ ⊗ C³ is one such PPT example; see{" "}
        <Link to="/states/c3-c3/cross-hatch">crossHatch()</Link>. The hyperedge generalization of
        this construction, used to build the C⁵ ⊗ C⁵ SN3 grid state, is documented at{" "}
        generalizedGridState().
      </p>
    </PropertiesSection>
  );
}

export default Properties;
