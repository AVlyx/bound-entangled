import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        On a four-qubit system <span className="math">A ⊗ B ⊗ C ⊗ D</span>, let{" "}
        <span className="math">|φᵢ⟩</span>, <span className="math">i = 0, …, 3</span>, be the four
        two-qubit Bell states. The Smolin state mixes each Bell pair, on{" "}
        <span className="math">AB</span>, with a copy of the same Bell pair on{" "}
        <span className="math">CD</span>:
      </p>
      <EquationLine>ρ = ¼ Σᵢ₌₀³ |φᵢ⟩⟨φᵢ| ⊗ |φᵢ⟩⟨φᵢ|</EquationLine>
      <p>
        Equivalently, it is the <span className="math-var">systems = 4</span> instance of the
        generalized Smolin construction: <code>smolin()</code> matches{" "}
        <code>{`generalizedSmolin({ systems: 4 })`}</code>.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
