import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/UserInfo";
import { Trip } from "../../types/Trip";
import { RoadmapItem } from "../../types/Roadmap";

interface GlobalState {
	activeUser: UserInfo | null;
	activeTripIndex: number | null;
	activeRoadmapItemId: number | null;
}

const initialState: GlobalState = {
	activeUser: null,
	activeTripIndex: null,
	activeRoadmapItemId: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setActiveUser: (state, action: PayloadAction<UserInfo>) => {
			state.activeUser = action.payload;
			state.activeTripIndex = action.payload.trips.length - 1;
		},
		setActiveTripIndex: (state, action: PayloadAction<number>) => {
			state.activeTripIndex = action.payload;
		},
		setActiveRoadmapItemId: (state, action: PayloadAction<number | null>) => {
			state.activeRoadmapItemId = action.payload;
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
		updateOldTrip: (state, action: PayloadAction<Trip>) => {
			const updatedTrip = action.payload;

			if (state.activeUser) {
				state.activeUser.trips = state.activeUser.trips.map((trip) =>
					trip.id === updatedTrip.id ? updatedTrip : trip
				);
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
		addNewRoadmapItem: (state, action: PayloadAction<RoadmapItem>) => {
			const newRoadmapItem = action.payload;

			if (
				state.activeUser &&
				state.activeTripIndex !== null &&
				state.activeUser.trips[state.activeTripIndex]
			) {
				const trip = state.activeUser.trips[state.activeTripIndex];

				const updatedTrip = {
					...trip,
					roadmapItems: [...(trip.roadmapItems || []), newRoadmapItem],
				};

				state.activeUser.trips = state.activeUser.trips.map((t) =>
					t.id === updatedTrip.id ? updatedTrip : t
				);
			}
		},
		updateOldRoadmapItem: (state, action: PayloadAction<RoadmapItem>) => {
			const updatedRoadmapItem = action.payload;

			if (
				state.activeUser &&
				state.activeTripIndex !== null &&
				state.activeUser.trips[state.activeTripIndex]
			) {
				const trip = state.activeUser.trips[state.activeTripIndex];

				const updatedTrip = {
					...trip,
					roadmapItems: [
						...(trip.roadmapItems ?? []).map((item) => {
							return updatedRoadmapItem.id !== item.id
								? item
								: updatedRoadmapItem;
						}),
					],
				};

				state.activeUser.trips = state.activeUser.trips.map((t) =>
					t.id === updatedTrip.id ? updatedTrip : t
				);
			}
		},
		replaceRoadmapItems: (state, action: PayloadAction<RoadmapItem[]>) => {
			const roadmapItems = action.payload;

			if (
				state.activeUser &&
				state.activeTripIndex !== null &&
				state.activeUser.trips[state.activeTripIndex]
			) {
				const trip = state.activeUser.trips[state.activeTripIndex];

				const updatedTrip = {
					...trip,
					roadmapItems: [...roadmapItems],
				};

				state.activeUser.trips = state.activeUser.trips.map((t) =>
					t.id === updatedTrip.id ? updatedTrip : t
				);
			}
		},
		removeActiveRoadmapItem: (state) => {
			const roadmapItemId = state.activeRoadmapItemId;
			if (state.activeUser !== null && state.activeTripIndex !== null) {
				const trip = state.activeUser.trips[state.activeTripIndex];

				const updatedRoadMapItems = (trip.roadmapItems ?? []).filter(
					(roadmapItem) => roadmapItem.id !== roadmapItemId
				);

				const updatedTrips = [...state.activeUser.trips];
				updatedTrips[state.activeTripIndex] = {
					...trip,
					roadmapItems: updatedRoadMapItems,
				};

				state.activeUser = {
					...state.activeUser,
					trips: updatedTrips,
				};

				state.activeRoadmapItemId = null;
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
	updateOldTrip,
	addNewRoadmapItem,
	updateOldRoadmapItem,
	setActiveRoadmapItemId,
	replaceRoadmapItems,
	removeActiveRoadmapItem,
} = globalSlice.actions;
export default globalSlice.reducer;
