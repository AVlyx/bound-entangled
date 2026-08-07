import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

/**
 * Documentation page for the 3 x 3 Horodecki state. The header (title, Hilbert
 * space, signature) comes from `navigation.ts`; this file holds the body.
 */
function Horodecki3by3() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.horodecki} />
    </>
  );
}

export default Horodecki3by3;
