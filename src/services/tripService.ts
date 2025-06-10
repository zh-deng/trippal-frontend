import { RoadmapList } from "../types/Roadmap";
import { DownloadPdfResponse, Trip } from "../types/Trip";

export async function fetchRoadmapList(id: number): Promise<RoadmapList> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${id}/roadmapList`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Fetching a roadmap list failed: ${errorText}`);
	}

	const roadmapList: RoadmapList = await response.json();
	return roadmapList;
}

export async function createTrip(trip: Trip): Promise<Trip> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(trip),
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Creating a trip failed: ${errorText}`);
	}

	const createdTrip: Trip = await response.json();
	return createdTrip;
}

export async function updateTrip(trip: Trip): Promise<Trip> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${trip.id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(trip),
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Updating a trip failed: ${errorText}`);
	}

	const updatedTrip: Trip = await response.json();
	return updatedTrip;
}

export async function removeTrip(tripId: number) {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${tripId}`,
		{
			method: "DELETE",
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Deleting trip failed: ${errorText}`);
	}
}

export async function copyTrip(tripId: number): Promise<Trip> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${tripId}/copy`,
		{
			method: "POST",
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Saving a shared trip failed: ${errorText}`);
	}

	const sharedTrip: Trip = await response.json();
	return sharedTrip;
}

export async function downloadTrip(
	tripId: number,
	language: string
): Promise<DownloadPdfResponse> {
	const response = await fetch(
		`${
			import.meta.env.VITE_BACKEND_BASEURL
		}/api/trip/${tripId}/download/${language}`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Fetching generated trip pdf failed: ${errorText}`);
	}

	const blob = await response.blob();
	const contentDisposition = response.headers.get("content-disposition");
	const fileName = contentDisposition
		? contentDisposition.split("filename=")[1]
		: language === "en"
		? `trip_${tripId}.pdf`
		: `Reise_${tripId}.pdf`;

	return { data: blob, fileName };
}
