import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        A hyperedge is a list of one or more vertices <span className="math-var">[i, j]</span>.
        Its component is the sum of the corresponding basis states — a vertex listed twice
        contributes twice, and there is no relative minus sign between terms:
      </p>
      <EquationLine>{"|h\\rangle = \\sum_{[i,j] \\in h} |i,j\\rangle"}</EquationLine>
      <p>
        The generalized grid state is the trace-normalized mixture over a chosen set of hyperedges{" "}
        <span className="math-var">H</span>:
      </p>
      <EquationLine>
        {"\\rho = \\tfrac{\\sum_{h \\in H} |h\\rangle\\langle h|}{\\operatorname{Tr}(\\sum_{h \\in H} |h\\rangle\\langle h|)}"}
      </EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
