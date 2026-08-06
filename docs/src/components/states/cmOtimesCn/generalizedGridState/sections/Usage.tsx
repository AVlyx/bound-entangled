import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cm_otimes_cn import generalized_grid_state

rho = generalized_grid_state(
    (3, 3),
    [(0, 0), (1, 1)],
    [(0, 1), (2, 2)],
)`}</UsageSection>
  );
}

export default Usage;
