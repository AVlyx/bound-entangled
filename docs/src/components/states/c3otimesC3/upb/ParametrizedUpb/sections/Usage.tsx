import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from math import acos, sqrt
from bound_entangled.c3_otimes_c3.upb.parametrized_UPB import parametrized_basis, parametrized_upb

angle = acos((sqrt(5) - 1) / 2)  # the Pyramid UPB's angle
angles = dict(gamma_a=angle, teta_a=angle, phi_a=0, gamma_b=angle, teta_b=angle, phi_b=0)

basis = parametrized_basis(**angles)  # the five product vectors, each a column 9-vector
rho = parametrized_upb(**angles)      # the bound entangled state on their complement`}</UsageSection>
  );
}

export default Usage;
