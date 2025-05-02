import React, { useEffect } from "react";
import {
	MapContainer,
	TileLayer,
	useMap,
} from "react-leaflet";
import "./MapComponent.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { LatLngTuple } from "leaflet";
import "./MapComponent.scss"


export const MapComponent: React.FC = () => {

	const MapControls: React.FC = () => {
		const currentCountry = useSelector(
			(state: RootState) => state.dashboard.currentCountry
		);
		const currentCity = useSelector(
			(state: RootState) => state.dashboard.currentCity
		);
		const currentAttraction = useSelector(
			(state: RootState) => state.dashboard.currentAttraction
		);
		const map = useMap();
		
		let currentCountryCoord: LatLngTuple | null = null;
		let currentCityCoord: LatLngTuple | null = null;
		let currentAttractionCoord: LatLngTuple | null = null;

		const hasSameCoords = (currentCoord: LatLngTuple | null, newCoord: LatLngTuple) => {
			if(currentCoord && currentCoord[0] === newCoord[0] && currentCoord[1] === newCoord[1]){
				return true;
			} else {
				return false;
			}
		}

		useEffect(() => {
			if (currentCountry && !hasSameCoords(currentCountryCoord, currentCountry.coordinates as LatLngTuple)) {
				console.log("country")
				map.flyTo(currentCountry.coordinates, 6, { duration: 1.5 });
				currentCountryCoord = currentCountry.coordinates as LatLngTuple;
				currentCityCoord = null;
				currentAttractionCoord = null;
			}
		}, [currentCountry]);

		useEffect(() => {
			if (currentCity && !hasSameCoords(currentCityCoord, currentCity.coordinates as LatLngTuple)) {
				console.log("city")
				map.flyTo(currentCity.coordinates, 11, { duration: 1.5 });
				currentCityCoord = currentCity.coordinates as LatLngTuple;
				currentAttractionCoord = null;
			}
		}, [currentCity]);

		useEffect(() => {
			if (currentAttraction && !hasSameCoords(currentAttractionCoord, currentAttraction.coordinates as LatLngTuple)) {
					console.log("attraction")
					map.flyTo(currentAttraction.coordinates, 17, { duration: 1.5 });
					currentAttractionCoord = currentAttraction.coordinates as LatLngTuple;
			}
		}, [currentAttraction]);

		return null;

	};

	return (
		<div className="map" id="map">
			<MapContainer
				center={[20, 0]}
				zoom={2}
				style={{ height: "500px", width: "100%" }}
			>
				<TileLayer
					attribution="&copy; OpenStreetMap contributors"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapControls />
			</MapContainer>
		</div>
	);
};
