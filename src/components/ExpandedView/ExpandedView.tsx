import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Text } from "../Text/Text";
import { Comment, TripExtended } from "../../types/Trip";
import "./ExpandedView.scss";
import { motion } from "framer-motion";
import { FaStar, FaCopy, FaArrowDown, FaRegStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { RoadmapItemCard } from "../RoadmapItemCard/RoadmapItemCard";
import { useTranslation } from "react-i18next";
import { CommentItem } from "../CommentItem/CommentItem";
import React from "react";
import {
	createTripComment,
	removeTripComment,
} from "../../services/tripCommentService";
import { TripComment } from "../../dtos/tripComment.dto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
	copyTrip,
	downloadTrip,
	toggleStarStatus,
} from "../../services/tripService";
import { addNewTrip } from "../../state/global/globalSlice";
import { toast } from "react-toastify";

type ExpandedViewProps = {
	trip: TripExtended;
	onClose: () => void;
	expandedId: number;
	onCommentUpdate: (comment: Comment) => void;
	onCommentDelete: (commentId: number, tripId: number) => void;
	onToggleStar: (tripId: number) => void;
};

export const ExpandedView: React.FC<ExpandedViewProps> = ({
	trip,
	onClose,
	expandedId,
	onCommentUpdate,
	onCommentDelete,
	onToggleStar,
}) => {
	const { t, i18n } = useTranslation();
	const roadmapItems = trip.roadmapItems ?? [];
	const modalRef = useRef<HTMLDivElement>(null);
	const [comments, setComments] = useState<Comment[]>(trip.comments);
	const [currentComment, setCurrentComment] = useState<string>("");

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const loggedIn = activeUser !== null;

	const dispatch = useDispatch();

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

	useEffect(() => {
		setComments(trip.comments);
	}, [trip.comments]);

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCurrentComment(e.target.value);
	};

	const handleCommentSubmission = (e: React.FormEvent) => {
		e.preventDefault();

		if (loggedIn) {
			const comment: TripComment = {
				authorId: activeUser.id,
				content: currentComment,
				tripId: trip.id,
			};
			createTripComment(comment)
				.then((tripComment) => {
					onCommentUpdate(tripComment);
					setCurrentComment("");
				})
				.catch((error) =>
					console.error("Failed to create trip comment:", error)
				);
		}
	};

	const deleteComment = (commentId: number, tripId: number) => {
		removeTripComment(commentId)
			.then(() => {
				onCommentDelete(commentId, tripId);
			})
			.catch((error) => console.error("Failed to delete trip comment:", error));
	};

	const handleStarClick = () => {
		if (!loggedIn) {
			return;
		}

		toggleStarStatus(trip.id)
			.then(() => {
				onToggleStar(trip.id);
			})
			.catch((error) => console.error("Failed to toggle star status:", error));
	};

	const handleSaveTrip = () => {
		if (!loggedIn) {
			return;
		}

		copyTrip(trip.id)
			.then((trip) => {
				dispatch(addNewTrip(trip));
				toast.success(t("community.expandedView.copySuccess"));
			})
			.catch((error) => console.error("Failed to unstar trip:", error));
	};

	const handleDownloadTrip = () => {
		if (!loggedIn) {
			return;
		}

		downloadTrip(trip.id, i18n.language)
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
	};

	const CommentsFallback = () => (
		<div className="comments-fallback">
			<Text content={"community.expandedView.comments.fallback"} />
		</div>
	);

	// if user is not logged in
	const WysiwygFallback = () => (
		<div className="wysiwyg-fallback">
			<Text
				content={"community.expandedView.comments.wysiwygFallback"}
				isBold
			/>
		</div>
	);

	return (
		<motion.div
			ref={modalRef}
			className="expanded-view"
			layoutId={`card-${trip.id}`}
		>
			<div className="view-actionbar">
				<button onClick={onClose}>
					<Text content={"community.expandedView.back"} />
				</button>
				<div className={`view-actionbar-icons ${!loggedIn && "disabled"}`}>
					<div className="view-actionbar-stars">
						{trip.stars ?? 0}
						{trip.starredByCurrentUser || !loggedIn ? (
							<FaStar
								className="icon"
								size={22}
								title={t("community.expandedView.starIcon")}
								onClick={handleStarClick}
							/>
						) : (
							<FaRegStar
								className="icon"
								size={22}
								title={t("community.expandedView.starIcon")}
								onClick={handleStarClick}
							/>
						)}
					</div>
					<FaCopy
						className="icon"
						size={22}
						title={t("community.expandedView.copyIcon")}
						onClick={handleSaveTrip}
					/>
					<FiDownload
						className="icon"
						size={22}
						title={t("community.expandedView.downloadIcon")}
						onClick={handleDownloadTrip}
					/>
				</div>
			</div>
			<div className="expanded-view-content">
				<div className="content-data">
					<div className="content-data-title">{trip.title}</div>
					<div className="data-roadmapItem-container">
						{roadmapItems.map((roadmapItem, index) => {
							return (
								<React.Fragment key={roadmapItem.id}>
									<RoadmapItemCard roadmapItem={roadmapItem} />
									{index !== roadmapItems.length - 1 && <FaArrowDown />}
								</React.Fragment>
							);
						})}
					</div>
				</div>
				<div className="content-comments">
					<div className="comments-header">
						<Text content={"community.expandedView.comments.header"} />
						<span>{` (${comments.length})`}</span>
					</div>
					<div className="content-comments-container">
						{comments.length > 0 ? (
							comments.map((comment) => {
								return (
									<CommentItem
										comment={comment}
										key={comment.id}
										onDelete={deleteComment}
										userId={loggedIn ? activeUser.id : -1}
									/>
								);
							})
						) : (
							<CommentsFallback />
						)}
					</div>
					{loggedIn ? (
						<form onSubmit={handleCommentSubmission}>
							<div className="content-comments-wysiwyg">
								<textarea
									id="textarea"
									name="textarea"
									placeholder={t("community.expandedView.comments.placeholder")}
									value={currentComment}
									onChange={handleTextareaChange}
								/>
							</div>
							<div className="content-comments-submit">
								<button type="submit">
									<Text content={"community.expandedView.comments.submit"} />
								</button>
							</div>
						</form>
					) : (
						<WysiwygFallback />
					)}
				</div>
			</div>
		</motion.div>
	);
};
