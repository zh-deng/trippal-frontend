import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Text } from "../Text/Text";
import "./DashboardInput.scss";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import {
	createRoadmapItem,
	fetchRoadmapItemById,
	updateRoadmapItem,
} from "../../services/roadmapItemService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { RoadmapItem } from "../../types/Roadmap";
import {
	addNewRoadmapItem,
	setActiveRoadmapItemId,
	updateOldRoadmapItem,
} from "../../state/global/globalSlice";
import {
	updateCurrentAttraction,
	updateCurrentCity,
	updateCurrentCountry,
} from "../../state/dashboard/dashboardSlice";

export type UploadedFile = {
	name: string;
	url: string;
};

export const DashboardInput = () => {
	const { t } = useTranslation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const formInitialState = {
		title: "",
		date: "",
		notes: "",
		files: [] as UploadedFile[],
	};
	const [formData, setFormData] = useState(formInitialState);

	const activeUser = useSelector((state: RootState) => state.global.activeUser);
	const activeTripIndex = useSelector(
		(state: RootState) => state.global.activeTripIndex
	);
	const activeRoadmapItemId = useSelector(
		(state: RootState) => state.global.activeRoadmapItemId
	);

	const currentCountry = useSelector(
		(state: RootState) => state.dashboard.currentCountry
	);
	const currentCity = useSelector(
		(state: RootState) => state.dashboard.currentCity
	);
	const currentAttraction = useSelector(
		(state: RootState) => state.dashboard.currentAttraction
	);

	const dispatch = useDispatch();

	const validStates =
		activeUser !== null && activeTripIndex !== null && activeTripIndex >= 0;

	useEffect(() => {
		if (activeRoadmapItemId === null) {
			setFormData(formInitialState);
		} else if (!roadmapItemsCached(activeRoadmapItemId)) {
			loadInputData(activeRoadmapItemId);
		} else {
			if (validStates) {
				(activeUser.trips[activeTripIndex].roadmapItems ?? []).forEach(
					(item) => {
						if (item.id === activeRoadmapItemId) {
							setFormData({
								title: item.title,
								date: item.date ? formatDateForInput(item.date.toString()) : "",
								notes: item.notes,
								files: item.files ? item.files : [],
							});
						}
					}
				);
			}
		}
	}, [activeRoadmapItemId]);

	const formatDateForInput = (isoString: string): string => {
		return new Date(isoString).toISOString().split("T")[0];
	};

	const roadmapItemsCached = (id: number) => {
		if (validStates) {
			return (activeUser.trips[activeTripIndex].roadmapItems ?? []).some(
				(item) => item.id === id
			);
		}
	};

	const loadInputData = (roadmapItemId: number) => {
		fetchRoadmapItemById(roadmapItemId)
			.then((roadmapItem) => {
				dispatch(updateCurrentCountry(roadmapItem.country));
				dispatch(updateCurrentCity(roadmapItem.city));
				dispatch(updateCurrentAttraction(roadmapItem.attraction));

				setFormData({
					title: roadmapItem.title,
					date: roadmapItem.date
						? formatDateForInput(roadmapItem.date.toString())
						: "",
					notes: roadmapItem.notes,
					files: roadmapItem.files ? roadmapItem.files : [],
				});
			})
			.catch((error) => console.error("Failed to fetch roadmap item:", error));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, notes: e.target.value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const url = URL.createObjectURL(file);
		const uploaded = { name: file.name, url };

		setFormData((prev) => ({
			...prev,
			files: [...prev.files, uploaded],
		}));

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleRemoveUpload = (index: number) => {
		URL.revokeObjectURL(formData.files[index].url);

		setFormData((prev) => ({
			...prev,
			files: prev.files.filter((_, i) => i !== index),
		}));

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleDownload = (file: UploadedFile) => {
		const link = document.createElement("a");
		link.href = file.url;
		link.download = file.name;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (activeUser !== null && activeTripIndex !== null) {
			const currentTrip = activeUser.trips[activeTripIndex];

			const newRoadmapItem = {
				title: formData.title,
				date: new Date(formData.date),
				notes: formData.notes,
				files: formData.files,
				country: currentCountry,
				city: currentCity,
				attraction: currentAttraction,
				tripId: currentTrip.id,
			} as RoadmapItem;

			if (activeRoadmapItemId === null) {
				createRoadmapItem(newRoadmapItem)
					.then((newRoadmapItem) => {
						console.log(newRoadmapItem);
						dispatch(addNewRoadmapItem(newRoadmapItem));
						dispatch(setActiveRoadmapItemId(newRoadmapItem.id!));
					})
					.catch((error) =>
						console.error("Failed to create roadmap item:", error)
					);
			} else {
				updateRoadmapItem(activeRoadmapItemId, newRoadmapItem)
					.then((updatedRoadmapItem) => {
						dispatch(updateOldRoadmapItem(updatedRoadmapItem));
					})
					.catch((error) =>
						console.error("Failed to update roadmap item:", error)
					);
			}
		}
	};

	return (
		<form className="dashboard-input" onSubmit={handleSubmit}>
			<div className="input-container-left">
				<div className="input-container-left-top">
					<div className="input-title">
						<label>
							<Text content={"dashboard.center.inputs.title"} />
						</label>
						<input
							type="text"
							name="title"
							placeholder={t("dashboard.center.inputs.title")}
							value={formData.title}
							onChange={handleChange}
						/>
					</div>
					<div className="input-date">
						<label>
							<Text content={"dashboard.center.inputs.date"} />
						</label>
						<input
							type="date"
							name="date"
							value={formData.date}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="input-notes">
					<label htmlFor="textarea">
						<Text content={"dashboard.center.inputs.notes"} />
					</label>
					<textarea
						id="textarea"
						value={formData.notes}
						onChange={handleTextareaChange}
						rows={9}
						style={{ resize: "none" }}
						placeholder={t("dashboard.center.inputs.notesPlaceholder")}
					/>
				</div>
			</div>
			<div className="input-container-right">
				<div className="input-uploads">
					<div className="input-uploads-info">
						<Text content={"dashboard.center.inputs.uploadsInfo"} />
						<input
							type="file"
							accept=".pdf,.jpg,.jpeg,.png,.txt"
							onChange={handleFileChange}
							ref={fileInputRef}
						/>
						<label>
							<Text content={"dashboard.center.inputs.uploads"} />
						</label>
					</div>
					<ul className="upload-container">
						{formData.files.map((file, index) => (
							<li
								className={`upload-item ${
									index % 2 === 0 ? "odd-color" : "even-color"
								}`}
								key={index}
							>
								<button type="button" onClick={() => handleRemoveUpload(index)}>
									<RxCross2 />
								</button>
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
				<div
					className={`input-save-button ${
						formData.title.trim() === "" ? "disabled" : ""
					}`}
				>
					<button type="submit" disabled={formData.title.trim() === ""}>
						<Text content={"dashboard.center.inputs.submit"} />
					</button>
				</div>
			</div>
		</form>
	);
};
