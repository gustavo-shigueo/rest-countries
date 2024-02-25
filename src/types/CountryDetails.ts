import { CountryOverview } from "./CountryOverview";

export type CountryDetails = CountryOverview & {
  subregion: string;
  tld: string[];
  currencies: Record<string, { name: string; symbol: string }>;
  borders: string[];
  languages: Record<string, string>;
};
