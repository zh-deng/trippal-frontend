import { Link } from "react-router";
import "./Navbar.scss";
import Text from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo.png";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-content">
				<div className="navbar-content-left">
					<div className="navbar-logo">
						<Link to="/">
							<img src={logo} />
						</Link>
					</div>
					<Link to="/">Home</Link>
					<Link to="demo">Demo</Link>
					<Link to="dashboard">Dashboard</Link>
					<Link to="community">Community</Link>
				</div>
				<div className="navbar-content-right">
					<LanguageSwitcher />
					<Link to="registration">
						<Text content="navbar.registration" />
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
