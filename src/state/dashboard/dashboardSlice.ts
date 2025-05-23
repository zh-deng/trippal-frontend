import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, City, Country } from "../../services/mapDataService";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { RoadmapItem } from "../../types/Roadmap";

interface DashboardState {
	currentCountry: Country | null;
	currentCity: City | null;
	currentAttraction: Attraction | null;
}

const initialState: DashboardState = {
	currentCountry: null,
	currentCity: null,
	currentAttraction: null,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		updateCurrentCountry: (state, action: PayloadAction<Country | null>) => {
			state.currentCountry = action.payload;
		},
		updateCurrentCity: (state, action: PayloadAction<City | null>) => {
			state.currentCity = action.payload;
		},
		updateCurrentAttraction: (
			state,
			action: PayloadAction<Attraction | null>
		) => {
			state.currentAttraction = action.payload;
		},
		resetMapData: (state) => {
			state.currentCountry = null;
			state.currentCity = null;
			state.currentAttraction = null;
		},
		loadMapData: (state, action: PayloadAction<RoadmapItem | null>) => {
			if (action.payload !== null) {
				const roadmapItem: RoadmapItem = action.payload;

				state.currentCountry = roadmapItem.country;
				state.currentCity = roadmapItem.city;
				state.currentAttraction = roadmapItem.attraction;
			}
		},
	},
});

export const {
	updateCurrentCountry,
	updateCurrentCity,
	updateCurrentAttraction,
	resetMapData,
	loadMapData,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
