function Introduction() {
  return (
    <p>
      A quantum grid state identifies the vertices of an m × n grid with the product basis{" "}
      <span className="math">
        {"{|"}
        <span className="math-var">i</span>, <span className="math-var">j</span>
        {"⟩}"}
      </span>{" "}
      of C<sup>m</sup> ⊗ C<sup>n</sup>, and turns a graph on those vertices into a mixed state:
      the uniform mixture of the pure states carried by its edges. It is a general,
      graph-theoretic route to bound entanglement — whether a particular choice of edges gives an
      entangled or a PPT state is a combinatorial property of the graph.
    </p>
  );
}

export default Introduction;
