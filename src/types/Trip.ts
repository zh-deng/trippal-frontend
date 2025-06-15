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
	stars: number;
	comments: Comment[];
	starredByCurrentUser: boolean;
};

export type Comment = {
	id?: number;
	author: string;
	authorId: number;
	content: string;
	createdAt: Date;
	tripId: number;
};

export type DownloadPdfResponse = {
	data: Blob;
	fileName: string;
};
