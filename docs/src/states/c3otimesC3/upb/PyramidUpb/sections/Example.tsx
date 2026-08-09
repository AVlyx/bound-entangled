import { pyramidBasis, pyramidUpb } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";
import Latex from "@/components/Equations/Latex";

// Floating-point residue (~1e-16) from cos/sin arithmetic would otherwise show up as
// e.g. "2.6e-17" instead of a clean zero; snap anything this small down to exactly 0.
const ZERO_TOL = 1e-9;
const clean = (x: number): number => (Math.abs(x) < ZERO_TOL ? 0 : x);
const cleanVector = (v: { toArray(): unknown }): number[] =>
  (v.toArray() as unknown as number[]).map(clean);
const cleanMatrix = (m: { toArray(): unknown }): number[][] =>
  (m.toArray() as unknown as number[][]).map((row) => row.map(clean));

function Example() {
  const basisArrays = pyramidBasis().map(cleanVector);
  const basisColumns = basisArrays[0].map((_, row) => basisArrays.map((v) => v[row]));
  const rho = cleanMatrix(pyramidUpb());

  return (
    <ExampleSection copyValue={rho}>
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
    </ExampleSection>
  );
}

export default Example;
