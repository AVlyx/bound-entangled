import { useState } from "react";
import Slider from "../../../Slider";
import { horodecki3By3 } from "bound-entangled";
import LatexMatrix from "../../../LatexMatrix";

function Horodecki3by3() {
  const [aParam, setAParam] = useState<number>(0.4);
  return (
    <>
      <div>
        <Slider min={0} max={1} value={aParam} setValue={(e) => setAParam(e)} />
      </div>
      <LatexMatrix value={horodecki3By3({ aParam })} precision={2} label="rho" />
    </>
  );
}

export default Horodecki3by3;
