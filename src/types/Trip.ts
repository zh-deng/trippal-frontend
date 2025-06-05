import { RoadmapItems } from "./Roadmap";

export type Trip = {
	id?: number;
	title: string;
	isPublic: boolean;
	userId: number;
	roadmapItems?: RoadmapItems;
};

export type TripExtended = {
	id: number;
	title: string;
	isPublic: boolean;
	userId: number;
	roadmapItems?: RoadmapItems;
  stars: number,
  comments: Comment[]
};

export type Comment = {
	id?: number;
	author: string;
	content: string;
	createdAt: Date;
};
