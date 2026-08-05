import { useState } from "react";
import { parametrizedBasis, parametrizedUpb } from "bound-entangled";
import type { ParametrizedUpbOptions } from "bound-entangled";
import type { Cell } from "../../../../LatexMatrix";
import CodeBlock from "../../../../CodeBlock";
import LatexMatrix from "../../../../LatexMatrix";
import Citation from "../../../../Citation";

/** The angle at which both parties' gamma and theta reduce this family to the Pyramid UPB. */
const PYRAMID_ANGLE = Math.acos((Math.sqrt(5) - 1) / 2);

/** A mathjs `Complex`, matched structurally (entries may be real or complex here). */
interface ComplexEntry {
  re: number;
  im: number;
}

function isComplexEntry(x: unknown): x is ComplexEntry {
  return typeof x === "object" && x !== null && typeof (x as ComplexEntry).re === "number";
}

// Floating-point residue (~1e-16) from cos/sin/exp arithmetic would otherwise show up as
// e.g. "2.6e-17" instead of a clean zero; snap anything this small down to exactly 0.
const ZERO_TOL = 1e-9;

function clean(x: number | ComplexEntry): Cell {
  if (isComplexEntry(x)) {
    return { re: Math.abs(x.re) < ZERO_TOL ? 0 : x.re, im: Math.abs(x.im) < ZERO_TOL ? 0 : x.im };
  }
  return Math.abs(x) < ZERO_TOL ? 0 : x;
}

function cleanVector(v: { toArray(): unknown }): Cell[] {
  return (v.toArray() as unknown as (number | ComplexEntry)[]).map(clean);
}

function cleanMatrix(m: { toArray(): unknown }): Cell[][] {
  return (m.toArray() as unknown as (number | ComplexEntry)[][]).map((row) => row.map(clean));
}

/**
 * The normalisation `partyVectors` divides by internally (see
 * `js/src/c3OtimesC3/upb/parametrizedUpb.ts`). It vanishes only when `cos(gamma) = 0` and
 * `cos(theta) = 0` at once, which would divide by zero; the demo checks this before calling the
 * factory so the page never renders NaN.
 */
function partyNormalization(gamma: number, theta: number): number {
  return Math.sqrt(Math.cos(gamma) ** 2 + Math.sin(gamma) ** 2 * Math.cos(theta) ** 2);
}

interface AngleControlProps {
  label: string;
  value: number;
  setValue: (next: number) => void;
  max: number;
}

/** A single angle slider, in radians, styled like the shared `Slider` but unbounded by [0, 1]. */
function AngleControl({ label, value, setValue, max }: AngleControlProps) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={0.001}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <span className="control-value">{value.toFixed(2)}</span>
    </div>
  );
}

