import numpy as np

from utils import ketbra


def test_ketbra_matches_outer_product():
    a = np.array([1.0, 2.0, 3.0])
    b = np.array([4.0, 5.0])
    np.testing.assert_allclose(ketbra(a, b), np.outer(a, b.conj()))


def test_ketbra_shape():
    a = np.zeros(3)
    b = np.zeros(5)
    assert ketbra(a, b).shape == (3, 5)


def test_ketbra_conjugates_the_bra():
    # The bra is the complex conjugate: entry (i, j) is a[i] * conj(b[j]).
    a = np.array([1.0 + 1.0j, 2.0])
    b = np.array([0.0 + 1.0j, 1.0 - 1.0j])
    expected = np.array(
        [
            [a[0] * b[0].conjugate(), a[0] * b[1].conjugate()],
            [a[1] * b[0].conjugate(), a[1] * b[1].conjugate()],
        ]
    )
    np.testing.assert_allclose(ketbra(a, b), expected)


def test_ketbra_of_a_vector_with_itself_is_a_hermitian_rank_one_projector():
    v = np.array([1.0 + 1.0j, 0.0, 2.0])
    v = v / np.linalg.norm(v)
    p = ketbra(v, v)
    np.testing.assert_allclose(p, p.conj().T)  # Hermitian
    assert np.linalg.matrix_rank(p) == 1
    np.testing.assert_allclose(p @ p, p)  # idempotent (a projector, since v is normalized)
