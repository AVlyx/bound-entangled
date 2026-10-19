r"""Helpers the state factories are built from.

`ketbra(a, b)` is the outer product $|a\rangle\langle b|$, defaulting to
$|a\rangle\langle a|$.

`upb(basis)` turns an unextendible product basis $\{|v_i\rangle\}_{i=1}^{k}$ in
total dimension $D$ into the bound entangled state on its orthogonal
complement,

$$
\rho = \frac{1}{D - k}\Big(\mathbb{1} - \sum_{i=1}^{k} |v_i\rangle\langle v_i|\Big).
$$

Each $|v_i\rangle\langle v_i|$ is a product-state projector, which partial
transposition leaves a product-state projector, so $\rho$ is PPT; the basis being
unextendible means no product vector lies in the range of $\rho$, so by the range
criterion it is entangled. Every UPB state in the library — Tiles, Pyramid,
Parametrized, GenTiles1 and GenTiles2 — goes through it.

# References

- Charles H. Bennett, David P. DiVincenzo, Tal Mor, Peter W. Shor, John A.
  Smolin and Barbara M. Terhal, "Unextendible product bases and bound
  entanglement", *Phys. Rev. Lett.* **82**, 5385–5388 (1999).
  [arXiv:quant-ph/9808030](https://arxiv.org/abs/quant-ph/9808030) ·
  [doi:10.1103/PhysRevLett.82.5385](https://doi.org/10.1103/PhysRevLett.82.5385)
"""

from bound_entangled.utils.ketbra import ketbra
from bound_entangled.utils.upb import upb
