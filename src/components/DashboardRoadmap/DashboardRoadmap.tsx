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

export const DashboardRoadmap = () => {
	const { t } = useTranslation();
	const [items, setItems] = useState<string[]>([
		"Video 1",
		"Video 2",
		"Video 3",
		"Video 4",
		"Video 5",
		"Video 6",
		"Video 7",
		"Video 8",
		"Video 9",
		"Video 10",
		"Video 11",
		"Video 12",
		"Video 13",
		"Video 14",
		"Video 15",
	]);

	const [isPublic, setIsPublic] = useState<boolean>(false);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id as string);
				const newIndex = items.indexOf(over.id as string);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleLock = () => {
		setIsPublic(!isPublic);
	}

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
							<FaLockOpen size={20} onClick={handleLock} title={t("dashboard.left.lockIcons.private")}/>
						) : (
							<FaLock size={20} onClick={handleLock} title={t("dashboard.left.lockIcons.public")}/>
						)}
						<FiDownload size={20} title={t("dashboard.left.downloadIcon")} />
					</div>
				</div>
				<div className="roadmap-content">
					<DndContext
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={items}
							strategy={verticalListSortingStrategy}
						>
							{items.map((id) => (
								<RoadMapItem key={id} id={id} />
							))}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	);
};
