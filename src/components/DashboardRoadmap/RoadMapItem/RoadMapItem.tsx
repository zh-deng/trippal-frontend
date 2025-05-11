import { useSortable } from "@dnd-kit/sortable";
import "./RoadMapItem.scss";
import { CSS } from "@dnd-kit/utilities";
import { HiBars2 } from "react-icons/hi2";

type RoadMapItemProps = {
	id: string;
	content: string
};

export const RoadMapItem = ({ id, content }: RoadMapItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			className="roadmap-item"
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<div className="roadmap-item-icon">
				<HiBars2 size={32} />
			</div>
			<div className="roadmap-item-content">{content}</div>
		</div>
	);
};
