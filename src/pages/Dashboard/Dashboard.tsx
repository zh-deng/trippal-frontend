import { useEffect, useState } from "react";
import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import { DashboardTabMenu } from "../../components/DashboardTabMenu/DashboardTabMenu";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import "./dashboard.scss";
import {
	Attraction,
	City,
	Country,
	fetchAttractionsByCity,
	fetchCitiesByCountry,
	fetchCountries,
} from "../../services/mapDataService";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {
	updateCurrentAttraction,
	updateCurrentCity,
	updateCurrentCountry,
} from "../../state/dashboard/dashboardSlice";
import { fetchImages } from "../../services/imageService";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";

export const Dashboard = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [attractions, setAttractions] = useState<Attraction[]>([]);
	const [images, setImages] = useState<any[]>([]);
	const currentCountry = useSelector(
		(state: RootState) => state.dashboard.currentCountry
	);
	const currentCity = useSelector(
		(state: RootState) => state.dashboard.currentCity
	);
	const currentAttraction = useSelector(
		(state: RootState) => state.dashboard.currentAttraction
	);
	const dispatch = useDispatch();

	const handleChosenCountry = (option: Country) => {
		dispatch(updateCurrentCountry(option));
		// dispatch(updateCurrentCity(null))
		// dispatch(updateCurrentAttraction(null))
	};

	const handleChosenCity = (option: City) => {
		dispatch(updateCurrentCity(option));
		// dispatch(updateCurrentAttraction(null))
	};

	const handleChosenAttraction = (option: Attraction) => {
		dispatch(updateCurrentAttraction(option));
	};

	useEffect(() => {
		fetchCountries()
			.then(setCountries)
			.catch((error) => console.error("Failed to load countries:", error));
	}, []);

	useEffect(() => {
		if (currentCountry) {
			setCities([]);
			fetchCitiesByCountry(currentCountry?.countryCode)
				.then(setCities)
				.catch((error) => console.error("Failed to load cities:", error));
		}
	}, [currentCountry]);

	useEffect(() => {
		if (currentCity) {
			setAttractions([]);
			fetchAttractionsByCity(currentCity.name)
				.then(setAttractions)
				.catch((error) => console.error("Failed to load attractions:", error));
		}
	}, [currentCity]);

	useEffect(() => {
		if (currentAttraction) {
			fetchImages(`${currentAttraction.name} in ${currentCity?.name}`)
				.then(setImages)
				.catch((error) => console.error("Failed to load images:", error));
		}
	}, [currentAttraction]);

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
							value={currentCountry}
							defaultValue={"Country"}
							onChange={handleChosenCountry}
						/>
						{currentCountry && (
							<Dropdown
								options={cities}
								value={currentCity}
								defaultValue={"City"}
								onChange={handleChosenCity}
							/>
						)}
						{currentCity && (
							<Dropdown
								options={attractions}
								value={currentAttraction}
								defaultValue={"Attractions"}
								onChange={handleChosenAttraction}
							/>
						)}
					</div>
					<div className="center-image-gallery">
						{currentAttraction && <ImageGallery images={images} />}
					</div>
				</div>
				<div className="dashboard-main-right">
					<DashboardMap />
				</div>
			</div>
		</div>
	);
};
