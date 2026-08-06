import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "./sections/Citation";

/**
 * Documentation page for the 2 x 4 Horodecki state. The header (title, Hilbert
 * space, signature) comes from `navigation.ts`; this file holds the body.
 */
function Horodecki2by4() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      <Properties />
      <Citation />
    </>
  );
}

export default Horodecki2by4;
