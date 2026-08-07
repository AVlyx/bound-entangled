import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cm_otimes_cn import gen_tiles2

rho = gen_tiles2((3, 4))`}</UsageSection>
  );
}

export default Usage;
