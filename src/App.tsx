import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import { Demo } from "./pages/Demo/Demo";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Community } from "./pages/Community/Community";
import { Footer } from "./components/Footer/Footer";
import "leaflet/dist/leaflet.css";
import LoginModal from "./components/Modal/LoginModal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal/RegisterModal";
import { useState } from "react";

function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);

	return (
		<div className="app">
			<div className="app-navbar">
				<Navbar
					onLoginClick={() => setIsLoginOpen(true)}
					onRegisterClick={() => setIsRegisterOpen(true)}
				/>
				<LoginModal
					isOpen={isLoginOpen}
					onClose={() => setIsLoginOpen(false)}
					onSwitchToRegister={() => {
						setIsLoginOpen(false);
						setIsRegisterOpen(true);
					}}
				/>
				<RegisterModal
					isOpen={isRegisterOpen}
					onClose={() => setIsRegisterOpen(false)}
					onSwitchToLogin={() => {
						setIsRegisterOpen(false);
						setIsLoginOpen(true);
					}}
				/>
			</div>
			<div className="app-pages">
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
