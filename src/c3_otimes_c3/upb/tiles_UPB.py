import numpy as np
from toqito.states import tile
from utils import upb


def tiles_UPB() -> np.ndarray:
    return upb([tile(i) for i in range(5)])
