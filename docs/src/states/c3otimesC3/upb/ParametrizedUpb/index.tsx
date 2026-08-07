import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

/**
 * Documentation page for the parametrized UPB. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function ParametrizedUpb() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.parametrizedUpb} />
    </>
  );
}

export default ParametrizedUpb;
