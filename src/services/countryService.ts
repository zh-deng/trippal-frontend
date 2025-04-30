import { LatLngExpression } from "leaflet";

export type Country = {
  name: string;
  coordinates: LatLngExpression;
}

export const fetchCountries = async (): Promise<Country[]> => {
  const res = await fetch(`http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=${import.meta.env.VITE_GEONAMES_USERNAME}`);
  const data = await res.json();
  const countries: Country[] = data.geonames.map((country: any) => ({
    name: country.countryName,
    coordinates: [(country.north + country.south) / 2, (country.east + country.west) / 2],
  }));

  return countries.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
};

