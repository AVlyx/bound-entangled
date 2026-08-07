/**
 * Documentation page for the quasi-DS states. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function QuasiDs() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Properties />
      <Citation citations={CITATIONS.quasiDs} />
    </>
  );
}

export default QuasiDs;
