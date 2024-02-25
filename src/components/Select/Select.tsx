import styles from "./Select.module.css";
import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement>;

export function Select(props: SelectProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return <select class={`${local.class} ${styles.select}`} {...rest} />;
}
