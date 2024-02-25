import styles from "./Input.module.css";
import { splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  icon?: JSX.Element;
};

export function Input(props: InputProps) {
  const [local, rest] = splitProps(props, ["class", "icon"]);
  return (
    <div class={styles.wrapper}>
      {props.icon}
      <input class={`${local.class} ${styles.input}`} {...rest} />
    </div>
  );
}
