import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Properties from "./sections/Properties";
import Citation from "./sections/Citation";

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
      <Properties />
      <Citation />
    </>
  );
}

export default Horodecki3by3;
