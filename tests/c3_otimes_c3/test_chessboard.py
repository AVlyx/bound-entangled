import pytest

from bound_entangled.c3_otimes_c3.chessboard import chessboard, chessboard_extremal_PPT

from qi import assert_bound_entangled


def test_chessboard_with_default_s_t_is_bound_entangled():
    # With s and t defaulted, suitable real parameters give a PPT state.
    rho = chessboard(1, 2, 3, 4, 5, 6)
    assert_bound_entangled(rho, dim=[3, 3])


def test_chessboard_extremal_PPT_bound_entangled():
    assert_bound_entangled(chessboard_extremal_PPT(), dim=[3, 3])
