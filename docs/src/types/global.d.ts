interface Complex {
  re: number;
  im: number;
}

type Cell = number | Complex | string;

interface MatrixLikeObject {
  toArray(): unknown;
}
