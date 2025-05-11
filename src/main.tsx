import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import { BrowserRouter } from "react-router";
import "./i18n";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
