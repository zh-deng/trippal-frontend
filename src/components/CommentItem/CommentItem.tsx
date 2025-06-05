import { Comment } from "../../types/Trip";
import "./CommentItem.scss";

type CommentItemProps = {
	comment: Comment;
};

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	const formattedDate = new Intl.DateTimeFormat("de-DE").format(
		new Date(comment.createdAt)
	);

	return (
		<div className="comment-item">
			<div className="item-header">
				<span>{comment.author}</span>
				<span>{formattedDate}</span>
			</div>
			<div className="item-content">
				{
					comment.content
				}
			</div>
		</div>
	);
};
