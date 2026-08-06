/**
 * Formats to a fixed number of decimal places — never fewer, so e.g. `0.40` isn't
 * shortened to `"0.4"` and `1.000` isn't shortened to `"1"`. Cell width in
 * `LatexMatrix` tracks string length, so a value that drops digits as a slider
 * moves makes the whole matrix visibly reflow; keeping the digit count constant
 * (for every non-zero entry, at a given precision) keeps the matrix's size constant.
 */
export function formatNumber(x: number, precision: number): string {
  if (Number.isNaN(x)) return "NaN";
  if (!Number.isFinite(x)) return x > 0 ? "∞" : "−∞";
  if (precision < 0) return String(x).replace("-", "−");
  const fixed = x.toFixed(precision);
  if (Number(fixed) === 0) return "0";
  return fixed.replace("-", "−");
}

export function formatComplex({ re, im }: Complex, precision: number): string {
  const r = roundTo(re, precision);
  const i = roundTo(im, precision);
  if (i === 0) return formatNumber(r, precision);

  const magnitude = Math.abs(i);
  const imaginary = magnitude === 1 ? "i" : `${formatNumber(magnitude, precision)}i`;
  if (r === 0) return i < 0 ? `−${imaginary}` : imaginary;

  return `${formatNumber(r, precision)} ${i < 0 ? "−" : "+"} ${imaginary}`;
}

function roundTo(x: number, precision: number): number {
  if (precision < 0) return x;
  return Number(x.toFixed(precision));
}
