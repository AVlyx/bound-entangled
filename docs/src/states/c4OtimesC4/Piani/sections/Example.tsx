import { useState } from "react";
import { piani, projectorIj } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";
import { PAULI_NAMES, type PauliDigit } from "../shared";

function Example() {
  const [i, setI] = useState<PauliDigit>(1);
  const [j, setJ] = useState<PauliDigit>(1);
  const rho = piani();

  return (
    <ExampleSection copyValue={rho}>
      <p>
        The 16×16 Piani state itself has no free parameter; instead, explore the building block{" "}
        <span className="math">Pᵢⱼ = projectorIj(i, j)</span> that the mixture is made from.
      </p>
      <div className="controls">
        <div className="control">
          <span className="control-label">i</span>
          <select value={i} onChange={(e) => setI(Number(e.target.value) as PauliDigit)}>
            {PAULI_NAMES.map((name, index) => (
              <option key={name} value={index}>
                {index} ({name})
              </option>
            ))}
          </select>
        </div>
        <div className="control">
          <span className="control-label">j</span>
          <select value={j} onChange={(e) => setJ(Number(e.target.value) as PauliDigit)}>
            {PAULI_NAMES.map((name, index) => (
              <option key={name} value={index}>
                {index} ({name})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="example-output">
        <LatexMatrix value={projectorIj(i, j)} precision={2} dimZeros label="P_{ij} =" />
      </div>
      <p className="equation-caption">
        The full state ρ = piani(), the (1/6)-weighted sum of the six Pᵢⱼ listed above:
      </p>
      <div className="scroll-x">
        <LatexMatrix value={rho} precision={2} dimZeros label="\rho =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
