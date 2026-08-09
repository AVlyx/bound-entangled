import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";
import Latex from "@/components/Equations/Latex";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The basis is built from a "half-filled" vector on C<span className="math-var">d</span>, a
        sum over half of the computational basis states weighted by roots of unity:
      </p>
      <EquationLine>
        {
          "|\\omega_m(\\text{shift})\\rangle = \\sum_{j=0}^{d/2-1} \\omega^{jm} |(j+\\text{shift})\\bmod d\\rangle,\\ \\omega = \\exp(4\\pi i/d)"
        }
      </EquationLine>
      <p>
        For m = 1, …, d/2 − 1 and k = 0, …, d − 1, two families of product vectors are formed from
        it — a "vertical" and a "horizontal" tile — together with a single "stopper" state:
      </p>
      <EquationLine>
        {"|V_{mk}\\rangle = |k\\rangle \\otimes |\\omega_m(k+1)\\rangle,\\ |H_{mk}\\rangle = |\\omega_m(k)\\rangle \\otimes |k\\rangle," +
          "\\ |F\\rangle = \\tfrac1d \\sum_i \\sum_j |i\\rangle \\otimes |j\\rangle"}
      </EquationLine>
      <p>
        Together these d² − 2d + 1 vectors form the GenTiles1 UPB (genTiles1Basis). The state is the
        uniform mixture over its orthogonal complement,
      </p>
      <EquationLine>{"\\rho = \\tfrac{I - \\sum_i |v_i\\rangle\\langle v_i|}{2d-1}"}</EquationLine>
      <p>
        where the sum runs over the d² − 2d + 1 basis vectors and I is the identity on{" "}
        <Latex>{`\\mathbb{C}^d \\otimes \\mathbb{C}^d`}</Latex>.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
