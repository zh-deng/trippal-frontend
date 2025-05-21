
import { RoadmapList } from "../types/Roadmap";
import { Trip } from "../types/Trip";

export async function fetchRoadmapList(id: number): Promise<RoadmapList> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${id}/roadmapList`, {
    method: "GET",
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetching a roadmap list failed: ${errorText}`);
  }

  const roadmapList: RoadmapList = await response.json();
  return roadmapList;
}

export async function createTrip(trip: Trip): Promise<Trip> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating a trip failed: ${errorText}`);
  }

  const createdTrip: Trip = await response.json();
  return createdTrip;
}

export async function updateTrip(trip: Trip): Promise<Trip> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${trip.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Updating a trip failed: ${errorText}`);
  }

  const updatedTrip: Trip = await response.json();
  return updatedTrip;
}

export async function removeTrip(tripId: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${tripId}`, {
    method: "DELETE",
    credentials: 'include'
  })

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting trip failed: ${errorText}`);
  }
}