import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.cd_otimes_cd import horodecki_2_by_d_generalized

rho = horodecki_2_by_d_generalized(second_dim_d=4, b=0.5)`}</UsageSection>
  );
}

export default Usage;
