import Introduction from "./sections/Introduction";
import Definition from "./sections/Definition";
import Parameters from "./sections/Parameters";
import Usage from "./sections/Usage";
import Example from "./sections/Example";
import Citation from "@/components/sectionComponents/Citation";
import { CITATIONS } from "@/constants/Citations";

function Horodecki2by4() {
  return (
    <>
      <Introduction />
      <Definition />
      <Parameters />
      <Usage />
      <Example />
      {/* <Properties /> */}
      <Citation citations={CITATIONS.horodecki} />
    </>
  );
}

export default Horodecki2by4;
