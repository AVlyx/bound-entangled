import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "./sections/Citation";

/**
 * Documentation page for the Pianni state. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function Pianni() {
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

export default Pianni;
