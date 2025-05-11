import { Link } from "react-router";
import "./Navbar.scss";
import { Text } from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { logoutUser } from "../../services/userService";
import { logoutActiveUser } from "../../state/global/globalSlice";

type NavbarProps = {
	onLoginClick: () => void;
	onRegisterClick: () => void;
};

const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {
	const activeUser = useSelector((state: RootState) => state.global.activeUser);

	const dispatch = useDispatch();

	const getNickname = (): string => {
		return activeUser?.name.substring(0, 2).toUpperCase() ?? "";
	};

	const onLogoutClick = () => {
		logoutUser()
			.then(() => {
				dispatch(logoutActiveUser());
			})
			.catch((error) => {
				console.error(error);
			});
		//
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
								{getNickname()}
							</div>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
