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
import { Text } from "../shared/Text/Text";
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
	toggleTripVisibility,
	updateOldTrip,
} from "../../state/global/globalSlice";
import {
	downloadTrip,
	fetchRoadmapList,
	reorderRoadmap,
	togglePublishStatus,
	updateTrip,
} from "../../services/tripService";
import {
	loadMapData,
	resetMapData,
} from "../../state/dashboard/dashboardSlice";
import { RoadmapReorderRequest } from "../../dtos/roadmapReorderRequest.dto";
import {
	FallBackType,
	FallbackWrapper,
} from "../shared/FallbackWrapper/FallbackWrapper";

export const DashboardRoadmap = () => {
	const { t, i18n } = useTranslation();
	const [roadmapItems, setRoadmapItems] = useState<RoadmapItems>([]);
	const [editingTitle, setEditingTitle] = useState<boolean>(false);
	const [titleInput, setTitleInput] = useState<string>("defaultTitle");

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const activeTripIndex = useSelector(
		(state: RootState) => state.global.activeTripIndex
	);
	const activeRoadmapItemId = useSelector(
		(state: RootState) => state.global.activeRoadmapItemId
	);

	const isPublic = activeUser?.trips[activeTripIndex!].isPublic;

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
			if (
				activeUser !== null &&
				activeTripIndex !== null &&
				activeTripIndex >= 0
			) {
				const tripId = activeUser.trips[activeTripIndex].id!;

				const reorderedRoadmapItems = arrayMove(
					roadmapItems,
					roadmapItems.findIndex((item) => item.id === active.id),
					roadmapItems.findIndex((item) => item.id === over.id)
				);

				const reorderRequest: RoadmapReorderRequest = {
					roadmapItemIds: reorderedRoadmapItems.map((roadmapItem) => {
						return roadmapItem.id!;
					}),
				};

				reorderRoadmap(tripId, reorderRequest)
					.then(() => {
						setRoadmapItems(reorderedRoadmapItems);
						dispatch(replaceRoadmapItems(reorderedRoadmapItems));
					})
					.catch((error) => console.error("Failed reorder Roadmap:", error));
			}
		}
	};

	const handleLock = () => {
		if (
			activeUser !== null &&
			activeTripIndex !== null &&
			activeTripIndex >= 0
		) {
			const tripId: number = activeUser.trips[activeTripIndex].id!;

			togglePublishStatus(tripId)
				.then(() => {
					dispatch(toggleTripVisibility(tripId));
				})
				.catch((error) =>
					console.error("Failed to toggle publish status:", error)
				);
		}
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

	const handleTripDownload = () => {
		if (
			activeUser !== null &&
			activeTripIndex !== null &&
			activeTripIndex >= 0
		) {
			const tripId = activeUser.trips[activeTripIndex].id!;

			downloadTrip(tripId, i18n.language)
				.then(({ data, fileName }) => {
					const url = window.URL.createObjectURL(new Blob([data]));
					const link = document.createElement("a");
					link.href = url;
					link.setAttribute("download", fileName);
					document.body.appendChild(link);
					link.click();

					link.parentNode?.removeChild(link);
					window.URL.revokeObjectURL(url);
				})
				.catch((error) => console.error("Failed to download trip:", error));
		}
	};

	const createNewItem = () => {
		dispatch(setActiveRoadmapItemId(null));
	};

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
						<FiDownload
							size={20}
							title={t("dashboard.left.downloadIcon")}
							onClick={handleTripDownload}
						/>
					</div>
				</div>
				<FallbackWrapper
					fallbackType={FallBackType.EmptyRoadmap}
					shouldRender={roadmapItems.length > 0}
				>
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
				</FallbackWrapper>
			</div>
		</div>
	);
};
