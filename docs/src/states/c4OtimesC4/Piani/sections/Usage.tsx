import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.c4_otimes_c4 import piani

rho = piani()  # 16x16 density matrix on C⁴ ⊗ C⁴`}</UsageSection>
  );
}

export default Usage;
