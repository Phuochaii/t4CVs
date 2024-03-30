function ThemeSwitcher({
  isDarkTheme,
  toggleTheme,
}: {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}) {
  return (
    <label htmlFor="themeSwitch" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="themeSwitch"
          className="sr-only"
          onChange={toggleTheme}
          checked={isDarkTheme}
        />
        <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ${
            isDarkTheme ? 'translate-x-full dark:bg-gray-800' : ''
          }`}
        ></div>
      </div>
      <div className="ml-3 font-medium dark:text-green-600">
        {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
      </div>
    </label>
  );
}

export default ThemeSwitcher;
