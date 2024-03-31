const LanguageOption = ({
  language,
  countryIconUrl,
  isSelected = false,
  onSelect,
}: {
  language: string;
  countryIconUrl: string;
  isSelected?: boolean;
  onSelect?: () => void;
}) => {
  return isSelected ? (
    <button
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
      onClick={onSelect}
    >
      <div className="flex items-center">
        <img src={countryIconUrl} alt="US Flag" className="h-6 w-6 mr-2" />
        {language}
      </div>
    </button>
  ) : (
    <button
      className="text-green-600 border hover:bg-green-50 border-green-600 hover:bg-light-green font-bold py-2 px-4 rounded mr-2 dark:hover:bg-green-600 dark:hover:text-gray-800"
      onClick={onSelect}
    >
      <div className="flex items-center">
        <img src={countryIconUrl} alt="US Flag" className="h-6 w-6 mr-2" />
        {language}
      </div>
    </button>
  );
};

export default LanguageOption;
