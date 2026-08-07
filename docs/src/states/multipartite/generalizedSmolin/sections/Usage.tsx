import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.multipartite import generalized_smolin

rho = generalized_smolin(systems=6)`}</UsageSection>
  );
}

export default Usage;
