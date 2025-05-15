import { RoadmapItem } from "../types/Roadmap";

export async function createRoadmapItem(roadmapItem: RoadmapItem): Promise<RoadmapItem> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/api/trip`, {
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