import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.c2_otimes_c4 import horodecki

rho = horodecki(0.5)  # 8x8 density matrix`}</UsageSection>
  );
}

export default Usage;
