import { Text } from "../universal/Text/Text";
import "./Footer.scss";

export const Footer = () => {
	return (
		<div className="footer">
			<Text content={"footer.copyright"} isBold />
		</div>
	);
};
