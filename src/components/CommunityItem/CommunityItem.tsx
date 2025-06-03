import { RoadmapItem } from "../../types/Roadmap";
import { Trip } from "../../types/Trip";
import "./CommunityItem.scss";
import { FaStar, FaCommentAlt } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { motion } from "framer-motion";

type CommunityItemProps = {
	trip: Trip;
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
				{roadmapItems.map((roadmapItem, index) => {
					return index < 6 ? (
						<div className="data-item" key={roadmapItem.id}>
							<span>{roadmapItem.title}</span>
						</div>
					) : (
						<></>
					);
				})}
			</div>
			<div className="community-item-metadata">
				<div className="metadata-stars">
					{/* { trip.stars ?? 0 }  */}
					0
					<FaStar />
				</div>
				<div className="metadata-comments">
					{/* { trip.comments.length ?? 0 } */}
					0
					<FaCommentAlt />
				</div>
			</div>
		</motion.div>
	);
};
