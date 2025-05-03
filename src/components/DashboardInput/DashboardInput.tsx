import { ChangeEvent, useState } from "react";
import { Text } from "../Text/Text";
import "./DashboardInput.scss";

export const DashboardInput = () => {
	const [text, setText] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
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
					onChange={handleChange}
					rows={5}
					cols={40}
					style={{ resize: "none" }}
					placeholder="Notes"
				/>
			</div>
		</form>
	);
};
