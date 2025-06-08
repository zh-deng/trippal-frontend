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
  comments: Comment[],
	isStarredByCurrentUser: boolean
};

export type Comment = {
	id?: number;
	author: string;
	authorId: number;
	content: string;
	createdAt: Date;
	tripId: number
};
