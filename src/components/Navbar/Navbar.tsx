import { Link } from "react-router";
import "./Navbar.scss";
import { Text } from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { useTranslation } from "react-i18next";

const Navbar = () => {
	const { t } = useTranslation();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
	const [isRegisterModalOpen, setIsRegisterModalOpen] =
		useState<boolean>(false);

	const handleLoginSwitch = () => {
		setIsRegisterModalOpen(false);
		setIsLoginModalOpen(true);
	};

	const handleRegisterSwitch = () => {
		setIsLoginModalOpen(false);
		setIsRegisterModalOpen(true);
	};

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
						title={t("registerModal.signUp")}
					>
						<form>
							<div className="register-form">
								<label>
									<Text content={t("registerModal.username")} />
									<input
										type="text"
										placeholder={t("registerModal.username")}
									/>
								</label>
								<label>
									<Text content={t("registerModal.email")} />
									<input type="email" placeholder={t("registerModal.email")} />
								</label>
								<label>
									<Text content={t("registerModal.password")} />
									<input
										type="password"
										placeholder={t("registerModal.password")}
									/>
								</label>
								<label>
									<Text content={t("registerModal.passwordRepeat")} />
									<input
										type="password"
										placeholder={t("registerModal.passwordRepeat")}
									/>
								</label>
								<button type="submit">
									<Text content={t("registerModal.signUp")} />
								</button>
								<div className="register-form-login">
									<Text content={"registerModal.loginSwitchText"} />
									<div className="login-button" onClick={handleLoginSwitch}>
										<Text content={"registerModal.loginSwitch"} />
									</div>
								</div>
							</div>
						</form>
					</Modal>
					<Modal
						isOpen={isLoginModalOpen}
						onClose={() => setIsLoginModalOpen(false)}
						title={t("loginModal.login")}
					>
						<form>
							<div className="login-form">
								<label>
									<Text content={t("loginModal.email")} />
									<input type="email" placeholder={t("loginModal.email")} />
								</label>
								<label>
									<Text content={t("loginModal.password")} />
									<input
										type="password"
										placeholder={t("loginModal.password")}
									/>
								</label>
								<button type="submit">
									<Text content={t("loginModal.login")} />
								</button>
								<div className="login-form-register">
									<Text content={"loginModal.registerSwitchText"} />
									<div
										className="register-button"
										onClick={handleRegisterSwitch}
									>
										<Text content={"loginModal.registerSwitch"} />
									</div>
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
