function Introduction() {
  return (
    <p>
      Kay's generalization of Smolin's state to <span className="math">2n</span> qubits, built
      from equal-weight sums of the fully-aligned Pauli words{" "}
      <span className="math">
        X<sup>⊗2n</sup>
      </span>
      ,{" "}
      <span className="math">
        Y<sup>⊗2n</sup>
      </span>{" "}
      and{" "}
      <span className="math">
        Z<sup>⊗2n</sup>
      </span>
      . It reduces to the original Smolin state at <span className="math-var">systems = 4</span>,
      and is bound entangled for every even <span className="math-var">systems ≥ 4</span>.
    </p>
  );
}

export default Introduction;
