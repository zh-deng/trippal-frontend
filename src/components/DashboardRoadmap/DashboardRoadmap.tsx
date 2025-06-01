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
import { RoadmapItem, RoadmapItems } from "../../types/Roadmap";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
	replaceRoadmapItems,
	setActiveRoadmapItemId,
	updateOldTrip,
} from "../../state/global/globalSlice";
import { fetchRoadmapList, updateTrip } from "../../services/tripService";
import {
	loadMapData,
	resetMapData,
} from "../../state/dashboard/dashboardSlice";

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
	const activeRoadmapItemId = useSelector(
		(state: RootState) => state.global.activeRoadmapItemId
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (
			activeUser !== null &&
			activeTripIndex !== null &&
			activeTripIndex >= 0
		) {
			setTitleInput(activeUser.trips[activeTripIndex].title);

			if (!activeUser.trips[activeTripIndex].roadmapItems) {
				fetchRoadmapList(activeUser.trips[activeTripIndex].id!)
					.then((roadmapList) => {
						const roadmapItems = roadmapList.map((item) => {
							return {
								id: item.id,
								title: item.title,
							} as RoadmapItem;
						});
						dispatch(replaceRoadmapItems(roadmapItems));
						setRoadmapItems(roadmapItems);
					})
					.catch((error) =>
						console.error("Failed to fetch roadmap list:", error)
					);
			} else {
				setRoadmapItems(
					activeUser.trips[activeTripIndex].roadmapItems.map((item) => {
						return {
							id: item.id,
							title: item.title,
						} as RoadmapItem;
					})
				);
			}
		}
		setEditingTitle(false);
	}, [activeTripIndex, activeUser]);

	useEffect(() => {
		if (
			activeUser !== null &&
			activeTripIndex !== null &&
			activeTripIndex >= 0 &&
			activeUser.trips[activeTripIndex].roadmapItems
		) {
			const roadmapItem =
				activeUser.trips[activeTripIndex].roadmapItems.find(
					(item) => item.id === activeRoadmapItemId
				) ?? null;

			dispatch(
				activeRoadmapItemId === null ? resetMapData() : loadMapData(roadmapItem)
			);
		}
	}, [activeRoadmapItemId]);

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
		if (
			editingTitle &&
			activeUser !== null &&
			activeTripIndex !== null &&
			activeTripIndex >= 0
		) {
			if (titleInput !== activeUser?.trips[activeTripIndex].title) {
				updateTrip({
					...activeUser.trips[activeTripIndex],
					title: titleInput,
				})
					.then((updatedTrip) => {
						dispatch(updateOldTrip(updatedTrip));
						setTitleInput(updatedTrip.title);
					})
					.catch((error) => console.error("Failed to update trip:", error));
			}
		}
	};

	const createNewItem = () => {
		dispatch(setActiveRoadmapItemId(null));
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
						<Text content="dashboard.left.headerText" isBold />
						{editingTitle ? (
							<div className="roadmap-header-input">
								<input
									type="text"
									value={titleInput}
									onChange={handleTitleChange}
								/>
							</div>
						) : (
							<div className="roadmap-header-title" title={titleInput}>
								{titleInput}
							</div>
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
					<>
						<div className="roadmap-content">
							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={roadmapItems.map((item) => item.id!)}
									strategy={verticalListSortingStrategy}
								>
									{roadmapItems.map((item) => (
										<RoadMapItem
											key={item.id}
											id={item.id!}
											content={item.title}
											active={item.id === activeRoadmapItemId}
										/>
									))}
								</SortableContext>
							</DndContext>
						</div>
						<div className="roadmap-cta" onClick={createNewItem}>
							<Text content="dashboard.left.cta" isBold />
						</div>
					</>
				) : (
					<RoadmapEmptyFallback />
				)}
			</div>
		</div>
	);
};
