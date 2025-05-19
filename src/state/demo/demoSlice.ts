import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, City, Country } from "../../services/mapDataService";
import { RoadmapItems } from "../../types/Roadmap";

interface DemoState {
	demoCountry: Country | null;
	demoCity: City | null;
	demoAttraction: Attraction | null;
	demoRoadmapItems: RoadmapItems;
}

const initialState: DemoState = {
	demoCountry: null,
	demoCity: null,
	demoAttraction: null,
	demoRoadmapItems: [],
};

const demoSlice = createSlice({
	name: "demo",
	initialState,
	reducers: {
		updateDemoCountry: (state, action: PayloadAction<Country>) => {
			state.demoCountry = action.payload;
		},
		updateDemoCity: (state, action: PayloadAction<City | null>) => {
			state.demoCity = action.payload;
		},
		updateDemoAttraction: (state, action: PayloadAction<Attraction | null>) => {
			state.demoAttraction = action.payload;
		},
	},
});

export const { updateDemoCountry, updateDemoCity, updateDemoAttraction } =
	demoSlice.actions;
export default demoSlice.reducer;
