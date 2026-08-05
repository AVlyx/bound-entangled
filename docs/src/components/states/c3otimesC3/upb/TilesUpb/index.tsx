import { tilesBasis, tilesUpb } from "bound-entangled";
import CodeBlock from "../../../../CodeBlock";
import LatexMatrix from "../../../../LatexMatrix";

// Floating-point residue (~1e-16) from cos/sin arithmetic would otherwise show up as
// e.g. "2.6e-17" instead of a clean zero; snap anything this small down to exactly 0.
const ZERO_TOL = 1e-9;
const clean = (x: number): number => (Math.abs(x) < ZERO_TOL ? 0 : x);
const cleanVector = (v: { toArray(): unknown }): number[] =>
  (v.toArray() as unknown as number[]).map(clean);
const cleanMatrix = (m: { toArray(): unknown }): number[][] =>
  (m.toArray() as unknown as number[][]).map((row) => row.map(clean));

/**
 * Documentation page for the Tiles UPB. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function TilesUpb() {
  const basisArrays = tilesBasis().map(cleanVector);
  const basisColumns = basisArrays[0].map((_, row) => basisArrays.map((v) => v[row]));

  return (
    <>
      <p>
        The Tiles UPB is the original unextendible product basis of Bennett, DiVincenzo, Mor,
        Shor, Smolin and Terhal: five orthonormal product vectors on ℂ³ ⊗ ℂ³, laid out like tiles
        on a 3×3 grid, chosen so that no product vector is orthogonal to all five at once. The
        bound entangled state built from it is the normalised projector onto the orthogonal
        complement of the basis.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          Writing {"{"}|0⟩, |1⟩, |2⟩{"}"} for the computational basis of ℂ³, the five vectors are:
        </p>
        <div className="equation">
          |ψ₀⟩ = |0⟩ ⊗ (|0⟩ − |1⟩)/√2
          <br />
          |ψ₁⟩ = (|0⟩ − |1⟩) ⊗ |2⟩/√2
          <br />
          |ψ₂⟩ = |2⟩ ⊗ (|1⟩ − |2⟩)/√2
          <br />
          |ψ₃⟩ = (|1⟩ − |2⟩) ⊗ |0⟩/√2
          <br />
          |ψ₄⟩ = (|0⟩ + |1⟩ + |2⟩) ⊗ (|0⟩ + |1⟩ + |2⟩)/3
        </div>
        <p>
          The five vectors are pairwise orthonormal, so they span a 5-dimensional subspace of the
          9-dimensional space ℂ³ ⊗ ℂ³, leaving a 4-dimensional orthogonal complement. The bound
          entangled state is the uniform mixture over that complement, built by the shared{" "}
          <span className="math-op">upb</span> construction:
        </p>
        <div className="equation equation-boxed">
          ρ = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / (9 − 5) = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / 4
        </div>
        <p className="equation-caption">
          each |ψᵢ⟩⟨ψᵢ| is a rank-1 product-state projector, so ρ inherits a positive partial
          transpose while having no product vector in its range.
        </p>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c3_otimes_c3 import tiles_upb

rho = tiles_upb()`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="example-output">
            <LatexMatrix value={basisColumns} precision={3} label="[|ψ₀⟩ ⋯ |ψ₄⟩] =" />
          </div>
          <p className="equation-caption">
            the five basis vectors as columns, each a flat 9-vector of ℂ³ ⊗ ℂ³.
          </p>
          <div className="example-output">
            <LatexMatrix value={cleanMatrix(tilesUpb())} precision={2} label="ρ =" />
          </div>
          <p className="equation-caption">the resulting 9×9 bound entangled state.</p>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">entangled</span>{" "}
          <span className="badge">rank 4</span>
        </p>
        <p>
          ρ is a 9×9 density matrix (dimension ℂ³ ⊗ ℂ³): Hermitian, trace one, and positive
          semidefinite, with a positive partial transpose. Because the five Tiles vectors are
          orthonormal, ρ has rank 4 with every nonzero eigenvalue equal to 1/4, and ρ|ψᵢ⟩ = 0 for
          each of the five basis vectors. It has no product vector in its range, so it is
          entangled despite being PPT: a bound entangled state.
        </p>
      </div>

      <div className="doc-section">
        <h2>References</h2>
        <p className="doc-cite">
          C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
          "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett. 82, 5385 (1999).{" "}
          <a href="https://arxiv.org/abs/quant-ph/9808030">arXiv:quant-ph/9808030</a>
        </p>
      </div>
    </>
  );
}

export default TilesUpb;
