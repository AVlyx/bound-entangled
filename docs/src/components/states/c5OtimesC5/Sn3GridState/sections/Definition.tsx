import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        A (plain) grid state is built from a graph whose vertices are the product basis states{" "}
        <span className="math">|i⟩ ⊗ |j⟩</span> of C<span className="math-var">m</span> ⊗ C
        <span className="math-var">n</span>, and whose edges pair up vertices. An edge joining{" "}
        <span className="math">(i, j)</span> and <span className="math">(k, l)</span> carries the
        pure state <span className="math">(|ij⟩ − |kl⟩) / √2</span>, and the grid state is the
        uniform mixture <span className="math">ρ = (1 / |E|) Σₑ |e⟩⟨e|</span> of the states
        carried by every edge.
      </p>
      <p>
        The SN3 state generalizes this to <em>hyperedges</em>: a hyperedge is a list of one or
        more vertices, possibly repeating a vertex. Unlike an ordinary edge it carries no relative
        minus sign, and repeating a vertex adds to it again, so a hyperedge spanning vertices{" "}
        <span className="math">v₁, …, vₖ</span> carries the unnormalized vector
      </p>
      <EquationLine>|c⟩ = Σᵢ |vᵢ⟩</EquationLine>
      <p>
        The generalized grid state is the trace-normalized sum of{" "}
        <span className="math">|c⟩⟨c|</span> over every hyperedge — not divided by the number of
        hyperedges directly, so a hyperedge spanning more vertices, or a vertex reused across
        several hyperedges, contributes more weight before the final normalization:
      </p>
      <EquationLine>{"ρ = (Σ_{hyperedges} |c⟩⟨c|) / tr(Σ_{hyperedges} |c⟩⟨c|)"}</EquationLine>
      <p>
        <code>sn3GridState()</code> is this construction on the 5×5 grid with 13 hyperedges,
        falling into four groups:
      </p>
      <ul>
        <li>
          five single-vertex "loops" at <span className="math">(0,0)</span>,{" "}
          <span className="math">(1,0)</span>, <span className="math">(0,1)</span>,{" "}
          <span className="math">(4,1)</span> and <span className="math">(1,4)</span>, each a
          diagonal term <span className="math">|v⟩⟨v|</span>;
        </li>
        <li>
          two "double loops", the single vertices <span className="math">(3,2)</span> and{" "}
          <span className="math">(2,3)</span>, each listed twice among the hyperedges and so
          carrying twice the weight of a single loop;
        </li>
        <li>
          three two-vertex "edges" — <span className="math">{"{(1,2), (3,4)}"}</span>,{" "}
          <span className="math">{"{(2,1), (4,3)}"}</span> and{" "}
          <span className="math">{"{(2,2), (3,3)}"}</span> — each carrying an unnormalized{" "}
          <span className="math">|ij⟩ + |kl⟩</span> coherence (no minus sign, unlike a plain grid
          edge); and
        </li>
        <li>
          one three-vertex hyperedge <span className="math">{"{(0,2), (1,1), (2,0)}"}</span>,
          carrying <span className="math">|02⟩ + |11⟩ + |20⟩</span> — the only hyperedge spanning
          three vertices.
        </li>
      </ul>
    </DefinitionSection>
  );
}

export default Definition;
