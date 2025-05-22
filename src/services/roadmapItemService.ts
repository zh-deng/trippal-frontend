import { RoadmapItem } from "../types/Roadmap";

export async function createRoadmapItem(roadmapItem: RoadmapItem): Promise<RoadmapItem> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/roadmapItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roadmapItem),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating a roadmap item failed: ${errorText}`);
  }

  const createdRoadmapItem: RoadmapItem = await response.json();
  return createdRoadmapItem;
}

export async function updateRoadmapItem(id: number, roadmapItem: RoadmapItem): Promise<RoadmapItem> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/roadmapItem/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id: id, ...roadmapItem}),
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Creating a roadmap item failed: ${errorText}`);
  }

  const updatedRoadmapItem: RoadmapItem = await response.json();
  return updatedRoadmapItem;
}

export async function fetchRoadmapItemById(id: number): Promise<RoadmapItem> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/roadmapItem/${id}`, {
    method: "GET",
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Fetching a roadmap item failed: ${errorText}`);
  }

  const fetchedRoadmapItem: RoadmapItem = await response.json();
  return fetchedRoadmapItem;
}

export async function deleteRoadmapItemById(id: number) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/roadmapItem/${id}`, {
    method: "DELETE",
    credentials: 'include'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Deleting a roadmap item failed: ${errorText}`);
  }
}