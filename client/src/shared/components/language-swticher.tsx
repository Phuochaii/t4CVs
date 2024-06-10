import LanguageOption from './language-option';
import { useTranslation } from 'react-i18next';

const useLanguages = () => {
  const languages = [
    {
      code: 'en',
      language: 'English',
      countryIconUrl: 'http://localhost:5173/united-kingdom-flag-icon.png',
    },
    {
      code: 'vi',
      language: 'Vietnamese',
      countryIconUrl: 'http://localhost:5173/vietnam-flag-icon.png',
    },
  ];
  return { languages };
};
const LanguageSwitcher = () => {
  const { languages } = useLanguages();
  const { i18n } = useTranslation();

  const currentLanguageCode = i18n.language;
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const onChangeLanguage = (language: {
    code: string;
    language: string;
    countryIconUrl: string;
  }) => {
    i18n.changeLanguage(language.code);
  };
  return (
    <div className="flex items-center justify-center">
      {languages.map((language) => (
        <LanguageOption
          key={language.language}
          language={language.language}
          countryIconUrl={language.countryIconUrl}
          isSelected={language === currentLanguage}
          onSelect={() => onChangeLanguage(language)}
        />
      ))}
    </div>
  );
};

export default LanguageSwitcher;
