import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/UserInfo";

interface GlobalState {
	activeUser: UserInfo | null;
}

const initialState: GlobalState = {
	activeUser: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setActiveUser: (state, action: PayloadAction<UserInfo>) => {
			state.activeUser = action.payload;
		},
		logoutActiveUser: (state) => {
			state.activeUser = null;
		}
	},
});

export const { setActiveUser, logoutActiveUser } = globalSlice.actions;
export default globalSlice.reducer;
