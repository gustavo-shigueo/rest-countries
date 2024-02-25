export type CountryOverview = {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  cca3: string;
};
