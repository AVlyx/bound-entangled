import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

/**
 * Documentation page for the Tiles UPB. The header (title and Hilbert space) comes
 * from `navigation.ts`; this file holds the body of the page.
 */
function TilesUpb() {
  return (
    <>
      <Introduction />
      <Definition />
      <Usage />
      <Example />
      <Citation citations={CITATIONS.upbTilesPyramid} />
    </>
  );
}

export default TilesUpb;
