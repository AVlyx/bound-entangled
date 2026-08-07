/**
 * Documentation page for the generalized grid state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function GeneralizedGridState() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.generalizedGridState} />
    </>
  );
}

export default GeneralizedGridState;
