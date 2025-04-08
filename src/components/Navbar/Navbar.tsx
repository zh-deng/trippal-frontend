import { Link } from "react-router";
import "./Navbar.scss";
import Text from "../Text/Text";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar__content">
				<div className="navbar__content--left">
					<div className="navbar__logo">
						<img src="../" />
					</div>
					<Link to="/">Home</Link>
					<Link to="demo">Demo</Link>
				</div>
				<div className="navbar__content--right">
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
