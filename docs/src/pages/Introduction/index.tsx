import { Link } from "react-router-dom";
import CodeBlock from "../../components/CodeBlock";

/**
 * Landing page of the documentation. The header comes from `navigation.ts`;
 * this file holds the body of the page.
 */
function Introduction() {
  return (
    <>
      <p>
        <code>bound-entangled</code> collects constructions of bound entangled states and
        unextendible product bases from the literature, with the same API in TypeScript and
        Python. Every state is a plain matrix, so it drops straight into whatever numerical
        stack you already use.
      </p>

      <CodeBlock
        code={`from bound_entangled.c3_otimes_c3 import horodecki
from toqito.state_props import is_ppt

rho = horodecki(0.4)
is_ppt(rho, dim=[3, 3])  # True — yet the state is entangled`}
      />

      <div className="doc-section">
        <h2>Browsing the states</h2>
        <p>
          The sidebar groups the states by the space they live in, from 2 ⊗ 4 up to the
          multipartite families. Pick one to see its definition, its parameters and a matrix you
          can vary live.
        </p>
      </div>

      <div className="doc-section">
        <h2>Where to start</h2>
        <p>
          The <Link to="/states/c2-c4/horodecki">Horodecki 2 ⊗ 4</Link> state is the historical
          first example of bound entanglement, and{" "}
          <Link to="/states/c3-c3/horodecki">Horodecki 3 ⊗ 3</Link> is its best known relative.
          Both are one-parameter families, so they are a good place to get a feel for how the
          constructions behave.
        </p>
      </div>
    </>
  );
}

export default Introduction;
