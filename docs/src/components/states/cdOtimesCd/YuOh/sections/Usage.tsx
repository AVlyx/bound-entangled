import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cd_otimes_cd import is_valid_yu_oh_input, yu_oh

if is_valid_yu_oh_input(full_dim=3, x=0.5, y=0.1):
    rho = yu_oh(full_dim=3, x=0.5, y=0.1)`}</UsageSection>
  );
}

export default Usage;
