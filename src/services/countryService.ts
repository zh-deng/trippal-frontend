export type Coordinates = [number, number]

export type Country = {
  name: string;
  coordinates: Coordinates;
}

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();

  const countries: Country[] = data.map((country: any) => ({
    name: country.name.common,
    latlng: country.latlng,
  }));

  return countries.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
};