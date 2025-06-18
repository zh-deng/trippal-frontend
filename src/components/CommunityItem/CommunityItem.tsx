import { RoadmapItem } from "../../types/Roadmap";
import { TripExtended } from "../../types/Trip";
import "./CommunityItem.scss";
import { FaStar, FaCommentAlt } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { motion } from "framer-motion";

type CommunityItemProps = {
	trip: TripExtended;
	onClick: (tripId: number) => void;
};

export const CommunityItem: React.FC<CommunityItemProps> = ({
	trip,
	onClick,
}) => {
	const roadmapItems: RoadmapItem[] = trip.roadmapItems ?? [];

	return (
		<motion.div
			className="community-item"
			onClick={() => onClick(trip.id!)}
			layoutId={`card-${trip.id}`}
		>
			<div className="community-item-title">
				{trip.title}
				<IoOpenOutline size={22} />
			</div>
			<div className="community-item-data">
				{/* Only show first 6 items as preview */}
				{roadmapItems.slice(0, 6).map((roadmapItem) => (
					<div className="data-item" key={roadmapItem.id}>
						<span>{roadmapItem.title}</span>
					</div>
				))}
			</div>
			<div className="community-item-metadata">
				<div className="metadata-stars">
					{trip.stars ?? 0}
					<FaStar />
				</div>
				<div className="metadata-comments">
					{trip.comments.length}
					<FaCommentAlt />
				</div>
			</div>
		</motion.div>
	);
};
