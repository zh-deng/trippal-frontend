import { useState } from "react";
import "./LanguageSwitcher.scss"
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState<string>("de")

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button className={activeLanguage === "en" ? "language-active" : ""} onClick={() => changeLanguage('en')}>EN</button>
      <button className={activeLanguage === "de" ? "language-active" : ""} onClick={() => changeLanguage('de')}>DE</button>
    </div>
  );
}

export default LanguageSwitcher;
