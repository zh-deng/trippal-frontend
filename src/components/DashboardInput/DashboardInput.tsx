import { ChangeEvent, useRef, useState } from "react";
import { Text } from "../Text/Text";
import "./DashboardInput.scss";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

export const DashboardInput = () => {
	const { t } = useTranslation();
	const [text, setText] = useState<string>("");
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setUploadedFiles((prev) => [...prev, file.name]);
	};

	const handleRemoveUpload = (index: number) => {
		setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<form className="dashboard-input">
			<div className="input-container-left">
				<div className="input-date">
					<label>
						<Text content={"Datum"} />
					</label>
					<input type="date" name="date" />
				</div>
				<div className="input-notes">
					<label htmlFor="textarea">
						<Text content={"dashboard.center.inputs.notes"} />
					</label>
					<textarea
						id="textarea"
						value={text}
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
						{uploadedFiles.map((name, index) => (
							<li className={`upload-item ${index%2 === 0 ? "odd-color": "even-color"}`} key={index}>
								<button onClick={() => handleRemoveUpload(index)}>
									<RxCross2 />
								</button>
								{name}
							</li>
						))}
					</ul>
				</div>
				<div className="input-save-button">
					<button>
						<Text content={"dashboard.center.inputs.submit"} />
					</button>
				</div>
			</div>
		</form>
	);
};
