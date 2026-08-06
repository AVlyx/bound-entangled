import DefinitionSection from "@/components/sectionComponents/Definition";
import EquationLine from "@/components/Equations/EquationLine";

function Definition() {
  return (
    <DefinitionSection>
      <p>
        The basis is built from a "half-filled" vector on C<span className="math-var">d</span>, a
        sum over half of the computational basis states weighted by roots of unity:
      </p>
      <EquationLine>
        {"|ω_m(shift)⟩ = Σ_{j=0}^{d/2 − 1} ω^{jm} |(j + shift) mod d⟩, ω = exp(4πi / d)"}
      </EquationLine>
      <p>
        For m = 1, …, d/2 − 1 and k = 0, …, d − 1, two families of product vectors are formed from
        it — a "vertical" and a "horizontal" tile — together with a single "stopper" state:
      </p>
      <EquationLine>
        {"|V_{mk}⟩ = |k⟩ ⊗ |ω_m(k + 1)⟩, |H_{mk}⟩ = |ω_m(k)⟩ ⊗ |k⟩," +
          " |F⟩ = (1 / d) Σᵢ Σⱼ |i⟩ ⊗ |j⟩"}
      </EquationLine>
      <p>
        Together these d² − 2d + 1 vectors form the GenTiles1 UPB (genTiles1Basis). The state is
        the uniform mixture over its orthogonal complement,
      </p>
      <EquationLine>ρ = (I − Σᵢ |vᵢ⟩⟨vᵢ|) / (2d − 1)</EquationLine>
      <p>
        where the sum runs over the d² − 2d + 1 basis vectors and I is the identity on Cᵈ ⊗ Cᵈ.
      </p>
    </DefinitionSection>
  );
}

export default Definition;
