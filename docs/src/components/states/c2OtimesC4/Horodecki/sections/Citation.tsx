import BibTex from "@/components/BibTex";
import CitationSection from "@/components/sectionComponents/Citation";

function Citation() {
  return (
    <CitationSection>
      <BibTex>
        {`@article{Horodecki_1997,
          title={Separability criterion and inseparable mixed states with positive partial transposition},
          volume={232},
          ISSN={0375-9601},
          url={http://dx.doi.org/10.1016/S0375-9601(97)00416-7},
          DOI={10.1016/s0375-9601(97)00416-7},
          number={5},
          journal={Physics Letters A},
          publisher={Elsevier BV},
          author={Horodecki, Pawel},
          year={1997},
          month=Aug, pages={333–339} }`}
      </BibTex>

      <BibTex>
        {`
        @misc{chruściński2011exposedpositivemapsrobertson,
        title={On exposed positive maps: Robertson and Breuer-Hall maps}, 
        author={Dariusz Chruściński},
        year={2011},
        eprint={1108.2233},
        archivePrefix={arXiv},
        primaryClass={quant-ph},
        url={https://arxiv.org/abs/1108.2233}, 
        }`}
      </BibTex>
    </CitationSection>
  );
}

export default Citation;
