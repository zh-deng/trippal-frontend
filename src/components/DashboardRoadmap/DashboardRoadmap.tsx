import { useEffect, useState } from "react";
import "./DashboardRoadmap.scss";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { RoadMapItem } from "./RoadMapItem/RoadMapItem";
import { Text } from "../Text/Text";
import { FiDownload } from "react-icons/fi";
import { FaLock, FaLockOpen, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { RoadmapItems } from "../../types/Roadmap";
import { MdModeEditOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export const DashboardRoadmap = () => {
	const { t } = useTranslation();
	const [roadmapItems, setRoadmapItems] = useState<RoadmapItems>([]);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [editingTitle, setEditingTitle] = useState<boolean>(false);
	const [titleInput, setTitleInput] = useState<string>("defaultTitle");

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const activeTripIndex = useSelector(
		(state: RootState) => state.global.activeTripIndex
	);

	useEffect(() => {
		if (activeUser && activeTripIndex) {
			setTitleInput(activeUser.trips[activeTripIndex].title);
			// TODO
			if (activeUser.trips[activeTripIndex].roadMapItems)
				setRoadmapItems(activeUser.trips[activeTripIndex].roadMapItems);
		}
	}, [activeTripIndex]);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleInput(event.target.value);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setRoadmapItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	const handleLock = () => {
		setIsPublic(!isPublic);
	};

	const toggleEditingTitle = () => {
		setEditingTitle(!editingTitle);
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
						{editingTitle ? (
							<div className="roadmap-header-input">
								<input
									type="text"
									value={titleInput}
									onChange={handleTitleChange}
								/>
							</div>
						) : (
							<div className="roadmap-header-title">{titleInput}</div>
						)}
					</div>
					<div className="roadmap-header-icons">
						{editingTitle ? (
							<FaCheck
								size={18}
								onClick={toggleEditingTitle}
								title={t("dashboard.left.confirmTitleIcon")}
							/>
						) : (
							<MdModeEditOutline
								size={20}
								onClick={toggleEditingTitle}
								title={t("dashboard.left.editTitleIcon")}
							/>
						)}
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
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={roadmapItems.map((item) => item.id)}
								strategy={verticalListSortingStrategy}
							>
								{roadmapItems.map((item) => (
									<RoadMapItem
										key={item.id}
										id={item.id}
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
