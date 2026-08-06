import CitationSection from "@/components/sectionComponents/Citation";

function Citation() {
  return (
    <CitationSection>
      <p>
        R. Krebs, M. Gachechiladze, "High Schmidt number concentration in quantum bound entangled
        states", Result 1 / Appendix B.{" "}
        <a href="https://arxiv.org/abs/2402.12966">arXiv:2402.12966</a>
      </p>
      <p>
        The underlying grid state construction is due to J. Lockhart, O. Gühne, S. Severini,
        "Entanglement properties of quantum grid states", Phys. Rev. A 97, 062340 (2018).{" "}
        <a href="https://arxiv.org/abs/1705.09261">arXiv:1705.09261</a>
      </p>
    </CitationSection>
  );
}

export default Citation;
