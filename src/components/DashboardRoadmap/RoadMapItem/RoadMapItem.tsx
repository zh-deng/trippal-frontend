import { useSortable } from "@dnd-kit/sortable";
import "./RoadMapItem.scss";
import { CSS } from "@dnd-kit/utilities";
import { HiBars2 } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";

type RoadMapItemProps = {
	id: number;
	content: string;
};

export const RoadMapItem = ({ id, content }: RoadMapItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleEdit = () => {

	}

	return (
		<div
			className="roadmap-item"
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<div className="roadmap-bar-icon" {...listeners}>
				<HiBars2 size={32} />
			</div>
			<div className="roadmap-item-content">{content}</div>
			<div className="roadmap-edit-icon" onClick={handleEdit}>
				<FaRegEdit size={28}/>
			</div>
		</div>
	);
};
