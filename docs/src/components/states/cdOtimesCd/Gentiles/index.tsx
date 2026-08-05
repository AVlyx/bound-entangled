import { useState } from "react";
import { genTiles1 } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";
import CodeBlock from "../../../CodeBlock";

/** The two smallest valid dimensions; d = 8 would already render a 64x64 matrix. */
const DIMENSIONS = [4, 6];

/**
 * Documentation page for the GenTiles1 construction. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Gentiles() {
  const [d, setD] = useState(4);
  const basisSize = d * d - 2 * d + 1;
  const rho = genTiles1({ fullDim: d });

  return (
    <>
      <p>
        GenTiles1 generalizes the Tiles unextendible product basis (UPB) on C³ ⊗ C³ to any even local
        dimension d ≥ 4. An unextendible product basis is a set of orthonormal product vectors that does
        not span the whole space, yet no product vector fits in what is left over. Mixing uniformly over
        that leftover space produces a state that is PPT — because every term removed is a product-state
        projector, unaffected by partial transposition — yet entangled, because the UPB leaves no product
        vector behind: a bound entangled state.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          The basis is built from a "half-filled" vector on C<span className="math-var">d</span>, a sum over
          half of the computational basis states weighted by roots of unity:
        </p>
        <div className="equation">
          |ω<sub>m</sub>(shift)⟩ = Σ<sub>j=0</sub><sup>d/2 − 1</sup> ω<sup>jm</sup> |(j + shift) mod d⟩, ω = exp(4πi
          / d)
        </div>
        <p>
          For m = 1, …, d/2 − 1 and k = 0, …, d − 1, two families of product vectors are formed from it — a
          "vertical" and a "horizontal" tile — together with a single "stopper" state:
        </p>
        <div className="equation">
          |V<sub>mk</sub>⟩ = |k⟩ ⊗ |ω<sub>m</sub>(k + 1)⟩, |H<sub>mk</sub>⟩ = |ω<sub>m</sub>(k)⟩ ⊗ |k⟩, |F⟩ = (1 / d)
          Σᵢ Σⱼ |i⟩ ⊗ |j⟩
        </div>
        <p>
          Together these d² − 2d + 1 vectors form the GenTiles1 UPB (genTiles1Basis). The state is the uniform
          mixture over its orthogonal complement,
        </p>
        <div className="equation">ρ = (I − Σᵢ |vᵢ⟩⟨vᵢ|) / (2d − 1)</div>
        <p>where the sum runs over the d² − 2d + 1 basis vectors and I is the identity on Cᵈ ⊗ Cᵈ.</p>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>fullDim</dt>
          <dd>
            The local dimension <span className="math-var">d</span> shared by both parties. Must be even and ≥ 4.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from bound_entangled.cd_otimes_cd import gen_tiles1

rho = gen_tiles1(full_dim=4)`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">d</span>
              <select value={d} onChange={(e) => setD(Number(e.target.value))}>
                {DIMENSIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <span className="control-value">{basisSize} basis vectors</span>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          genTiles1Basis returns an orthonormal product basis of size d² − 2d + 1; genTiles1 is PPT and bound
          entangled on Cᵈ ⊗ Cᵈ.
        </p>
        <div className="scroll-x">
          <table className="doc-table">
            <thead>
              <tr>
                <th>d</th>
                <th className="num">basis size</th>
                <th className="num">dim(Cᵈ ⊗ Cᵈ)</th>
                <th className="num">rank(ρ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4</td>
                <td className="num">9</td>
                <td className="num">16</td>
                <td className="num">7</td>
              </tr>
              <tr>
                <td>6</td>
                <td className="num">25</td>
                <td className="num">36</td>
                <td className="num">11</td>
              </tr>
              <tr>
                <td>8</td>
                <td className="num">49</td>
                <td className="num">64</td>
                <td className="num">15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="doc-section">
        <h2>References</h2>
        <p className="doc-cite">
          D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal, "Unextendible Product Bases,
          Uncompletable Product Bases and Bound Entanglement", Commun. Math. Phys. 238, 379 (2003), Section V B,
          Theorem 5. <a href="https://arxiv.org/abs/quant-ph/9908070">arXiv:quant-ph/9908070</a>
        </p>
        <p className="doc-cite">
          C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal, "Unextendible Product
          Bases and Bound Entanglement", Phys. Rev. Lett. 82, 5385 (1999) — the general UPB-to-bound-entangled-state
          construction used here. <a href="https://arxiv.org/abs/quant-ph/9808030">arXiv:quant-ph/9808030</a>
        </p>
      </div>
    </>
  );
}

export default Gentiles;
