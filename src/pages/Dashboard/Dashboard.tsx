import { useEffect, useState } from "react";
import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import { DashboardTabMenu } from "../../components/DashboardTabMenu/DashboardTabMenu";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import "./dashboard.scss";
import { Country, fetchCountries } from "../../services/countryService";

export const Dashboard = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [currentCountry, setCurrentCountry] = useState<Country>();

	const handleChosenCountry = (option: Country) => {
		console.log(option);
		setCurrentCountry(option);
	};

	useEffect(() => {
		fetchCountries()
			.then(setCountries)
			.catch((error) => console.error("Failed to load countries:", error));
	}, []);

	return (
		<div className="dashboard">
			<div>
				<DashboardTabMenu />
			</div>
			<div className="dashboard-main">
				<div className="dashboard-main-left">
					<DashboardRoadmap />
				</div>
				<div className="dashboard-main-center">
					<div className="center-dropdown-container">
						<Dropdown
							options={countries}
							defaultValue={"Country"}
							onChange={handleChosenCountry}
						/>
						{currentCountry && (
							<Dropdown
								options={[]}
								defaultValue={"City"}
								onChange={handleChosenCountry}
							/>
						)}
					</div>
				</div>
				<div className="dashboard-main-right">
					<DashboardMap />
				</div>
			</div>
		</div>
	);
};
