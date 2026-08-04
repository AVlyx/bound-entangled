In quantum mechanics, entanglement refers to the capacity of particles / quantum states to be linked in a way that measuring one gives you information on the other.
It then comes as no surprise that entanglement and its propeties are highly studied as it plays a fundamental role in various fields of research.
In quantum communication protocols, condensed matter systems, it is also the ressource that makes quantum computing inherently stronger than classical.
However, not all entanglement is equivalent and it is important to be able to measure how much entanglement you have in your system and what can be done with it.

Bound entanglement refers to a class of entangled states where the entanglement is too weak to support distillation. Meaning that it is not possible to obtain maximally entangled states from a larger set of bound entangled states. The converse of bound entanglement is known as free entanglement.

### Distillation
Enanglement distillation describes any protocol that transforms $n$ copies of a ressource state into a smaller number of copies $m$ of the maximally entangled state using only LOCC (Local quantum Operations and Classical Communication)
$$\rho^{\otimes n} \rightarrow |\Phi\rangle\langle\Phi|^{\otimes m}$$

## The PPT criterion
In quantum information, the partial transpose plays a major role in the detection of entanglement. For the case of systems of low dimensions in $\mathbb{C}^2 \otimes \mathbb{C}^2$ and $\mathbb{C}^2 \otimes \mathbb{C}^3$, any bipartite state with a positive partial transpose is necessarily separable. For any dimension any dimension it holds that every state with a negative partial transpose will be entangled.

### The PPT criterion and bound entanglement
The PPT criterion also plays a major role in the detection of bound entangled states as there does not exist distillable states with a positive partial transpose. So all states with a positive partial transpose are either bound-entangled or separable. Though, detecting whether a state is entangled or separable is NP-hard. It is also strongly believed that there are NPT (Negative Partial Transpose) bound-entangled states but it remains an open problem and no example has been found.