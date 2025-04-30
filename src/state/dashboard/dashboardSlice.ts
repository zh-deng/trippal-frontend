import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, Country } from "../../services/countryService";

interface DashboardState {
	currentCountry: Country | null;
	currentCity: City | null;
}

const initialState: DashboardState = {
	currentCountry: null,
	currentCity: null
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
    }
  },
});

export const { updateCurrentCountry, updateCurrentCity } = dashboardSlice.actions;
export default dashboardSlice.reducer;
