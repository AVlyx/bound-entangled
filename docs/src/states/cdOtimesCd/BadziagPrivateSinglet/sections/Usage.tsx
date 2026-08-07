import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cd_otimes_cd import badziag_private_singlet

rho = badziag_private_singlet(shield_dim=2)
# rho is a 16 x 16 density matrix on C^2 ⊗ C^2 ⊗ C^2 ⊗ C^2`}</UsageSection>
  );
}

export default Usage;
