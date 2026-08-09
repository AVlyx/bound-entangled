import Latex from "@/components/Equations/Latex";

function Introduction() {
  return (
    <p>
      A bound entangled state on <Latex>{`\\mathbb{C}^4 \\otimes \\mathbb{C}^4`}</Latex>, built as a
      uniform mixture of six generalized Bell projectors and then regrouped into two ququart parties
      so that it is positive under partial transpose. It originates as an example of a quantum
      dynamical semigroup that cannot be written as a mixture of decomposable ones.
    </p>
  );
}

export default Introduction;
