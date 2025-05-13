import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/UserInfo";
import { Trip } from "../../types/Trip";

interface GlobalState {
	activeUser: UserInfo | null;
	activeTripIndex: number | null;

}

const initialState: GlobalState = {
	activeUser: null,
	activeTripIndex: null
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setActiveUser: (state, action: PayloadAction<UserInfo>) => {
			state.activeUser = action.payload;
			state.activeTripIndex = state.activeUser.trips.length-1
		},
		setActiveTripIndex: (state, action: PayloadAction<number>) => {
			state.activeTripIndex = action.payload;
		},
		logoutActiveUser: (state) => {
			state.activeUser = null;
		},
		addNewTrip: (state, action: PayloadAction<Trip>) => {
			if (state.activeUser) {
				state.activeUser.trips.push(action.payload);
				state.activeTripIndex = state.activeUser.trips.length-1
			}
		}
	},
});

export const { setActiveUser, logoutActiveUser, addNewTrip, setActiveTripIndex } = globalSlice.actions;
export default globalSlice.reducer;
