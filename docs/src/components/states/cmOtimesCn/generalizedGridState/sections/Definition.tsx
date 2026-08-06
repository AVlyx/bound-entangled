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
      <EquationLine>{"|h⟩ = Σ_{[i, j] ∈ h} |i, j⟩"}</EquationLine>
      <p>
        The generalized grid state is the trace-normalized mixture over a chosen set of hyperedges{" "}
        <span className="math-var">H</span>:
      </p>
      <EquationLine>{"ρ = (Σ_{h ∈ H} |h⟩⟨h|) / Tr(Σ_{h ∈ H} |h⟩⟨h|)"}</EquationLine>
    </DefinitionSection>
  );
}

export default Definition;
