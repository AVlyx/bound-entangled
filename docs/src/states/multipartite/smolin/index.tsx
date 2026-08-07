/**
 * Documentation page for the Smolin state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function Smolin() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.smolin} />
    </>
  );
}

export default Smolin;
