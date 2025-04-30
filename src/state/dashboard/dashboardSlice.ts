import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../services/countryService";

interface DashboardState {
	currentCountry: Country | null;
}

const initialState: DashboardState = {
	currentCountry: null,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
    updateCurrentCountry: (state, action: PayloadAction<Country>) => {
      state.currentCountry = action.payload;
    }
  },
});

export const { updateCurrentCountry } = dashboardSlice.actions;
export default dashboardSlice.reducer;
