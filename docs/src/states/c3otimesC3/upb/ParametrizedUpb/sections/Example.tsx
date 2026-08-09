import { useState } from "react";
import { parametrizedBasis, parametrizedUpb } from "bound-entangled";
import type { ParametrizedUpbOptions } from "bound-entangled";
import type { Cell } from "@/components/Equations/LatexMatrix";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";
import Latex from "@/components/Equations/Latex";

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

function Example() {
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
    <ExampleSection copyValue={rho}>
      <div className="callout callout-tip">
        <span className="callout-title">Tip</span>
        <p>
          The sliders start at φ_A = φ_B = 0 and γ = θ = arccos((√5 − 1)/2) for both parties, the
          angles that reproduce the Pyramid UPB. Drag them to explore the wider family.
        </p>
      </div>
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
            <LatexMatrix
              value={basisColumns}
              precision={3}
              label="[|\psi_0\rangle \cdots |\psi_4\rangle] ="
            />
          </div>
          <p className="equation-caption">
            the five basis vectors as columns, each a flat 9-vector of{" "}
            <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex>.
          </p>
          <div className="example-output">
            <LatexMatrix value={rho} precision={2} label="\rho =" />
          </div>
          <p className="equation-caption">the resulting 9×9 bound entangled state.</p>
        </>
      ) : (
        <div className="callout callout-warn">
          <span className="callout-title">Invalid parameters</span>
          <p>
            cos γ and cos θ cannot both vanish for the same party: this configuration is too close
            to γ = π/2 with θ = π/2 (or the equivalent points), where the construction divides by
            zero. Move one of the sliders away from that corner.
          </p>
        </div>
      )}
    </ExampleSection>
  );
}

export default Example;
