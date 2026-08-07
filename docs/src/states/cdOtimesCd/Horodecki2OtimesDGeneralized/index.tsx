import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

/**
 * Documentation page for the generalized Horodecki 2 x d state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Horodecki2OtimesDGeneralized() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.generalizedHorodecki} />
    </>
  );
}

export default Horodecki2OtimesDGeneralized;
