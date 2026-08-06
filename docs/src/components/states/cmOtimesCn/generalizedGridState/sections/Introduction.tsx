import { Link } from "react-router-dom";

function Introduction() {
  return (
    <p>
      The generalized grid state extends the <Link to="/states/cm-cn/grid-state">grid state</Link>{" "}
      by letting a hyperedge span any number of vertices of the m × n grid, not just two. Each
      hyperedge contributes the (unnormalized) sum of its vertices' basis states rather than their
      normalized difference, and the mixture is trace-normalized rather than divided by an edge
      count.
    </p>
  );
}

export default Introduction;
