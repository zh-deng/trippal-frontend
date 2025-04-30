import "./DashboardTabMenu.scss";
import { BsPlusLg } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

export const DashboardTabMenu = () => {
	const items: string[] = ["TRIP 1", "TRIP 2", "TRIP 3", "TRIP 4"];

	return (
		<div className="dashboard-tabmenu">
			{items.map((item: string) => (
				<div className="tabmenu-item" key={item}>
					<div className="tabmenu-item-name">{item}</div>
					<div className="tabmenu-item-options">
						<SlOptionsVertical size={16} />
					</div>
				</div>
			))}
			<div className="tabmenu-add">
				<BsPlusLg size={24} />
			</div>
		</div>
	);
};
