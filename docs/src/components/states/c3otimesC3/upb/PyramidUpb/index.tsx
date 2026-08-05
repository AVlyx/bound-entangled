import { pyramidBasis, pyramidUpb } from "bound-entangled";
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
 * Documentation page for the Pyramid UPB. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function PyramidUpb() {
  const basisArrays = pyramidBasis().map(cleanVector);
  const basisColumns = basisArrays[0].map((_, row) => basisArrays.map((v) => v[row]));

  return (
    <>
      <p>
        The Pyramid UPB is a second unextendible product basis on ℂ³ ⊗ ℂ³ from Bennett,
        DiVincenzo, Mor, Shor, Smolin and Terhal, built from vectors pointing at the vertices of a
        pentagonal pyramid rather than the grid the Tiles basis uses. As with the Tiles UPB, the
        bound entangled state built from it is the normalised projector onto its orthogonal
        complement.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          For j = 0, …, 4 and h = ½√(1 + √5), Alice's and Bob's local vectors sit at two
          interleaved sets of vertices of a regular pentagon, lifted to height h and normalised:
        </p>
        <div className="equation">
          |a_j⟩ ∝ (cos(2πj/5), sin(2πj/5), h)
          <br />
          |b_j⟩ ∝ (cos(4πj/5), sin(4πj/5), h)
        </div>
        <p>
          The j-th vector of the basis is the product state |ψ_j⟩ = |a_j⟩ ⊗ |b_j⟩. The five
          vectors are pairwise orthonormal, spanning a 5-dimensional subspace of the 9-dimensional
          space ℂ³ ⊗ ℂ³ and leaving a 4-dimensional orthogonal complement. As for every UPB in this
          library, the bound entangled state is the uniform mixture over that complement, via the
          shared <span className="math-op">upb</span> construction:
        </p>
        <div className="equation equation-boxed">
          ρ = (I − Σⱼ |ψ_j⟩⟨ψ_j|) / (9 − 5) = (I − Σⱼ |ψ_j⟩⟨ψ_j|) / 4
        </div>
        <p className="equation-caption">
          each |ψ_j⟩⟨ψ_j| is a rank-1 product-state projector, so ρ inherits a positive partial
          transpose while having no product vector in its range.
        </p>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.c3_otimes_c3.upb.pyramid_UPB import pyramid_basis, pyramid_upb

basis = pyramid_basis()  # the five product vectors, each a column 9-vector
rho = pyramid_upb()      # the bound entangled state on their complement`}
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
            <LatexMatrix value={cleanMatrix(pyramidUpb())} precision={2} label="ρ =" />
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
          semidefinite, with a positive partial transpose. Because the five Pyramid vectors are
          orthonormal, ρ has rank 4 with every nonzero eigenvalue equal to 1/4, and ρ|ψ_j⟩ = 0 for
          each of the five basis vectors. It has no product vector in its range, so it is
          entangled despite being PPT: a bound entangled state. The Pyramid UPB is also the
          special case φ_A = φ_B = 0, θ_A = θ_B = γ_A = γ_B = arccos((√5 − 1)/2) of the
          Parametrized UPB on this site.
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

export default PyramidUpb;
