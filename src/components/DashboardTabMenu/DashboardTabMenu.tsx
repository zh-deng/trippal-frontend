import "./DashboardTabMenu.scss";
import { BsPlusLg } from "react-icons/bs";

import { Text } from "../Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Trip } from "../../types/Trip";
import {
	addNewTrip,
	removeOldTrip,
	setActiveTripIndex,
} from "../../state/global/globalSlice";
import { createTrip, removeTrip } from "../../services/tripService";
import { useTranslation } from "react-i18next";
import { TabMenuItem } from "./TabMenuItem/TabMenuItem";
import { useState } from "react";

export const DashboardTabMenu = () => {
	const { t } = useTranslation();

	const [activeOptionModal, setActiveOptionModal] = useState<number | null>(
		null
	);

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const activeTrips = activeUser?.trips || [];
	const activeTripIndex = useSelector(
		(state: RootState) => state.global.activeTripIndex
	);

	const dispatch = useDispatch();

	const addTrip = async () => {
		if (activeUser) {
			const newTrip: Trip = {
				title: `${t("dashboard.tabBar.newTripName")}`,
				isPublic: false,
				userId: activeUser.id,
			};

			createTrip(newTrip)
				.then((trip) => {
					dispatch(addNewTrip(trip));
				})
				.catch((error) => console.error("Failed to create trip:", error));
		}
	};

	const setActiveTab = (index: number) => {
		dispatch(setActiveTripIndex(index));
	};

	const setOptionModal = (index: number | null) => {
		setActiveOptionModal(index);
	};

	const deleteTrip = (tripId: number) => {
		removeTrip(tripId)
			.then(() => {
				dispatch(removeOldTrip(tripId));
				setOptionModal(null);
			})
			.catch((error) => console.error("Failed to delete trip:", error));
	};

	return (
		<div className="dashboard-tabmenu">
			<div className="tabmenu-item-container">
				{activeTrips.map((trip: Trip, index: number) => (
					<TabMenuItem
						key={trip.id}
						trip={trip}
						index={index}
						activeTripIndex={activeTripIndex}
						activeOptionModal={activeOptionModal}
						setOptionModal={setOptionModal}
						setActiveTab={setActiveTab}
						deleteTrip={deleteTrip}
					/>
				))}
				<div className="tabmenu-add" onClick={addTrip}>
					<BsPlusLg size={24} />
					<Text content={"dashboard.tabBar.addTrip"} />
				</div>
			</div>
		</div>
	);
};
