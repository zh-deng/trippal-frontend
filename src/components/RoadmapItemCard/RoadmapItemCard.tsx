import { useTranslation } from "react-i18next";
import { RoadmapItem } from "../../types/Roadmap";
import { UploadedFile } from "../DashboardInput/DashboardInput";
import "./RoadmapItemCard.scss";

type RoadmapItemCardProps = {
	roadmapItem: RoadmapItem;
};

export const RoadmapItemCard: React.FC<RoadmapItemCardProps> = ({
	roadmapItem,
}) => {
	const { t } = useTranslation();
	const formattedDate = new Intl.DateTimeFormat("de-DE").format(
		new Date(roadmapItem.date)
	);

	const breadcrumb = [
		roadmapItem.country?.name,
		roadmapItem.city?.name,
		roadmapItem.attraction?.name,
	]
		.filter(Boolean)
		.join(" > ");

	const handleDownload = (file: UploadedFile) => {
		const link = document.createElement("a");
		link.href = file.url;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="item-card">
			<div className="item-card-metadata">
				<span>{roadmapItem.title}</span>
				<span>{formattedDate}</span>
			</div>
			<div className="item-card-breadcrumb">{breadcrumb}</div>
			<div className="item-card-notes">{roadmapItem.notes}</div>

			<ul className="item-card-files">
				{roadmapItem.files.map((file, index) => (
					<li key={index}>
						<span
							className="upload-item-title"
							onClick={() => handleDownload(file)}
							title={t("dashboard.center.inputs.clickToDownload")}
						>
							{file.name}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};
