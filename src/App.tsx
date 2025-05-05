import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Demo } from "./pages/Demo/Demo";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Community } from "./pages/Community/Community";
import { Footer } from "./components/Footer/Footer";
import "leaflet/dist/leaflet.css";

function App() {
	return (
		<div className="app">
			<Navbar />
			<div className="app__pages">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="demo" element={<Demo />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="community" element={<Community />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
