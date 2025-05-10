import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attraction, City, Country } from "../../services/mapDataService";
import { UserInfo } from "../../types/UserInfo";

interface GlobalState {
  activeUser: UserInfo | null
}

const initialState: GlobalState = {
  activeUser: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // updateCurrentCountry: (state, action: PayloadAction<Country>) => {
    //   state.currentCountry = action.payload;
    // },
    // updateCurrentCity: (state, action: PayloadAction<City | null>) => {
    //   state.currentCity = action.payload;
    // },
    // updateCurrentAttraction: (
    //   state,
    //   action: PayloadAction<Attraction | null>
    // ) => {
    //   state.currentAttraction = action.payload;
    // },
  },
});

export const {
  // updateCurrentCountry,
  // updateCurrentCity,
  // updateCurrentAttraction,
} = globalSlice.actions;
export default globalSlice.reducer;
