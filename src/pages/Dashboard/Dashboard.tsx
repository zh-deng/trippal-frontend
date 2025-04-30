import { useEffect, useState } from "react";
import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import { DashboardTabMenu } from "../../components/DashboardTabMenu/DashboardTabMenu";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import "./dashboard.scss";
import {
	City,
	Country,
	fetchCitiesByCountry,
	fetchCountries,
} from "../../services/countryService";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { updateCurrentCity, updateCurrentCountry } from "../../state/dashboard/dashboardSlice";

export const Dashboard = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<any[]>([])
	const currentCountry = useSelector(
		(state: RootState) => state.dashboard.currentCountry
	);
	const dispatch = useDispatch();

	const handleChosenCountry = (option: Country) => {
		dispatch(updateCurrentCity(null))
		dispatch(updateCurrentCountry(option));
	};

	const handleChosenCity = (option: City) => {
		dispatch(updateCurrentCity(option));
	};

	useEffect(() => {
		fetchCountries()
			.then(setCountries)
			.catch((error) => console.error("Failed to load countries:", error));
	}, []);

	useEffect(() => {
		if(currentCountry) {
			setCities([]);
			fetchCitiesByCountry(currentCountry?.countryCode)
			.then(setCities)
			.catch((error) => console.error("Failed to load cities:", error));
		}
	}, [currentCountry]);

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
								options={cities}
								defaultValue={"City"}
								onChange={handleChosenCity}
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
