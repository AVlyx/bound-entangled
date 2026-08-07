/**
 * Documentation page for the cross-hatch state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function CrossHatch() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Properties />
      <Citation citations={CITATIONS.crossHatch} />
    </>
  );
}

export default CrossHatch;
