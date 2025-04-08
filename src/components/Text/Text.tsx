import React, { JSX } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type TextProps = {
  content: string;
  values?: { [key: string]: any };
  components?: { [key: string]: JSX.Element };
}

const Text: React.FC<TextProps> = ({ content, values, components }) => {
  const { t } = useTranslation();

  if (components) {
    return (
      <Trans i18nKey={content} components={components} values={values} />
    );
  }

  return <>{t(content, values)}</>;
};

export default Text;
