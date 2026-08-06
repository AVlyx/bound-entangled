import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.c3_otimes_c3 import steering_state

rho = steering_state(0.5, 0.5)`}</UsageSection>
  );
}

export default Usage;
