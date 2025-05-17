import { useEffect, useRef } from "react";
import { Trip } from "../../../types/Trip";
import "./TabMenuItem.scss";
import { SlOptionsVertical } from "react-icons/sl";
import { Text } from "../../Text/Text";

type TabMenuItemProps = {
	trip: Trip;
	index: number;
	activeTripIndex: number | null;
	activeOptionModal: number | null;
	setOptionModal: (index: number | null) => void;
	setActiveTab: (index: number) => void;
	deleteTrip: (index: number) => void;
};

export const TabMenuItem: React.FC<TabMenuItemProps> = ({
	trip,
	index,
	activeTripIndex,
	activeOptionModal,
	setOptionModal,
	setActiveTab,
	deleteTrip,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const toggleModal = () => {
		setOptionModal(activeOptionModal === index ? null : index);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				activeOptionModal === index
			) {
				setOptionModal(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [activeOptionModal]);

	return (
		<div
			className={`tabmenu-item ${index === activeTripIndex && "active-tab"}`}
			ref={modalRef}
		>
			<div className="tabmenu-item-name" title={trip.title} onClick={() => setActiveTab(index)}>
				{trip.title}
			</div>
			<div className="tabmenu-item-options" onClick={toggleModal}>
				<SlOptionsVertical size={16} />
			</div>
			<div
				className={`tabmenu-item-modal ${
					activeOptionModal === index ? "" : "hidden"
				}`}
				onClick={() => {
					deleteTrip(trip.id!);
				}}
			>
				<Text content={"dashboard.tabBar.deleteTrip"} />
			</div>
		</div>
	);
};
