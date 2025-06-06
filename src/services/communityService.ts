export async function fetchCommunityTrips(
	page: number,
	country?: string | null
): Promise<any> {
	const countryParam = country
		? `&countryName=${encodeURIComponent(country)}`
		: "";

	const response = await fetch(
		`${
			import.meta.env.VITE_BACKEND_BASEURL
		}/api/community?page=${page}${countryParam}`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(
			`Fetching paginated community trip list failed: ${errorText}`
		);
	}

	const communityList: any = await response.json();
	return communityList;
}
