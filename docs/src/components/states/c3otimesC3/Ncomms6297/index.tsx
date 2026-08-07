/**
 * Documentation page for the ncomms6297 state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function Ncomms6297() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Properties />
      <Citation citations={CITATIONS.ncomms6297} />
    </>
  );
}

export default Ncomms6297;
