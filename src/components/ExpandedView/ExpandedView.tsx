import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Text } from "../Text/Text";
import { Comment, TripExtended } from "../../types/Trip";
import "./ExpandedView.scss";
import { motion } from "framer-motion";
import { FaStar, FaCopy, FaArrowDown } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { RoadmapItemCard } from "../RoadmapItemCard/RoadmapItemCard";
import { useTranslation } from "react-i18next";
import { CommentItem } from "../CommentItem/CommentItem";
import React from "react";
import { createTripComment } from "../../services/tripCommentService";
import { TripComment } from "../../dtos/tripComment.dto";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

type ExpandedViewProps = {
	trip: TripExtended;
	onClose: () => void;
	expandedId: number;
	onCommentUpdate: (comment: Comment) => void;
};

export const ExpandedView: React.FC<ExpandedViewProps> = ({
	trip,
	onClose,
	expandedId,
	onCommentUpdate,
}) => {
	const { t } = useTranslation();
	const roadmapItems = trip.roadmapItems ?? [];
	const modalRef = useRef<HTMLDivElement>(null);
	const [comments, setComments] = useState<Comment[]>(trip.comments);
	const [currentComment, setCurrentComment] = useState<string>("");

	const activeUser = useSelector((state: RootState) => state.global.activeUser);

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

		if (activeUser !== null) {
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

	const CommentsFallback = () => (
		<div className="comments-fallback">
			<Text content={"community.expandedView.comments.fallback"} />
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
					<Text content={"Zurück"} />
				</button>
				<div className="view-actionbar-icons">
					<div className="view-actionbar-stars">
						{trip.stars ?? 0}
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
								return <CommentItem comment={comment} key={comment.id} />;
							})
						) : (
							<CommentsFallback />
						)}
					</div>
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
				</div>
			</div>
		</motion.div>
	);
};