/**
 * Documentation page for the parametrized UPB. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function ParametrizedUpb() {
  const [gammaA, setGammaA] = useState<number>(PYRAMID_ANGLE);
  const [thetaA, setThetaA] = useState<number>(PYRAMID_ANGLE);
  const [phiA, setPhiA] = useState<number>(0);
  const [gammaB, setGammaB] = useState<number>(PYRAMID_ANGLE);
  const [thetaB, setThetaB] = useState<number>(PYRAMID_ANGLE);
  const [phiB, setPhiB] = useState<number>(0);

  const options: ParametrizedUpbOptions = { gammaA, thetaA, phiA, gammaB, thetaB, phiB };
  const valid =
    partyNormalization(gammaA, thetaA) > 1e-6 && partyNormalization(gammaB, thetaB) > 1e-6;

  let basisColumns: Cell[][] | undefined;
  let rho: Cell[][] | undefined;
  if (valid) {
    const basisArrays = parametrizedBasis(options).map(cleanVector);
    basisColumns = basisArrays[0].map((_, row) => basisArrays.map((v) => v[row]));
    rho = cleanMatrix(parametrizedUpb(options));
  }

  return (
    <>
      <p>
        The Parametrized UPB is a six-parameter family of unextendible product bases on ℂ³ ⊗ ℂ³ from
        DiVincenzo, Mor, Shor, Smolin and Terhal, generalizing the Tiles and Pyramid UPBs: each
        choice of the six angles gives five product vectors with the same orthogonality structure,
        and hence the same construction of a bound entangled state on their orthogonal complement.
      </p>

      <div className="doc-section">
        <h2>Definition</h2>
        <p>
          Each party (Alice with angles γ_A, θ_A, φ_A; Bob with γ_B, θ_B, φ_B) contributes five
          vectors in ℂ³, built from the same formula with N = √(cos²γ + sin²γ cos²θ):
        </p>
        <div className="equation">
          |v₀⟩ = |0⟩
          <br />
          |v₁⟩ = |1⟩
          <br />
          |v₂⟩ = cosθ |0⟩ + sinθ |2⟩
          <br />
          |v₃⟩ = sinγ sinθ |0⟩ + cosγ e^(iφ) |1⟩ − sinγ cosθ |2⟩
          <br />
          |v₄⟩ = (sinγ cosθ e^(iφ)/N) |1⟩ + (cosγ/N) |2⟩
        </div>
        <p>
          Alice's and Bob's vectors are then paired in a shifted order — |ψᵢ⟩ = |aᵢ⟩ ⊗ |b_σ(i)⟩ with
          σ = (1, 3, 0, 2, 4) — rather than index by index. This mismatch is what forces the
          resulting basis to be unextendible: every pair of the five |ψᵢ⟩ is orthogonal, either
          because Alice's factors are orthogonal or because Bob's are, covering all ten pairs (the
          orthogonality graph is the same for every UPB on ℂ³ ⊗ ℂ³). As for the Tiles and Pyramid
          UPBs, the bound entangled state is the uniform mixture over the 4-dimensional orthogonal
          complement of the five |ψᵢ⟩:
        </p>
        <div className="equation equation-boxed">
          ρ = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / (9 − 5) = (I − Σᵢ |ψᵢ⟩⟨ψᵢ|) / 4
        </div>
        <p>
          At φ_A = φ_B = 0 and θ_A = θ_B = γ_A = γ_B = arccos((√5 − 1)/2) this reduces to the
          Pyramid UPB; at φ_A = φ_B = 0 and θ_A = θ_B = γ_A = γ_B = 3π/4 it reduces to the Tiles
          UPB.
        </p>
      </div>

      <div className="doc-section">
        <h2>Parameters</h2>
        <dl className="doc-dl">
          <dt>gammaA</dt>
          <dd>
            Alice's γ angle. Any real value with cos γ_A ≠ 0 and sin γ_A ≠ 0 — multiples of π/2 are
            excluded.
          </dd>
          <dt>thetaA</dt>
          <dd>
            Alice's θ angle. Any real value with cos θ_A ≠ 0 and sin θ_A ≠ 0, the same restriction
            as gammaA.
          </dd>
          <dt>phiA</dt>
          <dd>Alice's phase angle, entering as e^(iφ_A). Unrestricted.</dd>
          <dt>gammaB</dt>
          <dd>Bob's γ angle, subject to the same restriction as gammaA.</dd>
          <dt>thetaB</dt>
          <dd>Bob's θ angle, subject to the same restriction as thetaA.</dd>
          <dt>phiB</dt>
          <dd>Bob's phase angle, entering as e^(iφ_B). Unrestricted.</dd>
        </dl>
      </div>

      <div className="doc-section">
        <h2>Usage</h2>
        <CodeBlock
          code={`from math import acos, sqrt
from bound_entangled.c3_otimes_c3.upb.parametrized_UPB import parametrized_basis, parametrized_upb

angle = acos((sqrt(5) - 1) / 2)  # the Pyramid UPB's angle
angles = dict(gamma_a=angle, teta_a=angle, phi_a=0, gamma_b=angle, teta_b=angle, phi_b=0)

basis = parametrized_basis(**angles)  # the five product vectors, each a column 9-vector
rho = parametrized_upb(**angles)      # the bound entangled state on their complement`}
        />
      </div>

      <div className="doc-section">
        <h2>Try it</h2>
        <div className="callout callout-tip">
          <span className="callout-title">Tip</span>
          <p>
            The sliders start at φ_A = φ_B = 0 and γ = θ = arccos((√5 − 1)/2) for both parties, the
            angles that reproduce the Pyramid UPB. Drag them to explore the wider family.
          </p>
        </div>
        <div className="example">
          <div className="controls">
            <AngleControl label="γ_A" value={gammaA} setValue={setGammaA} max={Math.PI} />
            <AngleControl label="θ_A" value={thetaA} setValue={setThetaA} max={Math.PI} />
            <AngleControl label="φ_A" value={phiA} setValue={setPhiA} max={2 * Math.PI} />
          </div>
          <div className="controls">
            <AngleControl label="γ_B" value={gammaB} setValue={setGammaB} max={Math.PI} />
            <AngleControl label="θ_B" value={thetaB} setValue={setThetaB} max={Math.PI} />
            <AngleControl label="φ_B" value={phiB} setValue={setPhiB} max={2 * Math.PI} />
          </div>
          {valid && basisColumns && rho ? (
            <>
              <div className="example-output">
                <LatexMatrix value={basisColumns} precision={3} label="[|ψ₀⟩ ⋯ |ψ₄⟩] =" />
              </div>
              <p className="equation-caption">
                the five basis vectors as columns, each a flat 9-vector of ℂ³ ⊗ ℂ³.
              </p>
              <div className="example-output">
                <LatexMatrix value={rho} precision={2} label="ρ =" />
              </div>
              <p className="equation-caption">the resulting 9×9 bound entangled state.</p>
            </>
          ) : (
            <div className="callout callout-warn">
              <span className="callout-title">Invalid parameters</span>
              <p>
                cos γ and cos θ cannot both vanish for the same party: this configuration is too
                close to γ = π/2 with θ = π/2 (or the equivalent points), where the construction
                divides by zero. Move one of the sliders away from that corner.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="doc-section">
        <h2>Properties</h2>
        <p>
          <span className="badge">PPT</span> <span className="badge">entangled</span>{" "}
          <span className="badge">rank 4</span>
        </p>
        <p>
          For any valid choice of the six angles, ρ is a 9×9 density matrix (dimension ℂ³ ⊗ ℂ³):
          Hermitian, trace one, and positive semidefinite, with a positive partial transpose.
          Because the five vectors are orthonormal, ρ has rank 4 with every nonzero eigenvalue equal
          to 1/4, and ρ|ψᵢ⟩ = 0 for each basis vector. It has no product vector in its range, so it
          is entangled despite being PPT: a bound entangled state, for every one of the angles in
          the family.
        </p>
      </div>

      <Citation>
        <p>
          D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal, "Unextendible Product
          Bases, Uncompletable Product Bases and Bound Entanglement", Commun. Math. Phys. 238, 379
          (2003), Section IV A.{" "}
          <a href="https://arxiv.org/abs/quant-ph/9908070">arXiv:quant-ph/9908070</a>
        </p>
        <p>
          C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
          "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett. 82, 5385 (1999) —
          the Tiles and Pyramid UPBs this family generalizes.{" "}
          <a href="https://arxiv.org/abs/quant-ph/9808030">arXiv:quant-ph/9808030</a>
        </p>
      </Citation>
    </>
  );
}

export default ParametrizedUpb;
