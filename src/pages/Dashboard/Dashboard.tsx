import { useEffect, useRef, useState } from "react";
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
	resetMapData,
	updateCurrentAttraction,
	updateCurrentCity,
	updateCurrentCountry,
} from "../../state/dashboard/dashboardSlice";
import { fetchImages, ImageData } from "../../services/imageService";
import { ImageGallery } from "../../components/ImageGallery/ImageGallery";
import { useTranslation } from "react-i18next";
import { Text } from "../../components/Text/Text";
import { DashboardInput } from "../../components/DashboardInput/DashboardInput";
import { MdDelete } from "react-icons/md";
import { deleteRoadmapItemById } from "../../services/roadmapItemService";
import { removeActiveRoadmapItem, setActiveRoadmapItemId } from "../../state/global/globalSlice";

export const Dashboard = () => {
	const { t } = useTranslation();
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [attractions, setAttractions] = useState<Attraction[]>([]);
	const [images, setImages] = useState<ImageData[]>([]);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const activeTripIndex = useSelector(
		(state: RootState) => state.global.activeTripIndex
	);
	const activeRoadmapItemId = useSelector(
		(state: RootState) => state.global.activeRoadmapItemId
	);
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

	useEffect(() => {
		dispatch(setActiveRoadmapItemId(null))
		dispatch(resetMapData())
	}, [activeTripIndex])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setOpenDeleteModal(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openDeleteModal]);

	const routeItemTitle = [
		currentCountry?.name,
		currentCity?.name,
		currentAttraction?.name,
	]
		.filter(Boolean)
		.join(" / ");

	const handleChosenCountry = (option: Country) => {
		dispatch(updateCurrentCountry(option));
		dispatch(updateCurrentCity(null));
		dispatch(updateCurrentAttraction(null));
	};

	const handleChosenCity = (option: City) => {
		dispatch(updateCurrentCity(option));
		dispatch(updateCurrentAttraction(null));
	};

	const handleChosenAttraction = (option: Attraction) => {
		dispatch(updateCurrentAttraction(option));
	};

	const toggleDeleteModal = () => {
		setOpenDeleteModal(!openDeleteModal);
	};

	const deleteRoadmapItem = () => {
		toggleDeleteModal();

		if (activeRoadmapItemId !== null) {
			deleteRoadmapItemById(activeRoadmapItemId)
				.then(() => {
					dispatch(removeActiveRoadmapItem());
				})
				.catch((error) => console.error("Failed to load images:", error));
		}
	};

	const ImageGalleryFallback = () => (
		<div className="image-gallery-fallback">
			<Text content={"dashboard.center.imageGallery.fallback"} />
		</div>
	);

	const EmptyTripsFallback = () => (
		<div className="empty-trips-fallback">
			<Text content={"dashboard.emptyTripFallback"} />
		</div>
	);

	if (activeUser === null) {
		return (
			<div className="dashboard-fallback">
				<div className="dashboard-fallback-text">
					<Text isBold content={"dashboard.fallback"} />
				</div>
			</div>
		);
	}

	return (
		<div className="dashboard">
			{/* For testing purposes */}
			{/* <div>{`Current user: ${JSON.stringify(activeUser)}`}</div> */}
			{openDeleteModal && (
				<div className="dashboard-delete-modal" ref={modalRef}>
					<Text isBold content={"dashboard.deleteModal.text"} />
					<div className="delete-modal-buttons">
						<button onClick={deleteRoadmapItem}>
							<Text isBold content={"dashboard.deleteModal.delete"} />
						</button>
						<button onClick={toggleDeleteModal}>
							<Text isBold content={"dashboard.deleteModal.cancel"} />
						</button>
					</div>
				</div>
			)}
			<div>
				<DashboardTabMenu />
			</div>
			<div className="dashboard-main">
				{activeTripIndex !== null && activeTripIndex >= 0 ? (
					<>
						<div className="dashboard-main-left">
							<DashboardRoadmap />
						</div>
						<div className="dashboard-main-center">
							<div className="center-container">
								<div className="center-container-breadcrumb">
									{routeItemTitle ? (
										<span>{routeItemTitle}</span>
									) : (
										<Text content="dashboard.center.routeTitleFallback" />
									)}
									{activeRoadmapItemId !== null && (
										<div className="center-container-delete">
											<MdDelete size={24} onClick={toggleDeleteModal} />
										</div>
									)}
								</div>
								<div className="center-dropdown-container">
									<Dropdown
										options={countries}
										value={currentCountry}
										defaultValue={t("dashboard.center.dropdown.country")}
										onChange={handleChosenCountry}
									/>
									{currentCountry && (
										<Dropdown
											options={cities}
											value={currentCity}
											defaultValue={t("dashboard.center.dropdown.city")}
											onChange={handleChosenCity}
										/>
									)}
									{currentCity && (
										<Dropdown
											options={attractions}
											value={currentAttraction}
											defaultValue={t("dashboard.center.dropdown.attraction")}
											onChange={handleChosenAttraction}
										/>
									)}
								</div>
								<div className="center-image-gallery">
									{currentAttraction ? (
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
						<div className="dashboard-main-right">
							<DashboardMap />
						</div>
					</>
				) : (
					<EmptyTripsFallback />
				)}
			</div>
		</div>
	);
};
