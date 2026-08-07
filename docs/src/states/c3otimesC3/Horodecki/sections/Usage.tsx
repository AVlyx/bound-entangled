import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>
      {`from bound_entangled.c3_otimes_c3 \n import horodecki rho = horodecki(0.5) # 9x9 density matrix`}
    </UsageSection>
  );
}

export default Usage;
