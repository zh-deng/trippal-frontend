// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dashboardReducer from "./dashboard/dashboardSlice";
import globalReducer from "./global/globalSlice";
import demoReducer from "./demo/demoSlice";

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	global: globalReducer,
	demo: demoReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["global", "dashboard"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
