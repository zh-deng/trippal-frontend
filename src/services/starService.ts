export async function starTrip(tripId: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${tripId}/star`, {
    method: "PUT",
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Starring trip failed: ${errorText}`);
  }
}

export async function unstarTrip(tripId: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip/${tripId}/unstar`, {
    method: "PUT",
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Starring trip failed: ${errorText}`);
  }
}