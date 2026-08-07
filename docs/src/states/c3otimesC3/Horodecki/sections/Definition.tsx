import DefinitionSection from "@/components/sectionComponents/Definition";
import LatexMatrix from "@/components/Equations/LatexMatrix";
import Latex from "@/components/Equations/Latex";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The <Latex>{`\\mathbb{C}^3 \\otimes \\mathbb{C}^3`}</Latex> is defined as
      </p>

      <LatexMatrix
        value={[
          ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
          [0, "a", 0, 0, 0, 0, 0, 0, 0],
          [0, 0, "a", 0, 0, 0, 0, 0, 0],
          [0, 0, 0, "a", 0, 0, 0, 0, 0],
          ["a", 0, 0, 0, "a", 0, 0, 0, "a"],
          [0, 0, 0, 0, 0, "a", 0, 0, 0],
          [0, 0, 0, 0, 0, 0, "\\tfrac{1+a}{2}", 0, "\\tfrac{\\sqrt{1-a^2}}{2}"],
          [0, 0, 0, 0, 0, 0, 0, "a", 0],
          ["a", 0, 0, 0, "a", 0, "\\tfrac{\\sqrt{1-a^2}}{2}", 0, "\\tfrac{1+a}{2}"],
        ]}
        label="\rho(a) = \tfrac{1}{8a+1}\cdot"
      />
      <p>
        for <Latex>a</Latex> in [0,1]. It is separable for <Latex>a=0</Latex> and <Latex>a=1</Latex>{" "}
        and entangled on the rest of the range
      </p>
    </DefinitionSection>
  );
}

export default Definition;
