import "./LanguageSwitcher.scss";
import { useTranslation } from "react-i18next";
import { Text } from "../Text/Text";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const languages = ["de", "en"];

	const changeLanguage = (lng: string) => {
		if (lng !== i18n.language) {
			i18n.changeLanguage(lng);
		}
	};

	return (
		<div className="language-switcher">
			{languages.map((lng) => (
				<button
					key={lng}
					type="button"
					className={i18n.language === lng ? "language-active" : ""}
					onClick={() => changeLanguage(lng)}
				>
					<Text content={`navbar.language.${lng}`} />
				</button>
			))}
		</div>
	);
};
