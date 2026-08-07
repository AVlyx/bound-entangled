import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.multipartite import quasi_ds

rho = quasi_ds(n=3, z=1, sigma=1)`}</UsageSection>
  );
}

export default Usage;
