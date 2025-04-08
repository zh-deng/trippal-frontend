import { Link } from "react-router";
import "./Navbar.scss";

const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="navbar-content">
				<div className="navbar-logo">
					<img src="../" />
				</div>
				<div>
					<Link to="/">Home</Link>
					<Link to="demo">Demo</Link>
					<Link to="registration">Registration</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
