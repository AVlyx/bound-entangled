import CitationSection from "@/components/sectionComponents/Citation";

function Citation() {
  return (
    <CitationSection>
      <p>
        A. Kay, “Degree of quantum bound entanglement for a family of mixed states,” Phys. Rev. A
        71, 032309 (2005).{" "}
        <a href="https://arxiv.org/abs/quant-ph/0411142" target="_blank" rel="noreferrer">
          arXiv:quant-ph/0411142
        </a>
      </p>
      <p>
        See also J. A. Smolin, “Four-party unlockable bound entangled state,” Phys. Rev. A 63,
        032306 (2001).{" "}
        <a href="https://arxiv.org/abs/quant-ph/0001001" target="_blank" rel="noreferrer">
          arXiv:quant-ph/0001001
        </a>
      </p>
    </CitationSection>
  );
}

export default Citation;
