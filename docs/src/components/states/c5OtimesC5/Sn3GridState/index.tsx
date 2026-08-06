import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "./sections/Citation";

/**
 * Documentation page for the SN3 grid state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Sn3GridState() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Properties />
      <Citation />
    </>
  );
}

export default Sn3GridState;
