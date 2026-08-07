import Latex from "@/components/Equations/Latex";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <p>
      The <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex> Horodecki state is one of the
      first example found of a bound entangled, found in the same year as its{" "}
      <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex> construction state. Also{" "}
      <Link to="/states/c2-c4/horodecki">
        Horodecki <Latex>{`\\mathbb{C}^2 \\otimes \\mathbb{C}^4`}</Latex>
      </Link>
    </p>
  );
}

export default Introduction;
