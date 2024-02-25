import styles from "./Header.module.css";
import { A } from "@solidjs/router";
import { IoMoon, IoSunny } from "solid-icons/io";
import { Match, Switch, createEffect, createSignal } from "solid-js";

const DEFAULT_THEME = window.matchMedia("(prefers-color-scheme: dark)")
  ? "dark"
  : "light";

export function Header() {
  const [theme, setTheme] = createSignal<"dark" | "light">(DEFAULT_THEME);

  createEffect(() => {
    document.body.classList.remove("dark");
    document.body.classList.remove("light");

    document.body.classList.add(theme());
  });

  return (
    <header class={styles.header}>
      <div>
        <A class={styles.link} href="/">
          <h1>Where in the world?</h1>
        </A>

        <button
          class={styles.button}
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          <Switch>
            <Match when={theme() === "dark"}>
              <IoSunny />
              <span>Light Mode</span>
            </Match>
            <Match when={theme() === "light"}>
              <IoMoon />
              <span>Dark Mode</span>
            </Match>
          </Switch>
        </button>
      </div>
    </header>
  );
}
