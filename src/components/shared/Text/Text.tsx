import React, { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import "./Text.scss"

type TextProps = {
  content: string;
  values?: { [key: string]: any };
  components?: { [key: string]: JSX.Element };
  isBold?: boolean;
}

export const Text: React.FC<TextProps> = ({ content, values, components, isBold }) => {
  const { t } = useTranslation();

  if (components) {
    return (
      <Trans className={isBold ? "text-bold" : ""} i18nKey={content} components={components} values={values} />
    );
  }

  return <span className={isBold ? "text-bold" : ""}>{t(content, values)}</span>;
};
