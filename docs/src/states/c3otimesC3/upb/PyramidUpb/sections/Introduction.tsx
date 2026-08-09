import Latex from "@/components/Equations/Latex";

function Introduction() {
  return (
    <p>
      The Pyramid UPB is a second unextendible product basis on{" "}
      <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex> from Bennett, DiVincenzo, Mor, Shor,
      Smolin and Terhal, built from vectors pointing at the vertices of a pentagonal pyramid rather
      than the grid the Tiles basis uses. As with the Tiles UPB, the bound entangled state built
      from it is the normalised projector onto its orthogonal complement.
    </p>
  );
}

export default Introduction;
