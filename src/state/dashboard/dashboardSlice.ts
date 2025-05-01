import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, City, Country } from "../../services/mapDataService";

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
		updateCurrentCountry: (state, action: PayloadAction<Country>) => {
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
	},
});

export const {
	updateCurrentCountry,
	updateCurrentCity,
	updateCurrentAttraction,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
