import { useTranslation } from "react-i18next";
import { Comment } from "../../types/Trip";
import "./CommentItem.scss";
import { MdDelete } from "react-icons/md";

type CommentItemProps = {
	comment: Comment;
	onDelete: (commentId: number, tripId: number) => void;
	userId: number;
};

export const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	onDelete,
	userId,
}) => {
	const { t } = useTranslation();
	const formattedDate = new Intl.DateTimeFormat("de-DE").format(
		new Date(comment.createdAt)
	);

	const isCommentOwner = userId === comment.authorId;

	return (
		<div className="comment-item">
			<div className="item-header">
				<span>{comment.author}</span>
				<span>{formattedDate}</span>
			</div>
			<div className="item-content">{comment.content}</div>
			{isCommentOwner && (
				<div
					className="item-delete-icon"
					title={t("community.expandedView.comments.delete")}
					onClick={() => onDelete(comment.id!, comment.tripId)}
				>
					<MdDelete size={24} />
				</div>
			)}
		</div>
	);
};
