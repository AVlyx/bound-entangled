import CitationSection from "@/components/sectionComponents/Citation";

function Citation() {
  return (
    <CitationSection>
      <p>
        D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal, "Unextendible Product
        Bases, Uncompletable Product Bases and Bound Entanglement", Commun. Math. Phys. 238, 379
        (2003), Section V B, Theorem 5.{" "}
        <a href="https://arxiv.org/abs/quant-ph/9908070">arXiv:quant-ph/9908070</a>
      </p>
      <p>
        C. H. Bennett, D. P. DiVincenzo, T. Mor, P. W. Shor, J. A. Smolin, B. M. Terhal,
        "Unextendible Product Bases and Bound Entanglement", Phys. Rev. Lett. 82, 5385 (1999) —
        the general UPB-to-bound-entangled-state construction used here.{" "}
        <a href="https://arxiv.org/abs/quant-ph/9808030">arXiv:quant-ph/9808030</a>
      </p>
    </CitationSection>
  );
}

export default Citation;
