import Latex from "@/components/Equations/Latex";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <p>
      The <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex> Horodecki state was the first
      example found of an entangled PPT state as well as the first example of a bound entangled
      state. Also <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex> is the smallest dimension
      that admits bound entanglement. See also{" "}
      <Link to="/states/c3-c3/horodecki">
        Horodecki <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex>
      </Link>
    </p>
  );
}

export default Introduction;
