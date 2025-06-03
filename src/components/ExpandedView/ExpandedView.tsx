import { useEffect, useRef } from "react";
import { Text } from "../Text/Text";
import { Trip } from "../../types/Trip";
import "./ExpandedView.scss";
import { motion } from "framer-motion";
import { FaStar, FaCopy, FaArrowDown } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { RoadmapItemCard } from "../RoadmapItemCard/RoadmapItemCard";
import { useTranslation } from "react-i18next";

type ExpandedViewProps = {
	trip: Trip;
	onClose: () => void;
	expandedId: number;
};

export const ExpandedView: React.FC<ExpandedViewProps> = ({
	trip,
	onClose,
	expandedId,
}) => {
	const { t } = useTranslation();
	const roadmapItems = trip.roadmapItems ?? [];
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [expandedId]);

	return (
		<motion.div
			ref={modalRef}
			className="expanded-view"
			layoutId={`card-${trip.id}`}
		>
			<div className="view-actionbar">
				<button onClick={onClose}>
					<Text content={"Zurück"} />
				</button>
				<div className="view-actionbar-icons">
					<div className="view-actionbar-stars">
						{/* { trip.stars ?? 0 }  */}
						0
						<FaStar className="actionbar-star" size={22} />
					</div>
					<FaCopy
						className="icon"
						size={22}
						title={t("community.expandedView.copyIcon")}
					/>
					<FiDownload
						className="icon"
						size={22}
						title={t("community.expandedView.downloadIcon")}
					/>
				</div>
			</div>
			<div className="expanded-view-content">
				<div className="content-data">
					<div className="content-data-title">{trip.title}</div>
					<div className="data-roadmapItem-container">
						{roadmapItems.map((roadmapItem, index) => {
							return (
								<>
									<RoadmapItemCard
										roadmapItem={roadmapItem}
										key={roadmapItem.id}
									/>
									{index !== roadmapItems.length - 1 && <FaArrowDown />}
								</>
							);
						})}
					</div>
				</div>
				{/* TODO */}
				<div className="content-comments">comments</div>
			</div>
		</motion.div>
	);
};
