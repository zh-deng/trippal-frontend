import "./DashboardTabMenu.scss";
import { BsPlusLg } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { Text } from "../Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Trip } from "../../types/Trip";
import { addNewTrip, setActiveTripIndex } from "../../state/global/globalSlice";
import { createTrip } from "../../services/tripService";
import { useTranslation } from "react-i18next";

export const DashboardTabMenu = () => {
	const { t } = useTranslation();
	const activeUser = useSelector((state: RootState) => state.global.activeUser);
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

	const changeActiveTab = (index: number) => {
		dispatch(setActiveTripIndex(index))
	}

	return (
		<div className="dashboard-tabmenu">
			<div className="tabmenu-item-container">
				{activeUser?.trips.map((trip: Trip, index: number) => (
					<div
						className={`tabmenu-item ${
							index === activeTripIndex && "active-tab"
						}`}
						onClick={() => changeActiveTab(index)}
						key={trip.id}
					>
						<div className="tabmenu-item-name">{trip.title}</div>
						<div className="tabmenu-item-options">
							<SlOptionsVertical size={16} />
						</div>
					</div>
				))}
				<div className="tabmenu-add" onClick={addTrip}>
					<BsPlusLg size={24} />
					<Text content={"dashboard.tabBar.addTrip"} />
				</div>
			</div>
		</div>
	);
};
