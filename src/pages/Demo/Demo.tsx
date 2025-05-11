import { useEffect, useState } from "react";
import { DashboardMap } from "../../components/DashboardMap/DashboardMap";
import { DashboardRoadmap } from "../../components/DashboardRoadmap/DashboardRoadmap";
import { DashboardTabMenu } from "../../components/DashboardTabMenu/DashboardTabMenu";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import "./demo.scss";
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
import { fetchImages, ImageData } from "../../services/imageService";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { useTranslation } from "react-i18next";
import { Text } from "../../components/Text/Text";
import { DashboardInput } from "../../components/DashboardInput/DashboardInput";
import {
	updateDemoAttraction,
	updateDemoCity,
	updateDemoCountry,
} from "../../state/demo/demoSlice";

export const Demo = () => {
	const { t } = useTranslation();
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [attractions, setAttractions] = useState<Attraction[]>([]);
	const [images, setImages] = useState<ImageData[]>([]);

	const demoCountry = useSelector((state: RootState) => state.demo.demoCountry);
	const demoCity = useSelector((state: RootState) => state.demo.demoCity);
	const demoAttraction = useSelector(
		(state: RootState) => state.demo.demoAttraction
	);
	const demoRoadmapItems = useSelector((state: RootState) => state.demo.demoRoadmapItems);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchCountries()
			.then(setCountries)
			.catch((error) => console.error("Failed to load countries:", error));
	}, []);

	useEffect(() => {
		if (demoCountry) {
			setCities([]);
			fetchCitiesByCountry(demoCountry?.countryCode)
				.then(setCities)
				.catch((error) => console.error("Failed to load cities:", error));
		}
	}, [demoCountry]);

	useEffect(() => {
		if (demoCity) {
			setAttractions([]);
			fetchAttractionsByCity(demoCity.name)
				.then(setAttractions)
				.catch((error) => console.error("Failed to load attractions:", error));
		}
	}, [demoCity]);

	useEffect(() => {
		if (demoAttraction) {
			fetchImages(`${demoAttraction.name} in ${demoCity?.name}`)
				.then(setImages)
				.catch((error) => console.error("Failed to load images:", error));
		}
	}, [demoAttraction]);

	const routeItemTitle = [
		demoCountry?.name,
		demoCity?.name,
		demoAttraction?.name,
	]
		.filter(Boolean)
		.join(" / ");

	const handleChosenCountry = (option: Country) => {
		dispatch(updateDemoCountry(option));
		dispatch(updateDemoCity(null));
		dispatch(updateDemoAttraction(null));
	};

	const handleChosenCity = (option: City) => {
		dispatch(updateDemoCity(option));
		dispatch(updateDemoAttraction(null));
	};

	const handleChosenAttraction = (option: Attraction) => {
		dispatch(updateDemoAttraction(option));
	};

	const ImageGalleryFallback = () => (
		<div className="image-gallery-fallback">
			<Text content={"dashboard.center.imageGallery.fallback"} />
		</div>
	);

	return (
		<div className="demo">
			<div>
				<DashboardTabMenu />
			</div>
			<div className="demo-main">
				<div className="demo-main-left">
					<DashboardRoadmap roadmapItems={demoRoadmapItems} />
				</div>
				<div className="demo-main-center">
					<div className="center-container">
						<div className="center-container-breadcrumb">
							{routeItemTitle ? (
								<span>{routeItemTitle}</span>
							) : (
								<Text content="dashboard.center.routeTitleFallback" />
							)}
						</div>
						<div className="center-dropdown-container">
							<Dropdown
								options={countries}
								value={demoCountry}
								defaultValue={t("dashboard.center.dropdown.country")}
								onChange={handleChosenCountry}
							/>
							{demoCountry && (
								<Dropdown
									options={cities}
									value={demoCity}
									defaultValue={t("dashboard.center.dropdown.city")}
									onChange={handleChosenCity}
								/>
							)}
							{demoCity && (
								<Dropdown
									options={attractions}
									value={demoAttraction}
									defaultValue={t("dashboard.center.dropdown.attraction")}
									onChange={handleChosenAttraction}
								/>
							)}
						</div>
						<div className="center-image-gallery">
							{demoAttraction ? (
								<ImageGallery images={images} />
							) : (
								<ImageGalleryFallback />
							)}
						</div>
						<div className="center-controls">
							<DashboardInput />
						</div>
					</div>
				</div>
				<div className="demo-main-right">
					<DashboardMap />
				</div>
			</div>
		</div>
	);
};
