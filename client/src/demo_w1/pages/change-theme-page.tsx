import { useState } from "react";
import ThemeSwitcher from "../components/theme-swticher";
import useTheme, { Theme } from "../../hooks/useTheme";

const ChangeThemePage = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === Theme.Dark);

  const onToggleTheme = () => {
    toggleTheme();
    setIsDarkTheme((prev) => !prev);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <ThemeSwitcher isDarkTheme={isDarkTheme} toggleTheme={onToggleTheme} />
    </div>
  );
};
export default ChangeThemePage;
