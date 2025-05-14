import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/UserInfo";
import { Trip } from "../../types/Trip";

interface GlobalState {
	activeUser: UserInfo | null;
	activeTripIndex: number | null;
}

const initialState: GlobalState = {
	activeUser: null,
	activeTripIndex: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setActiveUser: (state, action: PayloadAction<UserInfo>) => {
			state.activeUser = action.payload;
			state.activeTripIndex = state.activeUser.trips.length - 1;
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
				state.activeTripIndex = state.activeUser.trips.length - 1;
			}
		},
		removeOldTrip: (state, action: PayloadAction<number>) => {
			const tripId = action.payload;

			if (state.activeUser && Array.isArray(state.activeUser.trips)) {
				const tripIndex = state.activeUser.trips.findIndex(
					(trip) => trip.id === tripId
				);

				if (tripIndex !== -1) {
					state.activeUser.trips.splice(tripIndex, 1);
					if (tripIndex === state.activeTripIndex) {
						state.activeTripIndex = state.activeUser.trips.length - 1;
					}
				}
			}
		},
	},
});

export const {
	setActiveUser,
	logoutActiveUser,
	addNewTrip,
	setActiveTripIndex,
	removeOldTrip,
} = globalSlice.actions;
export default globalSlice.reducer;
