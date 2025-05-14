import { Trip } from "../types/Trip";

export async function createTrip(trip: Trip): Promise<Trip> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/trip`, {
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

export async function removeTrip(tripId: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/trip/${tripId}`, {
    method: "DELETE",
    credentials: 'include'
  })

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting trip failed: ${errorText}`);
  }
}