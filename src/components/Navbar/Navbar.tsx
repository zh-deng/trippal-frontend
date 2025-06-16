import { Link } from "react-router";
import "./Navbar.scss";
import { Text } from "../universal/Text/Text";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { logoutUser } from "../../services/userService";
import { logoutActiveUser } from "../../state/global/globalSlice";
import { useState } from "react";
import { getNickname } from "../../utils/utils";

type NavbarProps = {
	onLoginClick: () => void;
	onRegisterClick: () => void;
};

export const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {
	const navItems = [
		{ name: "home", path: "/" },
		{ name: "demo", path: "/demo" },
		{ name: "dashboard", path: "/dashboard" },
		{ name: "community", path: "/community" },
	];

	const [activeNavItem, setActiveNavItem] = useState<string>("home");
	const activeUser = useSelector((state: RootState) => state.global.activeUser);

	const dispatch = useDispatch();

	const onLogoutClick = () => {
		logoutUser()
			.then(() => {
				dispatch(logoutActiveUser());
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleNavItemClick = (itemName: string) => {
		setActiveNavItem(itemName);
	};

	return (
		<nav className="navbar">
			<div className="navbar-content">
				<div className="navbar-content-left">
					<div className="navbar-logo">
						<Link to="/">
							<img src={logo} alt="App Logo" />
						</Link>
					</div>
					{navItems.map(({ name, path }) => (
						<Link
							key={name}
							to={path}
							className={activeNavItem === name ? "active-nav-item" : ""}
							onClick={() => handleNavItemClick(name)}
						>
							<Text content={`navbar.${name}`} />
						</Link>
					))}
				</div>
				<div className="navbar-content-right">
					<LanguageSwitcher />
					{!activeUser && (
						<>
							<div className="navbar-login" onClick={onLoginClick}>
								<Text content="navbar.login" />
							</div>
							<div className="navbar-registration" onClick={onRegisterClick}>
								<Text content="navbar.registration" />
							</div>
						</>
					)}
					{activeUser && (
						<>
							<div className="navbar-logout" onClick={onLogoutClick}>
								<Text content="navbar.logout" />
							</div>
							<div className="navbar-user-icon" onClick={onRegisterClick}>
								{getNickname(activeUser.name)}
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
