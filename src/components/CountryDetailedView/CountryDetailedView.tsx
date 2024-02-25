import { A } from "@solidjs/router";
import styles from "./CountryDetailedView.module.css";
import { For, Show, Suspense, createEffect, createResource } from "solid-js";
import { formatList } from "src/formatters/list";
import { formatNumber } from "src/formatters/number";
import { CountryDetails } from "src/types/CountryDetails";
import { Loading } from "../Loading";

async function fetchBorderCountries(countryCodes: string[]): Promise<string[]> {
  if (countryCodes.length === 0) {
    return [];
  }

  const url = new URL("alpha", import.meta.env.VITE_API_URL);
  url.searchParams.set("codes", countryCodes.join(","));
  url.searchParams.set("fields", "name");

  const response = await fetch(url);
  const data: Pick<CountryDetails, "name">[] = await response.json();

  return data.map((x) => x.name.common);
}

export function CountryDetailedView(props: CountryDetails) {
  const [borders, { mutate }] = createResource(
    props.borders,
    fetchBorderCountries,
  );

  createEffect(async () => mutate(await fetchBorderCountries(props.borders)));

  return (
    <article class={styles.wrapper}>
      <section class={styles.flag}>
        <img src={props.flags.svg} alt={props.flags.alt} />
      </section>

      <section class={styles.info}>
        <h2>{props.name.common}</h2>

        <div class={styles.summary}>
          <div>
            <p>
              <strong>Native Name:</strong>{" "}
              {
                props.name.nativeName[Object.keys(props.languages).at(-1)!]
                  ?.common
              }
            </p>
            <p>
              <strong>Population:</strong> {formatNumber(props.population)}
            </p>
            <p>
              <strong>Region:</strong> {props.region}
            </p>
            <p>
              <strong>Sub Region:</strong> {props.subregion}
            </p>
            <p>
              <strong>Capital:</strong> {formatList(props.capital)}
            </p>
          </div>
          <div>
            <p>
              <strong>Top Level Domain:</strong> {formatList(props.tld)}
            </p>
            <p>
              <strong>Currencies:</strong>{" "}
              {formatList(Object.values(props.currencies).map((x) => x.name))}
            </p>
            <p>
              <strong>Languages:</strong>{" "}
              {formatList(Object.values(props.languages))}
            </p>
          </div>
        </div>

        <div class={styles.borders}>
          <Suspense fallback={<Loading />}>
            <Show when={borders()}>
              {(countries) => (
                <Show when={countries().length > 0}>
                  <strong>Border Countries:</strong>{" "}
                  <div class={styles.links}>
                    <For each={countries()}>
                      {(country) => (
                        <A href={`/details/${country}`}>{country} </A>
                      )}
                    </For>
                  </div>
                </Show>
              )}
            </Show>
          </Suspense>
        </div>
      </section>
    </article>
  );
}
