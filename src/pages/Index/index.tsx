import "./index.css";
import { Header } from "src/components/Header";
import { For, Suspense, createResource, createSignal } from "solid-js";
import { CountryOverview } from "src/types/CountryOverview";
import { Card } from "src/components/Card";
import { Input } from "src/components/Input";
import { IoSearch } from "solid-icons/io";
import { createDebounce } from "src/signals/createDebounce";
import { Select } from "src/components/Select";
import { Loading } from "src/components/Loading";

const url = new URL("all", import.meta.env.VITE_API_URL);
url.searchParams.set("fields", "name,capital,region,population,flags,cca3");

function Index() {
  const [search, setSearch] = createDebounce("");
  const [region, setRegion] = createSignal("");
  const [countries] = createResource(async (): Promise<CountryOverview[]> => {
    const data: CountryOverview[] = await fetch(url).then((x) => x.json());
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  });

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <main>
          <div class="search">
            <Input
              placeholder="Search for a country..."
              type="search"
              icon={<IoSearch />}
              value={search()}
              onInput={(e) => setSearch(e.currentTarget.value)}
            />

            <Select onChange={(e) => setRegion(e.currentTarget.value)}>
              <option value="">Filter by Region</option>
              <For
                each={[
                  ...new Set(countries()?.map((x) => x.region) ?? []),
                ].sort()}
              >
                {(x) => <option>{x}</option>}
              </For>
            </Select>
          </div>

          <div class="countries">
            <For
              each={countries()?.filter((x) => {
                const regionMatch = region() === "" || x.region === region();

                if (!regionMatch) {
                  return false;
                }

                return x.name.common
                  .toLocaleLowerCase()
                  .includes(search().toLocaleLowerCase());
              })}
            >
              {(country) => (
                <Card
                  name={country.name.common}
                  population={country.population}
                  capital={country.capital}
                  region={country.region}
                  flag={{ src: country.flags.png, alt: country.flags.alt }}
                />
              )}
            </For>
          </div>
        </main>
      </Suspense>
    </>
  );
}

export default Index;
