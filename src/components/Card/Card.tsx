import { formatNumber } from "src/formatters/number";
import styles from "./Card.module.css";
import { formatList } from "src/formatters/list";
import { A } from "@solidjs/router";

type CardProps = {
  flag: { src: string; alt: string };
  name: string;
  population: number;
  capital: string[];
  region: string;
};

export function Card(props: CardProps) {
  return (
    <article class={styles.card + " card"}>
      <A href={`/details/${props.name}`}>
        <div class={styles.flag}>
          <img src={props.flag.src} alt={props.flag.alt} />
        </div>

        <section class={styles.info}>
          <h2>{props.name}</h2>
          <p>
            <strong>Population: </strong> {formatNumber(props.population)}
          </p>
          <p>
            <strong>Region: </strong> {props.region}
          </p>
          <p>
            <strong>Capital: </strong> {formatList(props.capital)}
          </p>
        </section>
      </A>
    </article>
  );
}
