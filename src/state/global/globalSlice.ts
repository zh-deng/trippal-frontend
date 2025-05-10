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
	},
});

export const { setActiveUser } = globalSlice.actions;
export default globalSlice.reducer;
