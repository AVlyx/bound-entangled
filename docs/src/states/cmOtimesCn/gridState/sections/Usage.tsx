import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cm_otimes_cn import grid_state

rho = grid_state(
    (2, 3),
    ((0, 0), (0, 1)),
    ((0, 1), (0, 2)),
    ((0, 0), (1, 0)),
)`}</UsageSection>
  );
}

export default Usage;
