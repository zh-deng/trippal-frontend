import { RoadmapItems } from "./Roadmap"

export type Trip = {
  id?: number,
  title: string,
  isPublic: boolean,
  userId: number,
  roadMapItems?: RoadmapItems
}