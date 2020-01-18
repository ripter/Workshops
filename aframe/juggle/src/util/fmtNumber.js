
export function fmtNumber(number) {
  return `${(0 | number * 100) / 100}`;
}
