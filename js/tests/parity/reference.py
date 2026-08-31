"""Reference generator for the TypeScript parity suite.

Reads a JSON *spec* naming, for every case, a Python module, an attribute of
that module, and the arguments to call it with; writes a JSON *reference*
mapping each case id to the resulting array (or list of arrays).  The spec is
produced by `globalSetup.ts` from `cases.ts`, which is the single source of
truth for what gets compared -- nothing here decides which states to build.

Usage: python reference.py <spec.json> <reference.json>
"""

import importlib
import json
import sys

import numpy as np


def decode(value):
    """Rebuild the argument values the spec encodes.

    Plain JSON scalars and lists pass through unchanged (Python is happy to
    unpack a list wherever the library asks for a tuple).  `{"__ndarray__": [...]}`
    marks an argument that has to arrive as a numpy array -- the utils take
    vectors, not lists.  Its payload is either a nested list of reals or, for a
    complex argument, a `{"real": [...], "imag": [...]}` pair.
    """
    if isinstance(value, dict):
        if "__ndarray__" in value:
            data = value["__ndarray__"]
            if isinstance(data, dict):  # {"real": [...], "imag": [...]}
                return np.array(data["real"], dtype=np.complex128) + 1j * np.array(
                    data["imag"], dtype=np.complex128
                )
            return np.array(data, dtype=np.complex128)
        return {key: decode(item) for key, item in value.items()}
    if isinstance(value, list):
        return [decode(item) for item in value]
    return value


def encode(value):
    """Serialize a return value as flat real and imaginary parts, C order.

    A list of arrays (the UPB bases return one) is kept as a list so the
    TypeScript side can line the vectors up one by one.
    """
    if isinstance(value, (list, tuple)):
        return {"kind": "list", "items": [encode(item) for item in value]}
    if hasattr(value, "toarray"):  # scipy sparse, which a few toqito calls return
        value = value.toarray()
    array = np.asarray(value, dtype=np.complex128)
    return {
        "kind": "array",
        "shape": list(array.shape),
        "real": array.real.ravel().tolist(),
        "imag": array.imag.ravel().tolist(),
    }


def run(case):
    module = importlib.import_module(case["module"])
    function = getattr(module, case["attr"])
    args = [decode(arg) for arg in case.get("args", [])]
    kwargs = {name: decode(arg) for name, arg in case.get("kwargs", {}).items()}
    return encode(function(*args, **kwargs))


def main():
    spec_path, out_path = sys.argv[1], sys.argv[2]
    with open(spec_path, encoding="utf-8") as handle:
        spec = json.load(handle)

    sys.path.insert(0, spec["pythonSrc"])

    results = {}
    for case in spec["cases"]:
        try:
            results[case["id"]] = run(case)
        except Exception as error:  # noqa: BLE001 - the id is what makes it debuggable
            raise RuntimeError(f"case {case['id']!r} failed: {error}") from error

    with open(out_path, "w", encoding="utf-8") as handle:
        # allow_nan=False so a NaN blows up here rather than emitting JSON that
        # JSON.parse would reject with a much less informative message.
        json.dump(results, handle, allow_nan=False)


if __name__ == "__main__":
    main()
