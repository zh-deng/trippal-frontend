import { ChangeEvent, useRef, useState } from "react";
import { Text } from "../Text/Text";
import "./DashboardInput.scss";
import { RxCross2 } from "react-icons/rx";

export const DashboardInput = () => {
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
			<div className="input-date">
				<label>
					<Text content={"Datum"} />
				</label>
				<input type="date" name="date" />
			</div>
			<div className="input-notes">
				<label htmlFor="textarea">
					<Text content={"Notes"} />
				</label>
				<textarea
					id="textarea"
					value={text}
					onChange={handleTextareaChange}
					rows={5}
					cols={40}
					style={{ resize: "none" }}
					placeholder="Notes"
				/>
			</div>
			<div className="input-uploads">
				<label>
					<Text content={"dashboard.center.inputs.uploads"} />
				</label>
				<input
					type="file"
					accept=".pdf,.jpg,.jpeg,.png,.txt"
					onChange={handleFileChange}
					ref={fileInputRef}
				/>

				<div>
					<ul>
						{uploadedFiles.map((name, index) => (
							<li className="upload-item" key={index}>
								<button onClick={() => handleRemoveUpload(index)}>
									<RxCross2 />
								</button>
								{name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</form>
	);
};
