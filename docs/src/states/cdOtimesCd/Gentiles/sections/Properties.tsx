import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <p>
        genTiles1Basis returns an orthonormal product basis of size d² − 2d + 1; genTiles1 is PPT
        and bound entangled on Cᵈ ⊗ Cᵈ.
      </p>
      <div className="scroll-x">
        <table className="doc-table">
          <thead>
            <tr>
              <th>d</th>
              <th className="num">basis size</th>
              <th className="num">dim(Cᵈ ⊗ Cᵈ)</th>
              <th className="num">rank(ρ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>4</td>
              <td className="num">9</td>
              <td className="num">16</td>
              <td className="num">7</td>
            </tr>
            <tr>
              <td>6</td>
              <td className="num">25</td>
              <td className="num">36</td>
              <td className="num">11</td>
            </tr>
            <tr>
              <td>8</td>
              <td className="num">49</td>
              <td className="num">64</td>
              <td className="num">15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PropertiesSection>
  );
}

export default Properties;
