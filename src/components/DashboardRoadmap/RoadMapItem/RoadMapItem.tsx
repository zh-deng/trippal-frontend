import { useSortable } from "@dnd-kit/sortable";
import "./RoadMapItem.scss";
import { CSS } from "@dnd-kit/utilities";
import { HiBars2 } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setActiveRoadmapItem } from "../../../state/global/globalSlice";

type RoadMapItemProps = {
	id: number;
	content: string;
	active: boolean;
};

export const RoadMapItem = ({ id, content, active }: RoadMapItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const dispatch = useDispatch();

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleEdit = () => {
		dispatch(setActiveRoadmapItem(id))
	};

	return (
		<div
			className={`roadmap-item ${active && "roadmap-item-active"}`}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<div className="roadmap-bar-icon" {...listeners}>
				<HiBars2 size={32} />
			</div>
			<div className="roadmap-item-content">{content}</div>
			<div className="roadmap-edit-icon" onClick={handleEdit}>
				<FaRegEdit size={28} />
			</div>
		</div>
	);
};
