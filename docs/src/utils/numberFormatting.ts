import { psiIj } from "bound-entangled";

export function formatNumber(x: number, precision: number): string {
  if (Number.isNaN(x)) return "NaN";
  if (!Number.isFinite(x)) return x > 0 ? "∞" : "−∞";
  const rounded = roundTo(x, precision);
  if (rounded === 0) return "0";
  return String(rounded).replace("-", "−");
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
