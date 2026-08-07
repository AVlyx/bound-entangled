import PropertiesSection from "@/components/sectionComponents/Properties";

function Properties() {
  return (
    <PropertiesSection>
      <ul>
        <li>9×9 density matrix on C³ ⊗ C³.</li>
        <li>Positive partial transpose (PPT).</li>
        <li>Entangled despite being PPT — a bound entangled state.</li>
        <li>Rank at most 4: a uniform mixture of the four pure edge states above.</li>
        <li>Detected by the CCNR (realignment) criterion.</li>
      </ul>
    </PropertiesSection>
  );
}

export default Properties;
