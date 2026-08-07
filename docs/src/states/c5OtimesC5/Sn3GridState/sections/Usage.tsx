import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.c5_otimes_c5 import sn3_grid_state

rho = sn3_grid_state()  # 25x25 density matrix on C⁵ ⊗ C⁵`}</UsageSection>
  );
}

export default Usage;
