"""The Yu-Oh validity domain.

The state itself is covered by the doctest on `yu_oh`; this file covers the
parameter-domain predicate guarding it.
"""

from bound_entangled.cd_otimes_cd.yu_oh import is_valid_yu_oh_input


def test_valid_interior_point():
    assert is_valid_yu_oh_input(3, 0.5, 0.1) is True


def test_rejected_when_outside_the_unit_disk():
    # x**2 + y**2 = 1.62 > 1
    assert is_valid_yu_oh_input(3, 0.9, 0.9) is False


def test_rejected_when_delta_non_positive():
    # Inside the unit disk (0.72 <= 1) but delta = 0.28 - 0.36 < 0.
    assert is_valid_yu_oh_input(3, 0.6, 0.6) is False
