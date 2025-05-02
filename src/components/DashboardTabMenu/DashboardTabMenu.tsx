import "./DashboardTabMenu.scss";
import { BsPlusLg } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { Text } from "../Text/Text";

export const DashboardTabMenu = () => {
	const items: string[] = ["TRIP 1", "TRIP 2", "TRIP 3", "TRIP 4"];

	return (
		<div className="dashboard-tabmenu">
			<div className="tabmenu-item-container">
				{items.map((item: string, index: number) => (
					<div className={`tabmenu-item ${index === 0 && "active-tab"}`} key={item}>
						<div className="tabmenu-item-name">{item}</div>
						<div className="tabmenu-item-options">
							<SlOptionsVertical size={16} />
						</div>
					</div>
				))}
				<div className="tabmenu-add">
					<BsPlusLg size={24} />
					<Text content={"dashboard.tabBar.addTrip"} />
				</div>
			</div>
		</div>
	);
};
