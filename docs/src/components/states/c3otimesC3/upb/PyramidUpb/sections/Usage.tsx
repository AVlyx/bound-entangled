import UsageSection from "@/components/sectionComponents/Usage";

function Usage() {
  return (
    <UsageSection>{`from bound_entangled.c3_otimes_c3.upb.pyramid_UPB import pyramid_basis, pyramid_upb

basis = pyramid_basis()  # the five product vectors, each a column 9-vector
rho = pyramid_upb()      # the bound entangled state on their complement`}</UsageSection>
  );
}

export default Usage;
