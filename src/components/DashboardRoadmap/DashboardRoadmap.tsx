import { useState } from "react";
import "./DashboardRoadmap.scss";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RoadMapItem } from "./RoadMapItem/RoadMapItem";
import { Text } from "../Text/Text";
import { FiDownload } from "react-icons/fi";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { RoadmapItems } from "../../types/Roadmap";

type DashboardRoadmapProps = {
	roadmapItems: RoadmapItems;
};

export const DashboardRoadmap: React.FC<DashboardRoadmapProps> = ({
	roadmapItems,
}) => {
	const { t } = useTranslation();

	const [items, setItems] = useState<RoadmapItems>(roadmapItems);

	const [isPublic, setIsPublic] = useState<boolean>(false);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex(
					(item) => item.id.toString() === active.id
				);
				const newIndex = items.findIndex(
					(item) => item.id.toString() === over.id
				);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleLock = () => {
		setIsPublic(!isPublic);
	};

	const RoadmapEmptyFallback = () => (
		<div className="roadmap-fallback">
			<Text content={"dashboard.left.emptyFallback"} />
		</div>
	);

	return (
		<div className="dashboard-roadmap">
			<div className="roadmap-container">
				<div className="roadmap-header">
					<div className="roadmap-header-text">
						<Text content="dashboard.left.headerText" isBold={true} />
						<div className="roadmap-header-name">TestRoadmap</div>
					</div>
					<div className="roadmap-header-icons">
						{isPublic ? (
							<FaLockOpen
								size={20}
								onClick={handleLock}
								title={t("dashboard.left.lockIcons.private")}
							/>
						) : (
							<FaLock
								size={20}
								onClick={handleLock}
								title={t("dashboard.left.lockIcons.public")}
							/>
						)}
						<FiDownload size={20} title={t("dashboard.left.downloadIcon")} />
					</div>
				</div>
				{roadmapItems.length ? (
					<div className="roadmap-content">
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={items}
								strategy={verticalListSortingStrategy}
							>
								{items.map((item) => (
									<RoadMapItem
										key={item.id}
										id={item.id.toString()}
										content={item.content}
									/>
								))}
							</SortableContext>
						</DndContext>
					</div>
				) : (
					<RoadmapEmptyFallback />
				)}
			</div>
		</div>
	);
};
