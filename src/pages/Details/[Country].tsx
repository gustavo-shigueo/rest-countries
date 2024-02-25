import "./details.css";
import { Navigate, useParams } from "@solidjs/router";
import { IoArrowBack } from "solid-icons/io";
import {
  createEffect,
  createResource,
  Match,
  Suspense,
  Switch,
} from "solid-js";
import { CountryDetailedView } from "src/components/CountryDetailedView";
import { Header } from "src/components/Header";
import { Loading } from "src/components/Loading";
import { CountryDetails } from "src/types/CountryDetails";

async function fetchCountry(country: string): Promise<CountryDetails> {
  const url = new URL(`name/${country}`, import.meta.env.VITE_API_URL);
  url.searchParams.set("fullText", "true");
  url.searchParams.set(
    "fields",
    "name,flags,population,region,subregion,capital,currencies,tld,languages,borders,cca3",
  );

  const response = await fetch(url);
  const body: [CountryDetails] | { message: string } = await response.json();

  if ("message" in body) {
    throw new Error(body.message, { cause: body });
  }

  return body[0];
}

export default function Country() {
  const params = useParams<{ country: string }>();
  const [country, { mutate }] = createResource(params.country, fetchCountry);

  createEffect(async () => mutate(await fetchCountry(params.country)));
  return (
    <>
      <Header />
      <main>
        <button onClick={() => history.go(-1)} class="back">
          <IoArrowBack /> <div>Back</div>
        </button>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Match when={country.error}>
              <Navigate href="/404" />
            </Match>
            <Match when={country()}>
              {(x) => <CountryDetailedView {...x()} />}
            </Match>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}
