import { type Accessor, type Setter, createSignal, onCleanup } from "solid-js";

type DebouncedSetter<T> = (...args: Parameters<Setter<T>>) => void;
export function createDebounce<T>(
  initialValue: T,
  timeoutMilliseconds = 200,
): [Accessor<T>, DebouncedSetter<T>] {
  const [value, setValue] = createSignal(initialValue);

  let timeout = 0;
  onCleanup(() => clearTimeout(timeout));

  return [
    value,
    (x: Parameters<Setter<T>>[0]) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        setValue(x);
      }, timeoutMilliseconds);
    },
  ];
}
