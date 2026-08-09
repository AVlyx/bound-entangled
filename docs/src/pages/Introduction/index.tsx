import { Link } from "react-router-dom";
import CodeBlock from "@/components/sectionComponents/CodeBlock";
import EquationLine from "@/components/Equations/EquationLine";
import Latex from "@/components/Equations/Latex";
import { CITATIONS } from "@/constants/Citations";
import { BibTex } from "react-bibtex";
import styles from "./Introduction.module.css";

const REPO = "https://github.com/AVlyx/bound-entangled";

/**
 * Landing page of the documentation. The header comes from `navigation.ts`;
 * this file holds the body of the page.
 */
function Introduction() {
  return (
    <>
      <p>
        In quantum mechanics, entanglement refers to the capacity of particles / quantum states to
        be linked in a way that measuring one gives you information on the other. It then comes as
        no surprise that entanglement and its properties are highly studied, as it plays a
        fundamental role in various fields of research. It appears in quantum communication
        protocols and in condensed matter systems, and it is also the resource that makes quantum
        computing inherently stronger than classical computing. However, not all entanglement is
        equivalent, and it is important to be able to measure how much entanglement you have in your
        system and what can be done with it.
      </p>

      <p>
        Bound entanglement refers to a class of entangled states where the entanglement is too weak
        to support distillation, meaning that it is not possible to obtain maximally entangled
        states from a larger set of bound entangled states. The converse of bound entanglement is
        known as free entanglement.
      </p>

      <div className="doc-section">
        <h3>Distillation</h3>
        <p>
          Entanglement distillation describes any protocol that transforms <Latex>{`n`}</Latex>{" "}
          copies of a resource state into a smaller number of copies <Latex>{`m`}</Latex> of the
          maximally entangled state using only LOCC (Local quantum Operations and Classical
          Communication).
        </p>
        <EquationLine>
          {`\\rho^{\\otimes n} \\rightarrow |\\Phi\\rangle\\langle\\Phi|^{\\otimes m}`}
        </EquationLine>
      </div>

      <div className="doc-section">
        <h2>The PPT criterion</h2>
        <p>
          In quantum information, the partial transpose plays a major role in the detection of
          entanglement. For the case of systems of low dimensions in{" "}
          <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^2`}</Latex> and{" "}
          <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^3`}</Latex>, any bipartite state with a
          positive partial transpose is necessarily separable. For any dimension it holds that every
          state with a negative partial transpose will be entangled.
        </p>

        <h3>The PPT criterion and bound entanglement</h3>
        <p>
          The PPT criterion also plays a major role in the detection of bound entangled states, as
          there does not exist distillable states with a positive partial transpose. So all states
          with a positive partial transpose are either bound entangled or separable. Though,
          detecting whether a state is entangled or separable is NP-hard. It is also strongly
          believed that there are NPT (Negative Partial Transpose) bound entangled states, but it
          remains an open problem and no example has been found.
        </p>
      </div>

      <div className="doc-section">
        <h2>The library</h2>
        <p>
          <code>bound-entangled</code> collects constructions of bound entangled states and
          unextendible product bases from the literature, with the same API in TypeScript and
          Python. Every state is a plain matrix, so it drops straight into whatever numerical stack
          you already use.
        </p>

        <CodeBlock>{`from bound_entangled.c3_otimes_c3 import horodecki
from toqito.state_props import is_ppt

rho = horodecki(0.4)
is_ppt(rho, dim=[3, 3])  # True — yet the state is entangled`}</CodeBlock>
      </div>

      <div className="doc-section">
        <h2>Browsing the states</h2>
        <p>
          The sidebar groups the states by the space they live in, from{" "}
          <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex> up to the multipartite families.
          Pick one to see its definition, its parameters and a matrix you can vary live.
        </p>
      </div>

      <div className="doc-section">
        <h2>Where to start</h2>
        <p>
          The{" "}
          <Link to="/states/c2-c4/horodecki">
            Horodecki <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex>
          </Link>{" "}
          state is the historical first example of bound entanglement, and{" "}
          <Link to="/states/c3-c3/horodecki">
            Horodecki <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex>
          </Link>{" "}
          is its best known relative. Both are one-parameter families, so they are a good place to
          get a feel for how the constructions behave.
        </p>
      </div>

      <div className="doc-section">
        <h2>On GitHub</h2>
        <p>The source for both implementations, and for these docs, lives in one repository.</p>
        <ul>
          <li>
            <a href={REPO}>AVlyx/bound-entangled</a> — the repository
          </li>
          <li>
            <a href={`${REPO}/tree/main/js`}>js/</a> — the TypeScript package
          </li>
          <li>
            <a href={`${REPO}/tree/main/python`}>python/</a> — the Python package
          </li>
        </ul>
      </div>
      <div className={styles.citation}>
        <h2>References</h2>
        <p>Good reference on bibpartite bound entanglement</p>
        <BibTex>{CITATIONS.boundEntanglement[0].bibTex}</BibTex>
        <a href={CITATIONS.boundEntanglement[0].arxivLink}>Link to arxiv</a>
      </div>
    </>
  );
}

export default Introduction;
