import Latex from "@/components/Equations/Latex";

function Introduction() {
  return (
    <p>
      The Tiles UPB is the original unextendible product basis of Bennett, DiVincenzo, Mor, Shor,
      Smolin and Terhal: five orthonormal product vectors on{" "}
      <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex>, laid out like tiles on a 3×3 grid,
      chosen so that no product vector is orthogonal to all five at once. The bound entangled state
      built from it is the normalised projector onto the orthogonal complement of the basis.
    </p>
  );
}

export default Introduction;
