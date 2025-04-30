import { LatLngExpression, LatLngTuple } from "leaflet";

export type Country = {
	name: string;
	coordinates: LatLngExpression;
	countryCode: string;
};

export type City = {
	name: string;
	coordinates: LatLngExpression;
};

export const fetchCountries = async (): Promise<Country[]> => {
	const res = await fetch(
		`http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&username=${
			import.meta.env.VITE_GEONAMES_USERNAME
		}`
	);
	const data = await res.json();
	const countries: Country[] = data.geonames.map((country: any) => ({
		name: country.countryName,
		coordinates: [
			(country.north + country.south) / 2,
			(country.east + country.west) / 2,
		],
		countryCode: country.countryCode,
	}));

	return countries.sort((a: Country, b: Country) =>
		a.name.localeCompare(b.name)
	);
};

export const fetchCitiesByCountry = async (
	countryCode: string
): Promise<{ name: string; coordinates: [number, number] }[]> => {
	const res = await fetch(
		`http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=${
			import.meta.env.VITE_CITY_MAX_ROWS
		}&username=${import.meta.env.VITE_GEONAMES_USERNAME}`
	);

	const data = await res.json();

	if (!data.geonames) return [];

	return data.geonames
    .map((city: any) => ({
      name: city.name,
      coordinates: [parseFloat(city.lat), parseFloat(city.lng)] as [number, number],
    }))
    .sort((a: City, b: City) => a.name.localeCompare(b.name));
};
