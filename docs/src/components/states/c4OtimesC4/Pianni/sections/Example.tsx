import { useState } from "react";
import { pianni, projectorIj } from "bound-entangled";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import ExampleSection from "@/components/sectionComponents/Example";
import { PAULI_NAMES, type PauliDigit } from "../shared";

function Example() {
  const [i, setI] = useState<PauliDigit>(1);
  const [j, setJ] = useState<PauliDigit>(1);

  return (
    <ExampleSection>
      <p>
        The 16×16 Pianni state itself has no free parameter; instead, explore the building block{" "}
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
        <LatexMatrix value={projectorIj(i, j)} precision={2} dimZeros label="Pᵢⱼ =" />
      </div>
      <p className="equation-caption">
        The full state ρ = pianni(), the (1/6)-weighted, permuted sum of the six Pᵢⱼ listed above:
      </p>
      <div className="scroll-x">
        <LatexMatrix value={pianni()} precision={2} dimZeros label="ρ =" />
      </div>
    </ExampleSection>
  );
}

export default Example;
