import { UploadedFile } from "../components/DashboardInput/DashboardInput";
import { Attraction, City, Country } from "../services/mapDataService";

export type RoadmapItem = {
	id?: number;
	title: string;
	country: Country | null;
	city: City | null;
	attraction: Attraction | null;
	tripId: number;
	files: UploadedFile[];
	notes: string;
  date: Date
};

export type RoadmapItems = RoadmapItem[];
