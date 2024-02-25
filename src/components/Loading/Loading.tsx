import style from "./Loading.module.css";
import { AiOutlineLoading } from "solid-icons/ai";

export function Loading() {
  return (
    <div class={style.loading}>
      <AiOutlineLoading />
    </div>
  );
}
