const formatter = new Intl.NumberFormat();

export function formatNumber(value: number) {
  return formatter.format(value);
}
