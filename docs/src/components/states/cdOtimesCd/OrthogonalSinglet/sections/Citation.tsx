import CitationSection from "@/components/sectionComponents/Citation";

function Citation() {
  return (
    <CitationSection>
      <p>
        ρ<sub>F2</sub> from Phys. Rev. Research 3, 023101 (2021) — the "second family" of PPT
        singlets, reverse-engineered from G. Tóth, T. Vértesi, "Quantum States with a Positive
        Partial Transpose are Useful for Metrology", Phys. Rev. Lett. 120, 020506 (2018). Port of{" "}
        <code>BES_metro.m</code> from the QUBIT4MATLAB package.{" "}
        <a href="https://journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101">
          journals.aps.org/prresearch/abstract/10.1103/PhysRevResearch.3.023101
        </a>
      </p>
    </CitationSection>
  );
}

export default Citation;
