import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

/**
 * Documentation page for the Piani state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Piani() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Properties />
      <Citation citations={CITATIONS.piani} />
    </>
  );
}

export default Piani;
