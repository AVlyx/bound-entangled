r"""Constructions of bound entangled states and unextendible product bases from
the quantum information literature, as plain NumPy density matrices.

```bash
pip install bound-entangled
```

# Bound entanglement

In quantum mechanics, entanglement is the capacity of quantum systems to be
correlated in a way that measuring one tells you something about the other. It
is the resource behind quantum communication protocols, it appears throughout
condensed matter physics, and it is what makes quantum computing stronger than
classical computing. Not all entanglement is equivalent, though, and it matters
how much of it a system holds and what can be done with it.

**Bound entanglement** is entanglement too weak to be distilled: no number of
copies of a bound entangled state can be turned into maximally entangled
states. Entanglement that can be distilled is called **free**.

Entanglement distillation is any protocol that turns $n$ copies of a resource
state into a smaller number $m$ of copies of a maximally entangled state, using
only LOCC (local quantum operations and classical communication):

$$
\rho^{\otimes n} \;\longrightarrow\; |\Phi\rangle\langle\Phi|^{\otimes m}.
$$

# The PPT criterion

The partial transpose is the main tool for detecting entanglement. Every state
with a negative partial transpose (NPT) is entangled, in any dimension. In
$\mathbb{C}^2 \otimes \mathbb{C}^2$ and $\mathbb{C}^2 \otimes \mathbb{C}^3$ the
converse also holds: a state with a positive partial transpose (PPT) is
separable.

The criterion is just as central to bound entanglement, because no PPT state is
distillable. A PPT state is therefore either separable or bound entangled.
Deciding which is hard in general: the separability problem is NP-hard. It is
also strongly believed that NPT bound entangled states exist, but that remains
an open problem and no example is known.

# The library

Every state is a plain NumPy matrix, so it drops straight into whatever
numerical stack you already use.

```python
from bound_entangled.c3_otimes_c3 import horodecki
from toqito.state_props import is_ppt

rho = horodecki(0.4)
is_ppt(rho, dim=[3, 3])  # True — yet the state is entangled
```

States are grouped by the space they live in — `c3_otimes_c3` is
$\mathbb{C}^3 \otimes \mathbb{C}^3$, `cm_otimes_cn` is
$\mathbb{C}^m \otimes \mathbb{C}^n$, and so on — and the navigation follows the
same grouping, from $\mathbb{C}^2 \otimes \mathbb{C}^4$ up to the multipartite
families. Every page gives the construction, the factory that builds it and the
papers it comes from; the bibliography collects every reference with its
BibTeX.

Every factory carries doctests asserting that what it returns is a valid density
matrix, that it is PPT, and how `toqito`'s `is_separable` classifies it, so the
documented behaviour is the tested behaviour.

The [Horodecki $\mathbb{C}^2 \otimes \mathbb{C}^4$][bound_entangled.c2_otimes_c4.horodecki.horodecki]
state is the historical first example of a PPT entangled state, and
[Horodecki $\mathbb{C}^3 \otimes \mathbb{C}^3$][bound_entangled.c3_otimes_c3.horodecki.horodecki]
is its best-known relative. Both are one-parameter families, so they are a good
place to start.

The package is developed at
[AVlyx/bound-entangled](https://github.com/AVlyx/bound-entangled), released on
[PyPI](https://pypi.org/project/bound-entangled/), and licensed under the MIT
License.

# References

A good review of bipartite bound entanglement:

- Beatrix C. Hiesmayr, Christopher Popp and Tobias C. Sutter, "Bipartite bound
  entanglement", *Int. J. Quantum Inf.* **23**, 2530003 (2025).
  [arXiv:2406.13491](https://arxiv.org/abs/2406.13491) ·
  [doi:10.1142/S0219749925300037](https://doi.org/10.1142/S0219749925300037)
"""
