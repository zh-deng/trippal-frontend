import { Link } from "react-router";
import "./Navbar.scss";
import { Text } from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Modal } from "../Modal/Modal";

const Navbar = () => {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

	const handleLoginSwitch = () => {
		setIsRegisterModalOpen(false);
		setIsLoginModalOpen(true);
	}

	const handleRegisterSwitch = () => {
		setIsLoginModalOpen(false);
		setIsRegisterModalOpen(true);
	}

	return (
		<nav className="navbar">
			<div className="navbar-content">
				<div className="navbar-content-left">
					<div className="navbar-logo">
						<Link to="/">
							<img src={logo} />
						</Link>
					</div>
					<Link to="/">
						<Text content="navbar.home" />
					</Link>
					<Link to="demo">
						<Text content="navbar.demo" />
					</Link>
					<Link to="dashboard">
						<Text content="navbar.dashboard" />
					</Link>
					<Link to="community">
						<Text content="navbar.community" />
					</Link>
				</div>
				<div className="navbar-content-right">
					<LanguageSwitcher />
					<div
						className="navbar-login"
						onClick={() => setIsLoginModalOpen(true)}
					>
						<Text content="navbar.login" />
					</div>
					<div
						className="navbar-registration"
						onClick={() => setIsRegisterModalOpen(true)}
					>
						<Text content="navbar.registration" />
					</div>
					<Modal
						isOpen={isRegisterModalOpen}
						onClose={() => setIsRegisterModalOpen(false)}
						title="Sign Up"
					>
						<form>
							<div className="register-form">
								<label>
									Username
									<input type="text" placeholder="Username" />
								</label>
								<label>
									Email
									<input type="email" placeholder="Email" />
								</label>
								<label>
									Password
									<input type="password" placeholder="Password" />
								</label>
								<label>
									Repeat password
									<input type="password" placeholder="Repeat password" />
								</label>
								<button type="submit">Sign up</button>
								<div className="register-form-login">
									<Text content={"Already have an account?"} />
									<div className="login-button" onClick={handleLoginSwitch}>Login</div>
								</div>
							</div>
						</form>
					</Modal>
					<Modal
						isOpen={isLoginModalOpen}
						onClose={() => setIsLoginModalOpen(false)}
						title="Login"
					>
						<form>
							<div className="login-form">
								<label>
									Email
									<input type="email" placeholder="Email" />
								</label>
								<label>
									Password
									<input type="password" placeholder="Password" />
								</label>
								<button type="submit">Login</button>
								<div className="login-form-register">
									<Text content={"Already have an account?"} />
									<div className="register-button" onClick={handleRegisterSwitch}>Register</div>
								</div>
							</div>
						</form>
					</Modal>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
