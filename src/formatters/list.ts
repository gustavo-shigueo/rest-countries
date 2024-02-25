const formatter = new Intl.ListFormat(undefined, {
  style: "long",
  type: "conjunction",
});

export function formatList(value: string[]) {
  return formatter.format(value);
}
