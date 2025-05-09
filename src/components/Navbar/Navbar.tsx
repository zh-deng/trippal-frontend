import { Link } from "react-router";
import "./Navbar.scss";
import { Text } from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";

type NavbarProps = {
	onLoginClick: () => void;
	onRegisterClick: () => void;
}

const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {

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
						onClick={onLoginClick}
					>
						<Text content="navbar.login" />
					</div>
					<div
						className="navbar-registration"
						onClick={onRegisterClick}
					>
						<Text content="navbar.registration" />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
