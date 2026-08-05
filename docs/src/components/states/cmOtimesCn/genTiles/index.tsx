/**
 * Documentation page for the GenTiles2 construction. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import { useState } from "react";
import { genTiles2, genTiles2Basis } from "bound-entangled";
import CodeBlock from "../../../CodeBlock";
import LatexMatrix from "../../../Equations/LatexMatrix";
import EquationLine from "../../../Equations/EquationLine";
import Citation from "../../../Citation";

const DIM_OPTIONS: readonly [number, number][] = [
  [3, 4],
  [3, 5],
  [4, 5],
];

function GenTiles() {
  const [dimIndex, setDimIndex] = useState(0);
  const dims = DIM_OPTIONS[dimIndex];
  const rho = genTiles2({ dims });
  const basisSize = genTiles2Basis({ dims }).length;

  return (
    <>
      <p>
        GenTiles2 generalizes the C³ ⊗ C³ Tiles unextendible product basis (UPB) to arbitrary C
        <sup>m</sup> ⊗ C<sup>n</sup> dimensions. It builds a set of mutually orthonormal product
        vectors that admits no further product vector orthogonal to all of them, then takes the
        (normalized) mixture over the orthogonal complement of their span as the state.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          For dimensions <span className="math-var">[m, n]</span>, the basis consists of three
          families of product vectors (DiVincenzo, Mor, Shor, Smolin, Terhal, Section V B, Eqs.
          5.9–5.11):
        </p>
        <EquationLine>
          {"|S_j⟩ = (|j⟩ − |j+1 mod m⟩) / √2 ⊗ |j⟩,  j = 0, …, m − 1"}
        </EquationLine>
        <p className="equation-caption">m "short" tile states.</p>
        <EquationLine>
          {"|L_{jk}⟩ = |j⟩ ⊗ (normalized combination of |j+i+1 mod m⟩ and |i+2⟩," +
            " weighted by roots of unity ω^{ik}, ω = e^{2πi/(n−2)})"}
        </EquationLine>
        <p className="equation-caption">
          m(n − 3) "long" tile states, <span className="math-var">j</span> = 0, …,{" "}
          <span className="math-var">m</span> − 1, <span className="math-var">k</span> = 1, …,{" "}
          <span className="math-var">n</span> − 3.
        </p>
        <EquationLine>{"|F⟩ = (Σ_{i,j} |i⟩ ⊗ |j⟩) / √(mn)"}</EquationLine>
        <p className="equation-caption">one "stopper" state, for a total of mn − 2m + 1 vectors.</p>
        <p>
          Given the basis <span className="math-var">v</span>
          <sub>1</sub>, …, <span className="math-var">v</span>
          <sub>N</sub> (with <span className="math-var">N</span> = mn − 2m + 1), the state is the
          uniform mixture over the orthogonal complement of their span:
        </p>
        <EquationLine>{"ρ = (I − Σ_i |v_i⟩⟨v_i|) / (mn − N)"}</EquationLine>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>dims</dt>
          <dd>
            The dimensions <span className="math-var">[m, n]</span> of the C<sup>m</sup> ⊗ C
            <sup>n</sup> system. Requires <span className="math-var">n</span> &gt; 3,{" "}
            <span className="math-var">m</span> ≥ 3, and <span className="math-var">n</span> ≥{" "}
            <span className="math-var">m</span>; note that m = n = 3 does not itself yield a UPB,
            which is why n &gt; 3 is required.
          </dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock>{`from bound_entangled.cm_otimes_cn import gen_tiles2

rho = gen_tiles2((3, 4))`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="example">
          <div className="controls">
            <div className="control">
              <span className="control-label">dims [m, n]</span>
              <select value={dimIndex} onChange={(e) => setDimIndex(Number(e.target.value))}>
                {DIM_OPTIONS.map(([m, n], i) => (
                  <option key={`${m}-${n}`} value={i}>
                    [{m}, {n}]
                  </option>
                ))}
              </select>
              <span className="control-value">
                {basisSize} basis vectors, {dims[0] * dims[1]}×{dims[0] * dims[1]}
              </span>
            </div>
          </div>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="ρ =" />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
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
      </div>

      <Citation>
        <p>
          D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal, "Unextendible Product
          Bases, Uncompletable Product Bases and Bound Entanglement", Commun. Math. Phys. 238, 379
          (2003), Section V B, Theorem 6.{" "}
          <a href="https://arxiv.org/abs/quant-ph/9908070">arXiv:quant-ph/9908070</a>
        </p>
        <p>
          C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
          "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett. 82, 5385 (1999).{" "}
          <a href="https://arxiv.org/abs/quant-ph/9808030">arXiv:quant-ph/9808030</a>
        </p>
      </Citation>
    </>
  );
}

export default GenTiles;
