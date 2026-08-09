import Latex from "@/components/Equations/Latex";

function Introduction() {
  return (
    <p>
      The Parametrized UPB is a six-parameter family of unextendible product bases on{" "}
      <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex> from DiVincenzo, Mor, Shor, Smolin and
      Terhal, generalizing the Tiles and Pyramid UPBs: each choice of the six angles gives five
      product vectors with the same orthogonality structure, and hence the same construction of a
      bound entangled state on their orthogonal complement.
    </p>
  );
}

export default Introduction;
